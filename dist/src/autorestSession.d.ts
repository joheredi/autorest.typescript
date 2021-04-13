import { Host, Session } from "@autorest/extension-base";
import { CodeModel } from "@azure-tools/codemodel";
interface AutorestOptions {
    lowLevelClient?: boolean;
    azureArm?: boolean;
    addCredentials?: boolean;
    credentialKeyHeaderName?: string;
    credentialScopes?: string[];
}
export declare function initializeSession(autorestHost: Host): Promise<void>;
export declare function getSession(): Session<CodeModel>;
export declare function getHost(): Host;
export declare function getAutorestOptions(): AutorestOptions;
export {};
//# sourceMappingURL=autorestSession.d.ts.map