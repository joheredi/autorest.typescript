import { writeOperation, GenerateOperationParameters } from "./writeOperation";

/**
 * This function is responsible for generating a Paging operation using the Async Iterator pattern.
 * To achieve this, we need to generate 2 functions, (1) A private function that contains the logic for
 * fetching the next page from the service using the metadata in PagingMetadata (we'll call it fetcher)
 * and (2) a public function that generates the iterator implementing PagedAsyncIterableIterator from @azure/core-paging
 */
export function writePagingOperation(params: GenerateOperationParameters) {
  generateFetchingFunction(params);
}

function generateFetchingFunction(params: GenerateOperationParameters) {
  const { operation } = params;
  const { paging, name } = operation;
  if (!paging) {
    throw new Error(`Expected paging metadata for operation ${name}`);
  }

  writeOperation(params);
}
