import { Type } from "./hrlcCodeModel.js";

export interface TypeMetadata {
  name: string;
  originModule?: string;
  modifier?: "Array";
}

export function getType(type: Type): TypeMetadata {
  switch (type.type) {
    case "Key":
      return { name: "AzureKeyCredential", originModule: "@azure/core-auth" };
    case "boolean":
      return { name: "boolean" };
    case "constant":
      let typeName: string = type.value ?? "undefined";
      if (type.valueType?.type === "string") {
        typeName = type.value ? `"${type.value}"` : "undefined";
      }
      return { name: typeName };
    case "datetime":
      return { name: "Date" };
    case "enum":
      if (!type.name) {
        throw new Error("Unable to process enum without name");
      }
      return { name: type.name, originModule: "./models.js" };
    case "float":
    case "integer":
      return { name: "number" };
    case "list":
      if (!type.elementType) {
        throw new Error("Unable to process Array with no elementType");
      }
      return {
        name: getType(type.elementType).name,
        modifier: "Array",
        originModule:
          type.elementType?.type === "model" ? "./models.js" : undefined
      };
    case "model":
      if (!type.name) {
        throw new Error("Unable to process model without name");
      }
      return { name: type.name, originModule: "./models.js" };
    case "string":
      return { name: "string" };
    default:
      throw new Error(`Unsupported type ${type.type}`);
  }
}
