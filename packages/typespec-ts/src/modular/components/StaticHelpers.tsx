/**
 * Static Helper Declarations — Alloy refkey definitions for static helpers.
 *
 * Static helpers (21 .ts files in static/static-helpers/) provide runtime
 * utilities for serialization, paging, polling, multipart, URL templates, etc.
 *
 * ### Dual-path coexistence
 *
 * The old ts-morph pipeline loads static helpers via `loadStaticHelpers()` in
 * `src/framework/load-static-helpers.ts`, adds them to the ts-morph Project,
 * and emits them via `TsMorphBridge`. The old binder resolves references using
 * string-based refkeys from `static-helpers-metadata.ts`.
 *
 * The new Alloy pipeline uses the refkey accessor functions exported here
 * (e.g., `pollingHelperRefkey("getLongRunningPoller")`). These return Alloy
 * `Refkey` objects from `@alloy-js/core` that downstream Alloy components
 * (serializers, operations) will use in `code` templates.
 *
 * Both systems coexist: the old string-based refkeys and new Alloy Refkey
 * objects are in separate namespaces. The old `static-helpers-metadata.ts`
 * and `loadStaticHelpers()` remain untouched.
 *
 * ### Migration path
 *
 * When static helpers are rendered as `<ts.SourceFile>` Alloy components
 * (Phase 9), the refkeys defined here will be attached to declarations,
 * enabling auto-import resolution. Until then, consumers use these refkeys
 * for naming consistency and build manual import statements using
 * `getStaticHelperFileInfo()`.
 */

// Re-export all refkey accessor functions and metadata
export {
  // Refkey accessor functions
  serializationHelperRefkey,
  pagingHelperRefkey,
  pollingHelperRefkey,
  simplePollerHelperRefkey,
  urlTemplateHelperRefkey,
  multipartHelperRefkey,
  cloudSettingHelperRefkey,
  xmlHelperRefkey,
  // Metadata
  getStaticHelperFileInfo,
  STATIC_HELPERS_BASE_DIR
} from "./StaticHelperRefkeys.js";

// Re-export types
export type {
  SerializationHelperName,
  PagingHelperName,
  PollingHelperName,
  SimplePollerHelperName,
  UrlTemplateHelperName,
  MultipartHelperName,
  CloudSettingHelperName,
  XmlHelperName,
  StaticHelperFileInfo
} from "./StaticHelperRefkeys.js";
