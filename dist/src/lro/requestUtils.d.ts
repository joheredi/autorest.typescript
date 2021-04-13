import { HttpOperationResponse } from "@azure/core-http";
import { LROResponseInfo } from "./models";
/**
 * We need to selectively deserialize our responses, only deserializing if we
 * are in a final LRO response, not deserializing any polling non-terminal responses
 */
export declare function shouldDeserializeLRO(finalStateVia?: string): (response: HttpOperationResponse) => boolean;
export declare function getLROData(result: HttpOperationResponse): LROResponseInfo;
//# sourceMappingURL=requestUtils.d.ts.map