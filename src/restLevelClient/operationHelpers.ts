import {
  AnyObjectSchema,
  Operation,
  SchemaResponse,
  Response,
  Schema,
  BinarySchema
} from "@autorest/codemodel";
import { getLanguageMetadata } from "../utils/languageHelpers";
import { NameType, normalizeName } from "../utils/nameUtils";
import { isSchemaResponse } from "../utils/schemaHelpers";

export function getResponseTypeName(
  operation: Operation,
  response: SchemaResponse | Response
) {
  const statusCode = getStatusCode(response);

  return normalizeName(
    `${getLanguageMetadata(operation.language).name}${statusCode}Response`,
    NameType.Interface
  );
}

export function responseToSchemaResponse(response: Response | SchemaResponse) {
  if (!isSchemaResponse(response)) {
    let schema: Schema = (response as any).binary
      ? new BinarySchema("Binary schema")
      : new AnyObjectSchema("AnyObject schema");

    return new SchemaResponse(schema, {
      ...response
    });
  } else {
    return response;
  }
}

/**
 * Extracts the status code for a given response definition
 * @param response - response definition to extract the status code from
 */
export function getStatusCode(response: Response): string {
  if (response.protocol.http === undefined) {
    throw new Error(
      "generateResponseTypes.getStatusCode: Can't extract response definition statusCode from undefined http metadata"
    );
  }

  // Extracting the status code for the response definition. Eventhough it is represented as an array of status codes
  // in M4, in reality it can only contain a single status code, hence we are always picking the first one.
  let statusCode = response.protocol.http?.statusCodes[0];

  // Swagger can define a catch all status code "default" to get any other status code not explicitly defined
  // however default is not a valid HTTP status code. We are setting 500 as a catch all status code instead
  // which is a valid http status
  // if (statusCode === "default") {
  //   return `"500"`;
  // }

  return `"${statusCode}"`;
}

export function getOperationDescription(operation: Operation) {
  let description = getLanguageMetadata(operation.language).description;

  if (operation.extensions && operation.extensions["x-ms-pageable"]) {
    description = `${description}\nThis operation returns paginated results. You can use the \`paginate\` helper in this package to iterate the results`;
  }

  return description;
}

export function gerOperationSuccessStatus(operation: Operation): string[] {
  const responses = operation.responses ?? [];
  const status: string[] = [];

  for (const response of responses) {
    let statusCode = response.protocol.http?.statusCodes[0];
    status.push(statusCode);
  }

  return status;
}
