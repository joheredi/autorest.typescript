/**
 * Alloy rendering utilities for unit tests.
 * This is a .tsx file so it can use JSX syntax.
 * Tests import the compiled version from dist/.
 *
 * IMPORTANT: This module runs from dist/ while tests run via ts-node (src/).
 * Module-level globals (emitQueue, contextManager) are separate instances.
 * Use bridgeTestContext() to propagate state from test setup into dist/.
 */
import {
  renderAsync,
  type OutputDirectory,
  type Children
} from "@alloy-js/core";
import { Output } from "../modular/components/Output.js";
import { SdkContextProvider } from "../modular/components/context/SdkContextProvider.js";
import { Operations } from "../modular/components/Operations.js";
import { OperationOptions } from "../modular/components/OperationOptions.js";
import { ClientContext } from "../modular/components/ClientContext.js";
import { ClassicalClient } from "../modular/components/ClassicalClient.js";
import { ClassicalOperationGroups } from "../modular/components/ClassicalOperationGroups.js";
import { RootIndex } from "../modular/components/RootIndex.js";
import { SubpathIndex } from "../modular/components/SubpathIndex.js";
import { Samples } from "../modular/components/Samples.js";
import { ModelFiles } from "../modular/components/ModelFiles.js";
import { SdkContext } from "../utils/interfaces.js";
import { ModularEmitterOptions } from "../modular/interfaces.js";
import { SdkTypeContext } from "../framework/hooks/sdkTypes.js";
import { visitPackageTypes } from "../modular/emitModels.js";
import { provideContext } from "../contextManager.js";
import { DefaultCoreDependencies } from "../modular/external-dependencies.js";
import { ExternalDependencies } from "../framework/dependency.js";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { Program } from "@typespec/compiler";
import * as ts from "@alloy-js/typescript";
import { xmlHelperRefkey } from "../modular/components/StaticHelpers.js";

// ── Static helper stubs for test rendering ──────────────────────────────

/**
 * Creates stub declarations for static helper symbols that components
 * reference via refkeys. In production, StaticHelperFiles renders raw text
 * without Alloy symbol bindings. These stubs give tests (and eventually
 * production) proper refkey resolution for auto-imports.
 */
function StaticHelperStubs() {
  return (
    <ts.SourceFile path="static-helpers/serialization/xml-helpers.ts">
      <ts.TypeDeclaration
        export
        name="XmlSerializationOptions"
        refkey={xmlHelperRefkey("XmlSerializationOptions")}
      >
        any
      </ts.TypeDeclaration>
      <ts.TypeDeclaration
        export
        name="XmlPropertyMetadata"
        refkey={xmlHelperRefkey("XmlPropertyMetadata")}
      >
        any
      </ts.TypeDeclaration>
      <ts.TypeDeclaration
        export
        name="XmlPropertyDeserializeMetadata"
        refkey={xmlHelperRefkey("XmlPropertyDeserializeMetadata")}
      >
        any
      </ts.TypeDeclaration>
      <ts.TypeDeclaration
        export
        name="XmlSerializedObject"
        refkey={xmlHelperRefkey("XmlSerializedObject")}
      >
        any
      </ts.TypeDeclaration>
      <ts.FunctionDeclaration
        export
        name="serializeToXml"
        refkey={xmlHelperRefkey("serializeToXml")}
        parameters={["item: any", "properties: any", "rootName: string"]}
        returnType="string"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="serializeModelToXml"
        refkey={xmlHelperRefkey("serializeModelToXml")}
        parameters={["item: any", "properties: any", "rootName: string"]}
        returnType="string"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="xmlObjectToString"
        refkey={xmlHelperRefkey("xmlObjectToString")}
        parameters={["obj: any"]}
        returnType="string"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="parseXmlString"
        refkey={xmlHelperRefkey("parseXmlString")}
        parameters={["xml: string"]}
        returnType="any"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="deserializeFromXml"
        refkey={xmlHelperRefkey("deserializeFromXml")}
        parameters={["xml: string", "properties: any", "rootName: string"]}
        returnType="any"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="deserializeXmlToModel"
        refkey={xmlHelperRefkey("deserializeXmlToModel")}
        parameters={["xml: string", "properties: any", "rootName: string"]}
        returnType="any"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="deserializeXmlObject"
        refkey={xmlHelperRefkey("deserializeXmlObject")}
        parameters={["obj: any", "properties: any"]}
        returnType="any"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="isXmlContentType"
        refkey={xmlHelperRefkey("isXmlContentType")}
        parameters={["contentType: string"]}
        returnType="boolean"
      >
        {""}
      </ts.FunctionDeclaration>
      <ts.FunctionDeclaration
        export
        name="isJsonContentType"
        refkey={xmlHelperRefkey("isJsonContentType")}
        parameters={["contentType: string"]}
        returnType="boolean"
      >
        {""}
      </ts.FunctionDeclaration>
    </ts.SourceFile>
  );
}

// ── Output tree flattening ─────────────────────────────────────────────

/**
 * Flattens an Alloy OutputDirectory tree into a map of path → content.
 */
function flattenOutputTree(
  dir: OutputDirectory,
  result: Map<string, string> = new Map()
): Map<string, string> {
  for (const entry of dir.contents) {
    if ("contents" in entry) {
      if (Array.isArray(entry.contents)) {
        flattenOutputTree(entry as OutputDirectory, result);
      } else if (typeof entry.contents === "string") {
        // Merge content for same-path files (e.g. Models + Serializers
        // both render to models/models.ts)
        const existing = result.get(entry.path);
        if (existing) {
          result.set(entry.path, existing + "\n" + entry.contents);
        } else {
          result.set(entry.path, entry.contents);
        }
      }
    }
  }
  return result;
}

// ── Core rendering function ─────────────────────────────────────────────

/**
 * Bridges global state from test context (ts-node/src/) into compiled
 * context (dist/). Module-level singletons like emitQueue and contextManager
 * are separate instances; this ensures the dist/ copies have the same data.
 */
function bridgeTestContext(dpgContext: SdkContext, sdkTypes: SdkTypeContext) {
  visitPackageTypes(dpgContext);
  provideContext("sdkTypes", sdkTypes);
  provideContext("rlcMetaTree", new Map());
  provideContext("emitContext", {
    compilerContext: dpgContext as any,
    tcgcContext: dpgContext
  });
  provideContext("dependencies", {
    ...DefaultCoreDependencies
  } as ExternalDependencies);
}

interface RenderContextOptions {
  includeStaticHelperStubs?: boolean;
}

async function renderWithContext(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext,
  children: Children,
  options?: RenderContextOptions
): Promise<Map<string, string>> {
  const includeStubs = options?.includeStaticHelperStubs ?? true;
  bridgeTestContext(dpgContext, sdkTypes);
  const tree = await renderAsync(
    <Output program={program}>
      <SdkContextProvider
        sdkContext={dpgContext}
        emitterOptions={emitterOptions}
        sdkTypes={sdkTypes}
      >
        {includeStubs && <StaticHelperStubs />}
        {children}
      </SdkContextProvider>
    </Output>
  );
  return flattenOutputTree(tree);
}

// ── Component-specific render functions ─────────────────────────────────

export type ClientMap = [string[], SdkClientType<SdkServiceOperation>];

export async function renderOperations(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext,
  clientMaps: ClientMap[]
): Promise<Map<string, string>> {
  const sourceRoot = emitterOptions.modularOptions.sourceRoot;
  return renderWithContext(
    program,
    dpgContext,
    emitterOptions,
    sdkTypes,
    <>
      <ModelFiles context={dpgContext} sourceRoot={sourceRoot} />
      {clientMaps.map((subClient) => (
        <>
          <ClientContext
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <Operations
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <OperationOptions
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
        </>
      ))}
    </>
  );
}

export async function renderClientContext(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext,
  clientMap: ClientMap
): Promise<Map<string, string>> {
  return renderWithContext(
    program,
    dpgContext,
    emitterOptions,
    sdkTypes,
    <>
      <ModelFiles
        context={dpgContext}
        sourceRoot={emitterOptions.modularOptions.sourceRoot}
      />
      <ClientContext
        context={dpgContext}
        clientMap={clientMap}
        emitterOptions={emitterOptions}
      />
    </>
  );
}

export async function renderClassicalClient(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext,
  clientMaps: ClientMap[]
): Promise<Map<string, string>> {
  return renderWithContext(
    program,
    dpgContext,
    emitterOptions,
    sdkTypes,
    <>
      {clientMaps.map((subClient) => (
        <>
          <Operations
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <OperationOptions
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <ClientContext
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <ClassicalClient
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <ClassicalOperationGroups
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
        </>
      ))}
    </>
  );
}

export async function renderRootIndex(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext,
  clientMaps: ClientMap[]
): Promise<Map<string, string>> {
  return renderWithContext(
    program,
    dpgContext,
    emitterOptions,
    sdkTypes,
    <>
      <ModelFiles
        context={dpgContext}
        sourceRoot={emitterOptions.modularOptions.sourceRoot}
      />
      {clientMaps.map((subClient) => (
        <>
          <Operations
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <OperationOptions
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <ClientContext
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <ClassicalClient
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
          <ClassicalOperationGroups
            context={dpgContext}
            clientMap={subClient}
            emitterOptions={emitterOptions}
          />
        </>
      ))}
      <SubpathIndex
        context={dpgContext}
        emitterOptions={emitterOptions}
        clientMap={clientMaps}
      />
      <RootIndex
        context={dpgContext}
        emitterOptions={emitterOptions}
        clientMap={clientMaps}
      />
    </>
  );
}

export async function renderSamples(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext
): Promise<Map<string, string>> {
  return renderWithContext(
    program,
    dpgContext,
    emitterOptions,
    sdkTypes,
    <Samples context={dpgContext} />,
    { includeStaticHelperStubs: false }
  );
}

export async function renderModels(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext
): Promise<Map<string, string>> {
  return renderWithContext(
    program,
    dpgContext,
    emitterOptions,
    sdkTypes,
    <ModelFiles
      context={dpgContext}
      sourceRoot={emitterOptions.modularOptions.sourceRoot}
    />
  );
}

export async function renderOperationOptionsOnly(
  program: Program,
  dpgContext: SdkContext,
  emitterOptions: ModularEmitterOptions,
  sdkTypes: SdkTypeContext,
  clientMaps: ClientMap[]
): Promise<Map<string, string>> {
  return renderWithContext(
    program,
    dpgContext,
    emitterOptions,
    sdkTypes,
    <>
      <ModelFiles
        context={dpgContext}
        sourceRoot={emitterOptions.modularOptions.sourceRoot}
      />
      {clientMaps.map((subClient) => (
        <OperationOptions
          context={dpgContext}
          clientMap={subClient}
          emitterOptions={emitterOptions}
        />
      ))}
    </>
  );
}
