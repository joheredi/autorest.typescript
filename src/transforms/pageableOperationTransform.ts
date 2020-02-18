import { Operation } from "@azure-tools/codemodel";
import { PagingDetails } from "../models/operationDetails";
import { getLanguageMetadata } from "../utils/languageHelpers";

interface PagingExtension {
  group: string;
  member: string;
  itemName?: string;
  nextLinkName: string;
  nextLinkOperation?: Operation;
}

export function transfromPageableOperation(
  operation: Operation
): PagingDetails | undefined {
  /**
   * This transform is responsible for adding metadata to Operation Detail about the paging options.
   * The metadata this function adds is:
   *      - nextLink: specifies the full url to call for getting the next page
   *      - itemName(optional): specifies the name of the property containing the page results
   *      - operationName(optional): references an existing operation to call for getting the next result. By default the next operation is the original one
   */

  const pagingExtension = getLanguageMetadata(operation.language)
    .paging as PagingExtension;

  if (!pagingExtension) {
    return undefined;
  }

  const { nextLinkOperation, ...pagingDetails } = pagingExtension;
  const nextLinkOperationName =
    nextLinkOperation && getLanguageMetadata(operation.language).name;

  return {
    ...pagingDetails,
    ...(nextLinkOperation && { nextLinkOperationName })
  };
}
