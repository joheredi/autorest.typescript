import {
  SourceFile,
  ImportDeclarationStructure,
  StructureKind,
  ImportSpecifierStructure
} from "ts-morph";
import { provideContext, useContext } from "../../contextManager.js";

export interface DeclarationInfo {
  name: string;
  sourceFile: SourceFile;
  alias?: string;
}

export interface Binder {
  trackDeclaration(
    refkey: unknown,
    name: string,
    sourceFile: SourceFile
  ): DeclarationInfo;
  resolveReference(
    refkey: unknown,
    currentSourceFile: SourceFile
  ): DeclarationInfo | undefined;
  applyImports(): void;
}

class BinderImp implements Binder {
  private declarations = new Map<unknown, DeclarationInfo>();
  private imports = new Map<SourceFile, ImportDeclarationStructure[]>();
  private symbolsBySourceFile = new Map<SourceFile, Set<string>>();

  trackDeclaration(refkey: unknown, name: string, sourceFile: SourceFile) {
    const uniqueName = this.generateLocallyUniqueDeclarationName(
      name,
      sourceFile
    );
    const declarationInfo = { name: uniqueName, sourceFile };
    this.declarations.set(refkey, declarationInfo);

    if (!this.symbolsBySourceFile.has(sourceFile)) {
      this.symbolsBySourceFile.set(sourceFile, new Set());
    }

    this.symbolsBySourceFile.get(sourceFile)!.add(uniqueName);

    return declarationInfo;
  }

  private generateLocallyUniqueDeclarationName(
    name: string,
    sourceFile: SourceFile
  ) {
    const existingNamesInFile =
      this.symbolsBySourceFile.get(sourceFile) ?? new Set<string>();

    return this.generateLocallyUniqueName(name, existingNamesInFile);
  }

  private generateLocallyUniqueImportName(
    name: string,
    sourceFile: SourceFile
  ) {
    const existingImports = (this.imports.get(sourceFile) ?? [])
      .flatMap((i) => i.namedImports as ImportSpecifierStructure[])
      .map((i) => i.alias ?? i.name);

    const existingDeclarations =
      this.symbolsBySourceFile.get(sourceFile) ?? new Set<string>();

    return this.generateLocallyUniqueName(
      name,
      new Set([...existingImports, ...existingDeclarations])
    );
  }

  private generateLocallyUniqueName(name: string, existingNames: Set<string>) {
    let uniqueName = name;
    let counter = 1;

    while (existingNames.has(uniqueName)) {
      uniqueName = `${name}_${counter}`;
      counter++;
    }

    return uniqueName;
  }

  resolveReference(
    refkey: unknown,
    currentSourceFile: SourceFile
  ): DeclarationInfo | undefined {
    const referencedDeclarationInfo = this.declarations.get(refkey);
    if (!referencedDeclarationInfo) return undefined;

    let importSpecifier: ImportSpecifierStructure | undefined;

    if (referencedDeclarationInfo.sourceFile !== currentSourceFile) {
      importSpecifier = this.addImport(
        currentSourceFile,
        referencedDeclarationInfo.sourceFile,
        referencedDeclarationInfo.name
      );
    }

    return importSpecifier
      ? {
          ...referencedDeclarationInfo,
          alias: importSpecifier.alias ?? importSpecifier.name
        }
      : referencedDeclarationInfo;
  }

  private addImport(
    currentSourceFile: SourceFile,
    targetSourceFile: SourceFile,
    name: string
  ): ImportSpecifierStructure {
    const importAlias = this.generateLocallyUniqueImportName(
      name,
      currentSourceFile
    );

    // Calculate the path for the import
    const relativePath =
      currentSourceFile.getRelativePathAsModuleSpecifierTo(targetSourceFile);

    // Gather the currently tracked imports
    const importStructures = this.imports.get(currentSourceFile) || [];

    // Check if an import for the current path already exists in the file
    let importStructure = importStructures.find(
      (imp) => imp.moduleSpecifier === relativePath
    );

    // If it doesn't exist add a new import structure
    if (!importStructure) {
      importStructure = {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: relativePath,
        namedImports: []
      };
      importStructures.push(importStructure);
    }

    // Add the named import if it doesn't exist to avoid double imports
    const namedImports =
      importStructure.namedImports as ImportSpecifierStructure[];
    let importSpecifier = namedImports.find((n) => n.name === importAlias);
    if (!importSpecifier) {
      importSpecifier = {
        name: name,
        alias: importAlias,
        kind: StructureKind.ImportSpecifier
      };
      namedImports.push(importSpecifier);
    }

    importStructure.namedImports = namedImports; // Reassign to ensure the changes are applied
    this.imports.set(currentSourceFile, importStructures);
    return importSpecifier;
  }

  applyImports() {
    this.imports.forEach((importStructures, sourceFile) => {
      importStructures.forEach((importStructure) => {
        sourceFile.addImportDeclaration(importStructure);
      });
    });
  }
}

provideContext("binder", new BinderImp());

export function useBinder(): Binder {
  return useContext("binder");
}
