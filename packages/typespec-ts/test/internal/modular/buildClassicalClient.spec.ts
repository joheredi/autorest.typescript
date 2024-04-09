// import { expect } from "chai";
// import { createTypescriptTestHost } from "../../test-host.js";
// import { emitCodeModel } from "../../../src/modular/buildCodeModel.js";
// import { getRLCClients } from "../../../src/utils/clientUtils.js";
// import { transformRLCModel } from "../../../src/transform/transform.js";
// import { RLCModel } from "@azure-tools/rlc-common";
// import { Project } from "ts-morph";
// import { compileTypespec } from "./util.js";
// import { TestHost } from "@typespec/compiler/testing";
// import { buildModels } from "../../../src/modular/emitModels.js";

// describe("buildClassicalClient", () => {
//   let host: TestHost;

//   it("should build a classical client", async function () {
//     host = await createTypescriptTestHost();
//     const context = await compileTypespec(
//       host,
//       `
//       import "@typespec/http";

//       using TypeSpec.Http;
//       @service({
//         title: "Widget Service",
//       })
//       namespace DemoService;

//       model Widget {
//         @visibility("read", "update")
//         @path
//         id: string;

//         weight: int32;
//         color: "red" | "blue";
//       }

//       @error
//       model Error {
//         code: int32;
//         message: string;
//       }

//       @route("/widgets")
//       @tag("Widgets")
//       interface Widgets {
//         @get list(): Widget[] | Error;
//         @get read(@path id: string): Widget | Error;
//         @post create(...Widget): Widget | Error;
//         @patch update(...Widget): Widget | Error;
//         @delete delete(@path id: string): void | Error;
//         @route("{id}/analyze") @post analyze(@path id: string): string | Error;
//       }
//     `
//     );
//   });
// });
