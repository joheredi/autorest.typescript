/**
 * Extracts common autorest options
 */
export declare function extractAutorestOptions(): Promise<{
    azureArm: boolean;
    addCredentials: boolean;
    credentialKeyHeaderName: string | undefined;
    credentialScopes: string[] | undefined;
    lowLevelClient: boolean;
}>;
//# sourceMappingURL=autorestOptions.d.ts.map