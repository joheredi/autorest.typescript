/**
 * Static Helpers — deferred from Alloy JSX conversion.
 *
 * Static helpers (21 .ts files in static/static-helpers/) provide runtime
 * utilities for serialization, paging, polling, multipart, URL templates, etc.
 * They are currently loaded by `loadStaticHelpers()` in src/framework/load-static-helpers.ts,
 * added to the ts-morph Project, and emitted via `TsMorphBridge`.
 *
 * ### Why conversion is deferred
 *
 * The serializers and operation helpers reference static helper symbols via
 * `resolveReference(refkey("PagingHelpers.X"))`, `resolveReference(refkey("PollingHelpers.Y"))`,
 * etc. These references are resolved by the current binder (provideBinder/useBinder),
 * which receives the loaded static helpers map.
 *
 * Converting static helpers to `<ts.SourceFile>` Alloy components would require
 * the serializers (still using ts-morph codegen) to switch to Alloy's refkey-based
 * imports. Until the serializers are also converted to Alloy JSX, the static
 * helpers must remain in the ts-morph pipeline to keep references working.
 *
 * ### Current flow
 *
 * 1. `$onEmit` calls `loadStaticHelpers()` → adds files to ts-morph Project
 * 2. The binder tracks which helpers are referenced and prunes unreferenced ones
 * 3. `TsMorphBridge` emits the ts-morph Project files (including static helpers)
 *
 * ### Future conversion
 *
 * When serializers are converted to Alloy JSX:
 * - Create a component per helper category (PagingHelpers, PollingHelpers, etc.)
 * - Each renders a `<ts.SourceFile>` with the helper content
 * - Register exported symbols with Alloy refkeys for automatic import resolution
 * - Remove `loadStaticHelpers()` call from `$onEmit` and delete `static-helpers-metadata.ts`
 */
