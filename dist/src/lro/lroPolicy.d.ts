import { RequestPolicy, RequestPolicyOptions, BaseRequestPolicy, HttpOperationResponse, WebResource } from "@azure/core-http";
export declare function lroPolicy(): {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => LROPolicy;
};
declare class LROPolicy extends BaseRequestPolicy {
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
    sendRequest(webResource: WebResource): Promise<HttpOperationResponse>;
}
export {};
//# sourceMappingURL=lroPolicy.d.ts.map