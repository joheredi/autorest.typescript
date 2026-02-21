# Cleanup Export Analysis

**Agent:** Parker (Tester)  
**Date:** 2026-02-20

## Component Export Status

### ✅ TsMorphBridge — NOT EXPORTED

**File:** `src/modular/components/TsMorphBridge.tsx`

**Export check:** NOT present in `src/modular/components/index.ts` (123 lines, no TsMorphBridge exports)

**Import locations:**
- Only imported by: `src/alloy-emitter.tsx` (line 22)
- Internal component, not part of public API

**Conclusion:** Safe to delete. No downstream dependencies outside of alloy-emitter.tsx.

---

## Components Index — No Cleanup Needed

**File:** `src/modular/components/index.ts`

**Current exports (31 components/utilities):**
- Output, Logger, Models, Operations, OperationOptions
- ClientContext, ClassicalClient, ClassicalOperationGroups
- Serializers, XmlSerializers, RestorePoller
- RootIndex, SubpathIndex, Samples
- Static helper refkeys (serialization, paging, polling, XML, etc.)
- External package definitions
- Type refkeys and utility refkeys

**TsMorphBridge status:** Not exported (internal use only)

**Action needed:** None. No export removal required.

---

## Load Static Helpers — Module Status

**File:** `src/framework/load-static-helpers.ts`

**Export check:** NOT re-exported from any index file

**Import locations:**
- Only imported by: `src/index.ts` (line 77)
- Internal framework utility, not part of public API

**Exports:**
- `loadStaticHelpers()` function
- `StaticHelperMetadata` interface
- `StaticHelpers` type
- `SourceFileSymbol` symbol
- `isStaticHelperMetadata()` guard
- `LoadStaticHelpersOptions` interface

**Usage:** Single call site in index.ts (lines 113-130)

**Conclusion:** Safe to delete. No downstream dependencies.

---

## Summary

Both files identified for deletion are:
1. ✅ Not exported from public API
2. ✅ Single import location each
3. ✅ No external consumers
4. ✅ Safe to delete without API breakage

**Cleanup impact:** Internal refactoring only, zero API surface changes
