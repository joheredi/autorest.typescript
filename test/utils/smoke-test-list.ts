export interface SpecDefinition {
  path: string;
  branch?: string;
}

export const readmes: SpecDefinition[] = [
  { path: "./.tmp/specs/specification/keyvault/resource-manager/readme.md" },
  { path: "./.tmp/specs/specification/storage/resource-manager/readme.md" },
  { path: "./.tmp/specs/specification/msi/resource-manager/readme.md" },
  {
    path:
      "./.tmp/specs/specification/adhybridhealthservice/resource-manager/readme.md"
  }
];
