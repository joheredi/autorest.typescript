# Skill: Static Helper Refkeys in Alloy

## What
Converting static helper files (runtime utilities copied into generated output) from ts-morph-managed files to Alloy JSX components with tracked refkeys.

## Pattern

### Old system (ts-morph + binder):
```ts
// In static-helpers-metadata.ts
export const SerializationHelpers = {
  serializeRecord: { kind: "function", name: "serializeRecord", location: "serialization/serialize-record.ts" }
};

// In consumer (buildSerializerFunction.ts):
import { resolveReference } from "../../framework/reference.js";
const ref = resolveReference(SerializationHelpers.serializeRecord);
// → produces a placeholder string that binder resolves later
```

### New system (Alloy refkeys):
```tsx
// In StaticHelperDeclarations.tsx
import { refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";

export function serializationHelperRefkey(name: string): Refkey {
  return refkey("SerializationHelpers", name);
}

// Render the file with refkeys on declarations:
<ts.SourceFile path="static-helpers/serialization/serialize-record.ts">
  <ts.FunctionDeclaration export name="serializeRecord" refkey={serializationHelperRefkey("serializeRecord")}>
    {fileContent}
  </ts.FunctionDeclaration>
</ts.SourceFile>

// In consumer (Alloy JSX component):
import { serializationHelperRefkey } from "./StaticHelperDeclarations.js";
const body = code`return ${serializationHelperRefkey("serializeRecord")}(item);`;
// → Alloy automatically resolves the refkey and adds import
```

## Key Rules
1. Import `refkey` from `@alloy-js/core`, NEVER from `src/framework/refkey.ts`
2. Use composite refkeys with category prefix: `refkey("PagingHelpers", "BuildPagedAsyncIterator")`
3. Export named accessor functions for each category
4. During migration, old and new systems coexist — don't delete old metadata until all consumers are converted

## Files
- `packages/typespec-ts/src/modular/components/StaticHelperDeclarations.tsx` — to be created
- `packages/typespec-ts/src/modular/static-helpers-metadata.ts` — old system (keep until Phase 9)
- `packages/typespec-ts/src/framework/load-static-helpers.ts` — old loader (keep until Phase 9)
