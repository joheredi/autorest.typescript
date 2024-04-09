import { TestHost } from "@typespec/compiler/testing";
import { createTypescriptTestHost } from "../../test-host.js";
import { compileTypespec } from "./util.js";
import { generateRlcSources } from "../../../src/rlc/generateRlcSources.js";
import { RLCModel } from "@azure-tools/rlc-common";
import { assert } from "chai";
import { generateModularSources } from "../../../src/modular/generateModularSources.js";
import { Project } from "ts-morph";
import { emitCodeModel } from "../../../src/modular/buildCodeModel.js";
import { SdkContext } from "../../../src/utils/interfaces.js";
import { EmitterOptions } from "../../../src/lib.js";
import { ModularCodeModel } from "../../../src/modular/modularCodeModel.js";

describe("Project structure", () => {
  let host: TestHost;

  describe("Simple flavorless client", () => {
    const testTypespec = ` 
    import "@typespec/http";
    using TypeSpec.Http;
    @service({
    title: "Widget Service",
    })
    namespace DemoService;
  
    model Widget {
    @visibility("read", "update")
    @path
    id: string;
  
    weight: int32;
    color: "red" | "blue";
    }
  
    @error
    model Error {
    code: int32;
    message: string;
    }
  
    @route("/widgets")
    @tag("Widgets")
    interface Widgets {
    @get list(): Widget[] | Error;
    @get read(@path id: string): Widget | Error;
    @post create(...Widget): Widget | Error;
    @patch update(...Widget): Widget | Error;
    @delete delete(@path id: string): void | Error;
    @route("{id}/analyze") @post analyze(@path id: string): string | Error;
    }`;

    it("should correctly build the RLC only project structure", async function () {
      host = await createTypescriptTestHost();
      const context = await compileTypespec(host, testTypespec);

      const rlcCodeModels: RLCModel[] = [];

      const needUnexpectedHelper: Map<string, boolean> = new Map<
        string,
        boolean
      >();
      const serviceNameToRlcModelsMap: Map<string, RLCModel> = new Map<
        string,
        RLCModel
      >();

      await generateRlcSources(context, rlcCodeModels, {
        needUnexpectedHelper,
        serviceNameToRlcModelsMap
      });

      const regex = /\/src\/.*\.ts$/;
      const files = [...host.fs.keys()]
        .filter((f) => regex.test(f))
        .map(convertToRelativePath);

      assert.include(files, "/src/models.ts");
      assert.include(files, "/src/outputModels.ts");
      assert.include(files, "/src/clientDefinitions.ts");
      assert.include(files, "/src/responses.ts");
      assert.include(files, "/src/demoServiceClient.ts");
      assert.include(files, "/src/parameters.ts");
      assert.include(files, "/src/isUnexpected.ts");
      assert.include(files, "/src/index.ts");

      assert.equal(rlcCodeModels.length, 1);
    });

    describe("modular", () => {
      let context: SdkContext;
      let modularSourcesRoot: string;
      let project: Project;
      let serviceNameToRlcModelsMap: Map<string, RLCModel>;
      let needUnexpectedHelper: Map<string, boolean>;
      let rlcCodeModels: RLCModel[];
      let emitterOptions: EmitterOptions;
      let modularCodeModel: ModularCodeModel;

      before(async function () {
        emitterOptions = {
          isModularLibrary: true,
          generateMetadata: true
        };
        host = await createTypescriptTestHost();
        context = await compileTypespec(host, testTypespec, {
          emitterOptions
        });

        rlcCodeModels = [];
        needUnexpectedHelper = new Map<string, boolean>();
        serviceNameToRlcModelsMap = new Map<string, RLCModel>();

        await generateRlcSources(context, rlcCodeModels, {
          needUnexpectedHelper,
          serviceNameToRlcModelsMap
        });

        modularSourcesRoot =
          context.generationPathDetail?.modularSourcesDir ?? "src";
        project = new Project();

        modularCodeModel = emitCodeModel(
          context,
          serviceNameToRlcModelsMap,
          modularSourcesRoot,
          project,
          {
            casing: "camel"
          }
        );

        // 4. Generate Modular sources
        await generateModularSources(
          context,
          modularCodeModel,
          { needUnexpectedHelper, serviceNameToRlcModelsMap },
          emitterOptions
        );
      });

      it("should correctly build the Modular project structure", async function () {
        const regex = /\/src\/.*\.ts$/;
        const files = [...host.fs.keys()]
          .filter((f) => regex.test(f))
          .map(convertToRelativePath);

        // Verify RLC was generated under src/rest
        assert.include(files, "/src/rest/models.ts");
        assert.include(files, "/src/rest/outputModels.ts");
        assert.include(files, "/src/rest/clientDefinitions.ts");
        assert.include(files, "/src/rest/responses.ts");
        assert.include(files, "/src/rest/demoServiceClient.ts");
        assert.include(files, "/src/rest/parameters.ts");
        assert.include(files, "/src/rest/isUnexpected.ts");
        assert.include(files, "/src/rest/index.ts");

        // Verify Modular was generated with the correct structure
        assert.include(files, "/src/models/index.ts");
        assert.include(files, "/src/models/models.ts");
        assert.include(files, "/src/models/options.ts");

        assert.include(files, "/src/api/index.ts");
        assert.include(files, "/src/api/DemoServiceContext.ts");
        assert.include(files, "/src/api/widgets/index.ts");

        assert.include(files, "/src/classic/index.ts");
        assert.include(files, "/src/classic/widgets/index.ts");

        assert.include(files, "/src/DemoServiceClient.ts");
        assert.include(files, "/src/index.ts");
      });
    });
  });
});

function convertToRelativePath(path: string) {
  return path.replace(process.cwd(), "");
}
