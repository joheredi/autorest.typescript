import { CodeModel } from "@azure-tools/codemodel";
export interface EndpointDetails {
    isCustom: boolean;
    endpoint?: string;
    parameterName?: string;
}
export declare function transformBaseUrl(codeModel: CodeModel): EndpointDetails;
//# sourceMappingURL=urlTransforms.d.ts.map