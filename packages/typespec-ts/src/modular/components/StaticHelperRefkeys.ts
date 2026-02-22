import { refkey, Refkey } from "@alloy-js/core";

/**
 * Alloy refkey accessor functions for static helper exports.
 *
 * Each category mirrors the old `static-helpers-metadata.ts` groups.
 * These refkeys are the stable API contract for Alloy components
 * (serializers, operations, poller helpers) to reference static helper
 * symbols. When a static helper file is rendered as an Alloy
 * `<ts.SourceFile>` with refkey-annotated declarations, these refkeys
 * will auto-resolve to the correct import paths and names.
 *
 * Until that migration is complete, consumers may use these refkeys
 * alongside manual import statements.
 */

// ── Serialization Helpers ───────────────────────────────────────────────

export type SerializationHelperName =
  | "serializeRecord"
  | "getBinaryResponse"
  | "areAllPropsUndefined"
  | "buildCsvCollection"
  | "buildMultiCollection"
  | "buildNewlineCollection"
  | "buildPipeCollection"
  | "buildSsvCollection"
  | "buildTsvCollection"
  | "parseCsvCollection"
  | "parsePipeCollection"
  | "parseSsvCollection"
  | "parseNewlineCollection";

export function serializationHelperRefkey(
  name: SerializationHelperName
): Refkey {
  return refkey("StaticHelpers", "Serialization", name);
}

// ── Paging Helpers ──────────────────────────────────────────────────────

export type PagingHelperName =
  | "PageSettings"
  | "ContinuablePage"
  | "PagedAsyncIterableIterator"
  | "PagedResult"
  | "BuildPagedAsyncIteratorOptions"
  | "buildPagedAsyncIterator";

export function pagingHelperRefkey(name: PagingHelperName): Refkey {
  return refkey("StaticHelpers", "Paging", name);
}

// ── Polling Helpers ─────────────────────────────────────────────────────

export type PollingHelperName =
  | "GetLongRunningPollerOptions"
  | "getLongRunningPoller";

export function pollingHelperRefkey(name: PollingHelperName): Refkey {
  return refkey("StaticHelpers", "Polling", name);
}

// ── Simple Poller Helpers ───────────────────────────────────────────────

export type SimplePollerHelperName = "SimplePollerLike" | "getSimplePoller";

export function simplePollerHelperRefkey(name: SimplePollerHelperName): Refkey {
  return refkey("StaticHelpers", "SimplePoller", name);
}

// ── URL Template Helpers ────────────────────────────────────────────────

export type UrlTemplateHelperName = "expandUrlTemplate" | "UrlTemplateOptions";

export function urlTemplateHelperRefkey(name: UrlTemplateHelperName): Refkey {
  return refkey("StaticHelpers", "UrlTemplate", name);
}

// ── Multipart Helpers ───────────────────────────────────────────────────

export type MultipartHelperName = "FileContents" | "createFilePartDescriptor";

export function multipartHelperRefkey(name: MultipartHelperName): Refkey {
  return refkey("StaticHelpers", "Multipart", name);
}

// ── Cloud Setting Helpers ───────────────────────────────────────────────

export type CloudSettingHelperName =
  | "AzureClouds"
  | "AzureSupportedClouds"
  | "getArmEndpoint";

export function cloudSettingHelperRefkey(name: CloudSettingHelperName): Refkey {
  return refkey("StaticHelpers", "CloudSetting", name);
}

// ── XML Helpers ─────────────────────────────────────────────────────────

export type XmlHelperName =
  | "XmlSerializationOptions"
  | "XmlPropertyMetadata"
  | "XmlPropertyDeserializeMetadata"
  | "serializeModelToXml"
  | "serializeToXml"
  | "xmlObjectToString"
  | "parseXmlString"
  | "deserializeXmlToModel"
  | "deserializeFromXml"
  | "deserializeXmlObject"
  | "isXmlContentType"
  | "isJsonContentType"
  | "XmlSerializedObject";

export function xmlHelperRefkey(name: XmlHelperName): Refkey {
  return refkey("StaticHelpers", "Xml", name);
}

// ── Static helper metadata ──────────────────────────────────────────────
// Output paths relative to the modular sources root. Used by components
// that need to construct manual import statements before auto-import
// via Alloy declarations is available.

/** Base directory for static helper files in emitter output. */
export const STATIC_HELPERS_BASE_DIR = "static-helpers";

export interface StaticHelperFileInfo {
  /** Path relative to the sources root (e.g., "static-helpers/pollingHelpers.ts") */
  relativePath: string;
  /** Exported symbol name in the file */
  exportName: string;
}

/**
 * Maps a helper category + name to its output file info.
 * Used to build manual import statements when Alloy auto-import
 * is not yet available for static helpers.
 */
export function getStaticHelperFileInfo(
  category: string,
  name: string
): StaticHelperFileInfo {
  const locationMap: Record<string, Record<string, StaticHelperFileInfo>> = {
    Serialization: {
      serializeRecord: loc(
        "serialization/serialize-record.ts",
        "serializeRecord"
      ),
      getBinaryResponse: loc(
        "serialization/get-binary-response.ts",
        "getBinaryResponse"
      ),
      areAllPropsUndefined: loc(
        "serialization/check-prop-undefined.ts",
        "areAllPropsUndefined"
      ),
      buildCsvCollection: loc(
        "serialization/build-csv-collection.ts",
        "buildCsvCollection"
      ),
      buildMultiCollection: loc(
        "serialization/build-multi-collection.ts",
        "buildMultiCollection"
      ),
      buildNewlineCollection: loc(
        "serialization/build-newline-collection.ts",
        "buildNewlineCollection"
      ),
      buildPipeCollection: loc(
        "serialization/build-pipe-collection.ts",
        "buildPipeCollection"
      ),
      buildSsvCollection: loc(
        "serialization/build-ssv-collection.ts",
        "buildSsvCollection"
      ),
      buildTsvCollection: loc(
        "serialization/build-tsv-collection.ts",
        "buildTsvCollection"
      ),
      parseCsvCollection: loc(
        "serialization/parse-csv-collection.ts",
        "parseCsvCollection"
      ),
      parsePipeCollection: loc(
        "serialization/parse-pipe-collection.ts",
        "parsePipeCollection"
      ),
      parseSsvCollection: loc(
        "serialization/parse-ssv-collection.ts",
        "parseSsvCollection"
      ),
      parseNewlineCollection: loc(
        "serialization/parse-newline-collection.ts",
        "parseNewlineCollection"
      )
    },
    Paging: {
      PageSettings: loc("pagingHelpers.ts", "PageSettings"),
      ContinuablePage: loc("pagingHelpers.ts", "ContinuablePage"),
      PagedAsyncIterableIterator: loc(
        "pagingHelpers.ts",
        "PagedAsyncIterableIterator"
      ),
      PagedResult: loc("pagingHelpers.ts", "PagedResult"),
      BuildPagedAsyncIteratorOptions: loc(
        "pagingHelpers.ts",
        "BuildPagedAsyncIteratorOptions"
      ),
      buildPagedAsyncIterator: loc(
        "pagingHelpers.ts",
        "buildPagedAsyncIterator"
      )
    },
    Polling: {
      GetLongRunningPollerOptions: loc(
        "pollingHelpers.ts",
        "GetLongRunningPollerOptions"
      ),
      getLongRunningPoller: loc("pollingHelpers.ts", "getLongRunningPoller")
    },
    SimplePoller: {
      SimplePollerLike: loc("simplePollerHelpers.ts", "SimplePollerLike"),
      getSimplePoller: loc("simplePollerHelpers.ts", "getSimplePoller")
    },
    UrlTemplate: {
      expandUrlTemplate: loc("urlTemplate.ts", "expandUrlTemplate"),
      UrlTemplateOptions: loc("urlTemplate.ts", "UrlTemplateOptions")
    },
    Multipart: {
      FileContents: loc("multipartHelpers.ts", "FileContents"),
      createFilePartDescriptor: loc(
        "multipartHelpers.ts",
        "createFilePartDescriptor"
      )
    },
    CloudSetting: {
      AzureClouds: loc("cloudSettingHelpers.ts", "AzureClouds"),
      AzureSupportedClouds: loc(
        "cloudSettingHelpers.ts",
        "AzureSupportedClouds"
      ),
      getArmEndpoint: loc("cloudSettingHelpers.ts", "getArmEndpoint")
    },
    Xml: {
      XmlSerializationOptions: loc(
        "serialization/xml-helpers.ts",
        "XmlSerializationOptions"
      ),
      XmlPropertyMetadata: loc(
        "serialization/xml-helpers.ts",
        "XmlPropertyMetadata"
      ),
      XmlPropertyDeserializeMetadata: loc(
        "serialization/xml-helpers.ts",
        "XmlPropertyDeserializeMetadata"
      ),
      serializeModelToXml: loc(
        "serialization/xml-helpers.ts",
        "serializeModelToXml"
      ),
      serializeToXml: loc("serialization/xml-helpers.ts", "serializeToXml"),
      xmlObjectToString: loc(
        "serialization/xml-helpers.ts",
        "xmlObjectToString"
      ),
      parseXmlString: loc("serialization/xml-helpers.ts", "parseXmlString"),
      deserializeXmlToModel: loc(
        "serialization/xml-helpers.ts",
        "deserializeXmlToModel"
      ),
      deserializeFromXml: loc(
        "serialization/xml-helpers.ts",
        "deserializeFromXml"
      ),
      deserializeXmlObject: loc(
        "serialization/xml-helpers.ts",
        "deserializeXmlObject"
      ),
      isXmlContentType: loc("serialization/xml-helpers.ts", "isXmlContentType"),
      isJsonContentType: loc(
        "serialization/xml-helpers.ts",
        "isJsonContentType"
      ),
      XmlSerializedObject: loc(
        "serialization/xml-helpers.ts",
        "XmlSerializedObject"
      )
    }
  };

  return (
    locationMap[category]?.[name] ?? {
      relativePath: "",
      exportName: name
    }
  );
}

function loc(file: string, exportName: string): StaticHelperFileInfo {
  return {
    relativePath: `${STATIC_HELPERS_BASE_DIR}/${file}`,
    exportName
  };
}
