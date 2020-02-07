import { HttpHeader, ObjectSchema, Property } from "@azure-tools/codemodel";
import { getLanguageMetadata } from "../utils/languageHelpers";

export function headersToSchema(
  headers: HttpHeader[] | undefined,
  operationFullName: string
): ObjectSchema | undefined {
  if (!headers || !headers.length) {
    return undefined;
  }

  const headersSchema = new ObjectSchema(`${operationFullName}Headers`, "");

  headers.forEach(({ header, schema }) => {
    if (!headersSchema.properties) {
      headersSchema.properties = [];
    }

    const { description } = getLanguageMetadata(schema.language);

    headersSchema.properties.push(new Property(header, description, schema));
  });

  return headersSchema;
}
