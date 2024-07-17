import {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  Project,
  StructureKind
} from "ts-morph";
import { describe, it, expect, beforeEach } from "vitest";

// Import the Binder class (adjust the path as necessary)
import { addDeclaration } from "./../../../src/framework/declaration.js";
import { resolveReference } from "./../../../src/framework/reference.js";
import { useBinder } from "../../../src/framework/hooks/binder.js";

describe("Binder", () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it("should track declarations correctly", () => {
    const sourceFile = project.createSourceFile("test1.ts", "", {
      overwrite: true
    });
    const model = {
      name: "TestModel",
      properties: [{ name: "foo", type: "string" }]
    };

    const interfaceDeclaration: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model.name,
      properties: model.properties.map((p) => ({ name: p.name, type: p.type }))
    };

    addDeclaration(sourceFile, interfaceDeclaration, model);
    const reference = resolveReference(model, sourceFile);

    expect(reference).toBe(interfaceDeclaration.name);
  });

  it("should handle declaration name conflicts", () => {
    const sourceFile = project.createSourceFile("test1.ts", "", {
      overwrite: true
    });
    const model = {
      name: "TestModel",
      properties: [{ name: "foo", type: "string" }]
    };

    const model2 = {
      name: "TestModel",
      properties: [{ name: "bar", type: "number" }]
    };

    const interfaceDeclaration: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model.name,
      properties: model.properties.map((p) => ({ name: p.name, type: p.type }))
    };

    const interfaceDeclaration2: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model2.name,
      properties: model2.properties.map((p) => ({ name: p.name, type: p.type }))
    };

    addDeclaration(sourceFile, interfaceDeclaration, model);
    addDeclaration(sourceFile, interfaceDeclaration2, model2);

    const reference = resolveReference(model, sourceFile);

    expect(reference).toBe(interfaceDeclaration.name);
  });

  it("should handle declaration name conflicts when referenced", () => {
    const sourceFile = project.createSourceFile("test1.ts", "", {
      overwrite: true
    });
    const model = {
      name: "TestModel",
      properties: [{ name: "foo", type: "string" }]
    };

    const model2 = {
      name: "TestModel",
      properties: [{ name: "bar", type: "number" }]
    };

    const interfaceDeclaration: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model.name,
      properties: model.properties.map((p) => ({ name: p.name, type: p.type }))
    };

    const interfaceDeclaration2: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model2.name,
      properties: model2.properties.map((p) => ({ name: p.name, type: p.type }))
    };

    addDeclaration(sourceFile, interfaceDeclaration, model);
    addDeclaration(sourceFile, interfaceDeclaration2, model2);

    const reference = resolveReference(model, sourceFile);
    const reference2 = resolveReference(model2, sourceFile);

    expect(reference).toBe("TestModel");
    expect(reference2).toBe("TestModel_1");
  });

  it("should defer references to declarations that don't exist", () => {
    const sourceFile = project.createSourceFile("test1.ts", "", {
      overwrite: true
    });
    const model = {
      name: "TestModel",
      properties: [{ name: "foo", type: "string" }]
    };

    const modelB = {
      name: "TestModelB",
      properties: [{ name: "foo", type: model }]
    };

    const interfaceDeclaration: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model.name,
      properties: model.properties.map((p) => ({ name: p.name, type: p.type }))
    };

    const interfaceDeclarationB: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: modelB.name,
      properties: modelB.properties.map((p) => ({
        name: p.name,
        type: resolveReference(p.type, sourceFile)
      }))
    };

    addDeclaration(sourceFile, interfaceDeclaration, model);
    addDeclaration(sourceFile, interfaceDeclarationB, modelB);

    const binder = useBinder();
    binder.applyImports();

    console.log("// test1.ts");
    console.log(sourceFile.getFullText());
  });

  it("should handle import conflicts", () => {
    const sourceFile = project.createSourceFile("test1.ts", "", {
      overwrite: true
    });
    const model = {
      name: "TestModel",
      properties: [{ name: "foo", type: "string" }]
    };

    const modelB = {
      name: "TestModelB",
      properties: [{ name: "foo", type: model }]
    };

    const interfaceDeclaration: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model.name,
      properties: model.properties.map((p) => ({
        name: p.name,
        type: p.type
      }))
    };

    addDeclaration(sourceFile, interfaceDeclaration, model);

    const interfaceDeclarationB: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: modelB.name,
      properties: modelB.properties.map((p) => ({
        name: p.name,
        type: resolveReference(p.type, sourceFile)
      }))
    };

    addDeclaration(sourceFile, interfaceDeclarationB, modelB);

    const sourceFile2 = project.createSourceFile("test2.ts", "", {
      overwrite: true
    });

    const model2 = {
      name: "TestModel",
      properties: [{ name: "baz1", type: model }]
    };

    const interfaceDeclaration2: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model2.name,
      properties: model2.properties.map((p) => ({
        name: p.name,
        type: resolveReference(p.type, sourceFile2)
      }))
    };

    addDeclaration(sourceFile2, interfaceDeclaration2, model2);

    const sourceFile3 = project.createSourceFile("test3.ts", "", {
      overwrite: true
    });

    const model3 = {
      name: "LastModel",
      properties: [
        { name: "baz2", type: model },
        { name: "baz3", type: model2 }
      ]
    };

    const interfaceDeclaration3: InterfaceDeclarationStructure = {
      kind: StructureKind.Interface,
      name: model3.name,
      properties: model3.properties.map((p) => ({
        name: p.name,
        type: resolveReference(p.type, sourceFile3)
      }))
    };

    addDeclaration(sourceFile3, interfaceDeclaration3, model3);

    const binder = useBinder();
    binder.applyImports();

    const baz3Prop = sourceFile3
      .getInterface("LastModel")
      ?.getProperty("baz3")!;

    const imports = sourceFile3
      .getImportDeclarations()
      .flatMap((i) =>
        i
          .getNamedImports()
          .map((i) => i.getAliasNode()?.getText() ?? i.getName())
      );
    expect(baz3Prop?.getType().getText()).toBe("TestModel_1");
    expect(imports).toEqual(["TestModel", "TestModel_1"]);
    console.log("// test1.ts");
    console.log(sourceFile.getFullText());
    console.log("// test2.ts");
    console.log(sourceFile2.getFullText());
    console.log("// test3.ts");
    console.log(sourceFile3.getFullText());
  });

  it("should handle non interface types as well", () => {
    const sourceFile = project.createSourceFile("test1.ts", "", {
      overwrite: true
    });

    const fnObject = {
      name: "testFn",
      returnType: "string",
      body: `console.log("hello world!");`
    };

    const funDeclaration: FunctionDeclarationStructure = {
      kind: StructureKind.Function,
      name: fnObject.name,
      returnType: fnObject.returnType,
      statements: fnObject.body
    };

    addDeclaration(sourceFile, funDeclaration, fnObject);

    const sourceFile2 = project.createSourceFile("test2.ts", "", {
      overwrite: true
    });
    sourceFile2.addStatements(`${resolveReference(fnObject, sourceFile2)}();`);

    const binder = useBinder();
    binder.applyImports();

    console.log("// test1.ts");
    console.log(sourceFile.getFullText());
    console.log("// test2.ts");
    console.log(sourceFile2.getFullText());
  });
});
