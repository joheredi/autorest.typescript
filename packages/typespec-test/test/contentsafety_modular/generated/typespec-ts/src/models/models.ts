/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * The text analysis request.
 */
export interface AnalyzeTextOptions {
  /**
   * The text to be analyzed. We support a maximum of 10k Unicode characters (Unicode code points) in the text of one request.
   */
  text: string;
  /**
   * The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned.
   */
  categories?: (TextCategory)[];
  /**
   * The names of blocklists.
   */
  blocklistNames?: (string)[];
  /**
   * When set to true, further analyses of harmful content will not be performed in cases where blocklists are hit. When set to false, all analyses of harmful content will be performed, whether or not blocklists are hit.
   */
  haltOnBlocklistHit?: boolean;
  /**
   * This refers to the type of text analysis output. If no value is assigned, the default value will be "FourSeverityLevels".
   */
  outputType?: AnalyzeTextOutputType;
}
export type ArrayTextCategory = Array<TextCategory>;
/**
 * The harm category supported in Text content analysis.
 */
export type TextCategory = "Hate" | "SelfHarm" | "Sexual" | "Violence";/**
 * The harm category supported in Text content analysis.
 */
export enum KnownTextCategory {
  /**
   * The harm category for Text - Hate.
   */
  Hate = "Hate",
  /**
   * The harm category for Text - SelfHarm.
   */
  SelfHarm = "SelfHarm",
  /**
   * The harm category for Text - Sexual.
   */
  Sexual = "Sexual",
  /**
   * The harm category for Text - Violence.
   */
  Violence = "Violence",
}
export type ArrayString = Array<string>;
/**
 * The type of text analysis output.
 */
export type AnalyzeTextOutputType = "FourSeverityLevels" | "EightSeverityLevels";/**
 * The type of text analysis output.
 */
export enum KnownAnalyzeTextOutputType {
  /**
   * Output severities in four levels, the value could be 0,2,4,6.
   */
  FourSeverityLevels = "FourSeverityLevels",
  /**
   * Output severities in eight levels, the value could be 0,1,2,3,4,5,6,7.
   */
  EightSeverityLevels = "EightSeverityLevels",
}
/**
 * The text analysis response.
 */
export interface AnalyzeTextResult {
  /**
   * The blocklist match details.
   */
  blocklistsMatch?: (TextBlocklistMatch)[];
  /**
   * Analysis result for categories.
   */
  categoriesAnalysis: (TextCategoriesAnalysis)[];
}
export type ArrayTextBlocklistMatch = Array<TextBlocklistMatch>;
/**
 * The result of blocklist match.
 */
export interface TextBlocklistMatch {
  /**
   * The name of the matched blocklist.
   */
  blocklistName: string;
  /**
   * The ID of the matched item.
   */
  blocklistItemId: string;
  /**
   * The content of the matched item.
   */
  blocklistItemText: string;
}
export type ArrayTextCategoriesAnalysis = Array<TextCategoriesAnalysis>;
/**
 * Text analysis result.
 */
export interface TextCategoriesAnalysis {
  /**
   * The text analysis category.
   */
  category: TextCategory;
  /**
   * The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’ or ‘EightSeverity Levels’, and the output value can be 0, 2, 4, 6 or 0, 1, 2, 3, 4, 5, 6, or 7.
   */
  severity?: number;
}
/**
 * The request of analyzing potential direct or indirect injection attacks.
 */
export interface ShieldPromptOptions {
  /**
   * The user prompt to be analyzed, which may contain direct injection attacks.
   */
  userPrompt?: string;
  /**
   * The documents to be analyzed, which may contain direct or indirect injection attacks.
   */
  documents?: (string)[];
}
/**
 * The combined analysis results of potential direct or indirect injection attacks.
 */
export interface ShieldPromptResult {
  /**
   * Direct injection attacks analysis result for the given user prompt.
   */
  userPromptAnalysis?: UserPromptInjectionAnalysisResult;
  /**
   * Direct and indirect injection attacks analysis result for the given documents.
   */
  documentsAnalysis?: (DocumentInjectionAnalysisResult)[];
}
/**
 * The individual analysis result of potential injection attacks in the given user prompt.
 */
export interface UserPromptInjectionAnalysisResult {
  /**
   * Whether a potential injection attack is detected or not.
   */
  attackDetected: boolean;
}
export type ArrayDocumentInjectionAnalysisResult = Array<DocumentInjectionAnalysisResult>;
/**
 * The individual analysis result of potential injection attacks in the given documents.
 */
export interface DocumentInjectionAnalysisResult {
  /**
   * Whether a potential injection attack is detected or not.
   */
  attackDetected: boolean;
}
/**
 * The request of detecting potential protected material present in the given text.
 */
export interface DetectTextProtectedMaterialOptions {
  /**
   * The text to be analyzed, which may contain protected material. The characters will be counted in Unicode code points.
   */
  text: string;
}
/**
 * The combined detection results of potential protected material.
 */
export interface DetectTextProtectedMaterialResult {
  /**
   * Analysis result for the given text.
   */
  protectedMaterialAnalysis: TextProtectedMaterialAnalysisResult;
}
/**
 * The individual detection result of potential protected material.
 */
export interface TextProtectedMaterialAnalysisResult {
  /**
   * Whether potential protected material is detected or not.
   */
  detected: boolean;
}
/**
 * The image analysis request.
 */
export interface AnalyzeImageOptions {
  /**
   * The image to be analyzed.
   */
  image: ImageData;
  /**
   * The categories will be analyzed. If they are not assigned, a default set of analysis results for the categories will be returned.
   */
  categories?: (ImageCategory)[];
  /**
   * This refers to the type of image analysis output. If no value is assigned, the default value will be "FourSeverityLevels".
   */
  outputType?: AnalyzeImageOutputType;
}
/**
 * The image can be either base64 encoded bytes or a blob URL. You can choose only one of these options. If both are provided, the request will be refused. The maximum image size is 2048 x 2048 pixels and should not exceed 4 MB, while the minimum image size is 50 x 50 pixels.
 */
export interface ImageData {
  /**
   * The Base64 encoding of the image.
   */
  content?: Uint8Array;
  /**
   * The blob url of the image.
   */
  blobUrl?: string;
}
export type ArrayImageCategory = Array<ImageCategory>;
/**
 * The harm category supported in Image content analysis.
 */
export type ImageCategory = "Hate" | "SelfHarm" | "Sexual" | "Violence";/**
 * The harm category supported in Image content analysis.
 */
export enum KnownImageCategory {
  /**
   * The harm category for Image - Hate.
   */
  Hate = "Hate",
  /**
   * The harm category for Image - SelfHarm.
   */
  SelfHarm = "SelfHarm",
  /**
   * The harm category for Image - Sexual.
   */
  Sexual = "Sexual",
  /**
   * The harm category for Image - Violence.
   */
  Violence = "Violence",
}
/**
 * The type of image analysis output.
 */
export type AnalyzeImageOutputType = "FourSeverityLevels";/**
 * The type of image analysis output.
 */
export enum KnownAnalyzeImageOutputType {
  /**
   * Output severities in four levels, the value could be 0,2,4,6.
   */
  FourSeverityLevels = "FourSeverityLevels",
}
/**
 * The image analysis response.
 */
export interface AnalyzeImageResult {
  /**
   * Analysis result for categories.
   */
  categoriesAnalysis: (ImageCategoriesAnalysis)[];
}
export type ArrayImageCategoriesAnalysis = Array<ImageCategoriesAnalysis>;
/**
 * Image analysis result.
 */
export interface ImageCategoriesAnalysis {
  /**
   * The image analysis category.
   */
  category: ImageCategory;
  /**
   * The value increases with the severity of the input content. The value of this field is determined by the output type specified in the request. The output type could be ‘FourSeverityLevels’, and the output value can be 0, 2, 4, 6.
   */
  severity?: number;
}
/**
 * Text Blocklist.
 */
export interface TextBlocklist {
  /**
   * Text blocklist name.
   */
  blocklistName: string;
  /**
   * Text blocklist description.
   */
  description?: string;
}
/**
 * Paged collection of TextBlocklist items
 */
export interface _PagedTextBlocklist {
  /**
   * The TextBlocklist items on this page
   */
  value: (TextBlocklist)[];
  /**
   * The link to the next page of items
   */
  nextLink?: string;
}
export type ArrayTextBlocklist = Array<TextBlocklist>;
/**
 * The request to add blocklistItems to a text blocklist.
 */
export interface AddOrUpdateTextBlocklistItemsOptions {
  /**
   * Array of blocklistItems to add.
   */
  blocklistItems: (TextBlocklistItem)[];
}
export type ArrayTextBlocklistItem = Array<TextBlocklistItem>;
/**
 * Item in a TextBlocklist.
 */
export interface TextBlocklistItem {
  /**
   * The service will generate a BlocklistItemId, which will be a UUID.
   */
  readonly blocklistItemId: string;
  /**
   * BlocklistItem description.
   */
  description?: string;
  /**
   * BlocklistItem content. The length is counted using Unicode code point.
   */
  text: string;
  /**
   * An optional properties indicating whether this item is to be matched as a regular expression.
   */
  isRegex?: boolean;
}
/**
 * The response of adding blocklistItems to the text blocklist.
 */
export interface AddOrUpdateTextBlocklistItemsResult {
  /**
   * Array of blocklistItems have been added.
   */
  blocklistItems: (TextBlocklistItem)[];
}
/**
 * The request to remove blocklistItems from a text blocklist.
 */
export interface RemoveTextBlocklistItemsOptions {
  /**
   * Array of blocklistItemIds to remove.
   */
  blocklistItemIds: (string)[];
}
/**
 * Paged collection of TextBlocklistItem items
 */
export interface _PagedTextBlocklistItem {
  /**
   * The TextBlocklistItem items on this page
   */
  value: (TextBlocklistItem)[];
  /**
   * The link to the next page of items
   */
  nextLink?: string;
}
/**
 * Known values of {@link Versions} that the service accepts.
 */
export enum KnownVersions {
  /**
   * 2023-10-01
   */
  V20231001 = "2023-10-01",
  /**
   * 2024-09-01
   */
  V20240901 = "2024-09-01",
}
