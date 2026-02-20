/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * An abstract representation of an input tool definition that an agent can use.
 */
export interface ToolDefinition {
  /**
   * The object type.
   */
  type: string;
}/**
 * Alias for ToolDefinitionUnion
 */
export type ToolDefinitionUnion = CodeInterpreterToolDefinition | FileSearchToolDefinition | FunctionToolDefinition | BingGroundingToolDefinition | MicrosoftFabricToolDefinition | SharepointToolDefinition | AzureAiSearchToolDefinition | OpenApiToolDefinition | AzureFunctionToolDefinition | ToolDefinitionUnion;
/**
 * The input definition information for a code interpreter tool as used to configure an agent.
 */
export interface CodeInterpreterToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'code_interpreter'.
   */
  type: "code_interpreter";
}
/**
 * The input definition information for a file search tool as used to configure an agent.
 */
export interface FileSearchToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'file_search'.
   */
  type: "file_search";
  /**
   * Options overrides for the file search tool.
   */
  fileSearch?: FileSearchToolDefinitionDetails;
}
/**
 * Options overrides for the file search tool.
 */
export interface FileSearchToolDefinitionDetails {
  /**
   * The maximum number of results the file search tool should output. The default is 20 for gpt-4* models and 5 for gpt-3.5-turbo. This number should be between 1 and 50 inclusive.
   *
   * Note that the file search tool may output fewer than `max_num_results` results. See the file search tool documentation for more information.
   */
  maxNumResults?: number;
  /**
   * Ranking options for file search.
   */
  rankingOptions?: FileSearchRankingOptions;
}
/**
 * Ranking options for file search.
 */
export interface FileSearchRankingOptions {
  /**
   * File search ranker.
   */
  ranker: string;
  /**
   * Ranker search threshold.
   */
  scoreThreshold: number;
}
/**
 * The input definition information for a function tool as used to configure an agent.
 */
export interface FunctionToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'function'.
   */
  type: "function";
  /**
   * The definition of the concrete function that the function tool should call.
   */
  function_: FunctionDefinition;
}
/**
 * The input definition information for a function.
 */
export interface FunctionDefinition {
  /**
   * The name of the function to be called.
   */
  name: string;
  /**
   * A description of what the function does, used by the model to choose when and how to call the function.
   */
  description?: string;
  /**
   * The parameters the functions accepts, described as a JSON Schema object.
   */
  parameters: any;
}
/**
 * The input definition information for a bing grounding search tool as used to configure an agent.
 */
export interface BingGroundingToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'bing_grounding'.
   */
  type: "bing_grounding";
  /**
   * The list of connections used by the bing grounding tool.
   */
  bingGrounding: ToolConnectionList;
}
/**
 * A set of connection resources currently used by either the `bing_grounding`, `fabric_aiskill`, or `sharepoint_grounding` tools.
 */
export interface ToolConnectionList {
  /**
   * The connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  connectionList?: (ToolConnection)[];
}
export type ArrayToolConnection = Array<ToolConnection>;
/**
 * A connection resource.
 */
export interface ToolConnection {
  /**
   * A connection in a ToolConnectionList attached to this tool.
   */
  connectionId: string;
}
/**
 * The input definition information for a Microsoft Fabric tool as used to configure an agent.
 */
export interface MicrosoftFabricToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'fabric_aiskill'.
   */
  type: "fabric_aiskill";
  /**
   * The list of connections used by the Microsoft Fabric tool.
   */
  fabricAiskill: ToolConnectionList;
}
/**
 * The input definition information for a sharepoint tool as used to configure an agent.
 */
export interface SharepointToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'sharepoint_grounding'.
   */
  type: "sharepoint_grounding";
  /**
   * The list of connections used by the SharePoint tool.
   */
  sharepointGrounding: ToolConnectionList;
}
/**
 * The input definition information for an Azure AI search tool as used to configure an agent.
 */
export interface AzureAiSearchToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'azure_ai_search'.
   */
  type: "azure_ai_search";
}
/**
 * The input definition information for an OpenAPI tool as used to configure an agent.
 */
export interface OpenApiToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'openapi'.
   */
  type: "openapi";
  /**
   * The openapi function definition.
   */
  openapi: OpenApiFunctionDefinition;
}
/**
 * The input definition information for an openapi function.
 */
export interface OpenApiFunctionDefinition {
  /**
   * The name of the function to be called.
   */
  name: string;
  /**
   * A description of what the function does, used by the model to choose when and how to call the function.
   */
  description?: string;
  /**
   * The openapi function shape, described as a JSON Schema object.
   */
  spec: any;
  /**
   * Open API authentication details
   */
  auth: OpenApiAuthDetailsUnion;
}
/**
 * authentication details for OpenApiFunctionDefinition
 */
export interface OpenApiAuthDetails {
  /**
   * The type of authentication, must be anonymous/connection/managed_identity
   */
  type: OpenApiAuthType;
}/**
 * Alias for OpenApiAuthDetailsUnion
 */
export type OpenApiAuthDetailsUnion = OpenApiAnonymousAuthDetails | OpenApiConnectionAuthDetails | OpenApiManagedAuthDetails | OpenApiAuthDetailsUnion;
/**
 *   Authentication type for OpenApi endpoint. Allowed types are:
 *   - Anonymous (no authentication required)
 *   - Connection (requires connection_id to endpoint, as setup in AI Foundry)
 *   - Managed_Identity (requires audience for identity based auth)
 */
export type OpenApiAuthType = "anonymous" | "connection" | "managed_identity";/**
 *   Authentication type for OpenApi endpoint. Allowed types are:
 *   - Anonymous (no authentication required)
 *   - Connection (requires connection_id to endpoint, as setup in AI Foundry)
 *   - Managed_Identity (requires audience for identity based auth)
 */
export enum KnownOpenApiAuthType {
  /**
   * anonymous
   */
  Anonymous = "anonymous",
  /**
   * connection
   */
  Connection = "connection",
  /**
   * managed_identity
   */
  ManagedIdentity = "managed_identity",
}
/**
 * Security details for OpenApi anonymous authentication
 */
export interface OpenApiAnonymousAuthDetails extends OpenApiAuthDetailsUnion {
  /**
   * The object type, which is always 'anonymous'.
   */
  type: "anonymous";
}
/**
 * Security details for OpenApi connection authentication
 */
export interface OpenApiConnectionAuthDetails extends OpenApiAuthDetailsUnion {
  /**
   * The object type, which is always 'connection'.
   */
  type: "connection";
  /**
   * Connection auth security details
   */
  securityScheme: OpenApiConnectionSecurityScheme;
}
/**
 * Security scheme for OpenApi managed_identity authentication
 */
export interface OpenApiConnectionSecurityScheme {
  /**
   * Connection id for Connection auth type
   */
  connectionId: string;
}
/**
 * Security details for OpenApi managed_identity authentication
 */
export interface OpenApiManagedAuthDetails extends OpenApiAuthDetailsUnion {
  /**
   * The object type, which is always 'managed_identity'.
   */
  type: "managed_identity";
  /**
   * Connection auth security details
   */
  securityScheme: OpenApiManagedSecurityScheme;
}
/**
 * Security scheme for OpenApi managed_identity authentication
 */
export interface OpenApiManagedSecurityScheme {
  /**
   * Authentication scope for managed_identity auth type
   */
  audience: string;
}
/**
 * The input definition information for a azure function tool as used to configure an agent.
 */
export interface AzureFunctionToolDefinition extends ToolDefinitionUnion {
  /**
   * The object type, which is always 'azure_function'.
   */
  type: "azure_function";
  /**
   * The definition of the concrete function that the function tool should call.
   */
  azureFunction: AzureFunctionDefinition;
}
/**
 * The definition of Azure function.
 */
export interface AzureFunctionDefinition {
  /**
   * The definition of azure function and its parameters.
   */
  function_: FunctionDefinition;
  /**
   * Input storage queue. The queue storage trigger runs a function as messages are added to it.
   */
  inputBinding: AzureFunctionBinding;
  /**
   * Output storage queue. The function writes output to this queue when the input items are processed.
   */
  outputBinding: AzureFunctionBinding;
}
/**
 * The structure for keeping storage queue name and URI.
 */
export interface AzureFunctionBinding {
  /**
   * The type of binding, which is always 'storage_queue'.
   */
  type: "storage_queue";
  /**
   * Storage queue.
   */
  storageQueue: AzureFunctionStorageQueue;
}
/**
 * The structure for keeping storage queue name and URI.
 */
export interface AzureFunctionStorageQueue {
  /**
   * URI to the Azure Storage Queue service allowing you to manipulate a queue.
   */
  storageServiceEndpoint: string;
  /**
   * The name of an Azure function storage queue.
   */
  queueName: string;
}
/**
 * A set of resources that are used by the agent's tools. The resources are specific to the type of
 * tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search`
 * tool requires a list of vector store IDs.
 */
export interface ToolResources {
  /**
   * Resources to be used by the `code_interpreter` tool consisting of file IDs.
   */
  codeInterpreter?: CodeInterpreterToolResource;
  /**
   * Resources to be used by the `file_search` tool consisting of vector store IDs.
   */
  fileSearch?: FileSearchToolResource;
  /**
   * Resources to be used by the `azure_ai_search` tool consisting of index IDs and names.
   */
  azureAiSearch?: AzureAiSearchResource;
}
/**
 * A set of resources that are used by the `code_interpreter` tool.
 */
export interface CodeInterpreterToolResource {
  /**
   * A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  fileIds?: (string)[];
  /**
   * The data sources to be used. This option is mutually exclusive with the `fileIds` property.
   */
  dataSources?: (VectorStoreDataSource)[];
}
export type ArrayVectorStoreDataSource = Array<VectorStoreDataSource>;
/**
 * The structure, containing Azure asset URI path and the asset type of the file used as a data source
 * for the enterprise file search.
 */
export interface VectorStoreDataSource {
  /**
   * Asset URI.
   */
  assetIdentifier: string;
  /**
   * The asset type
   */
  assetType: VectorStoreDataSourceAssetType;
}
/**
 * Type of vector storage asset. Asset type may be a uri_asset, in this case it should contain asset URI ID,
 * in the case of id_asset it should contain the data ID.
 */
export type VectorStoreDataSourceAssetType = "uri_asset" | "id_asset";/**
 * Type of vector storage asset. Asset type may be a uri_asset, in this case it should contain asset URI ID,
 * in the case of id_asset it should contain the data ID.
 */
export enum KnownVectorStoreDataSourceAssetType {
  /**
   * Azure URI
   */
  UriAsset = "uri_asset",
  /**
   * The data ID
   */
  IdAsset = "id_asset",
}
/**
 * A set of resources that are used by the `file_search` tool.
 */
export interface FileSearchToolResource {
  /**
   * The ID of the vector store attached to this agent. There can be a maximum of 1 vector
   * store attached to the agent.
   */
  vectorStoreIds?: (string)[];
  /**
   * The list of vector store configuration objects from Azure.
   * This list is limited to one element.
   * The only element of this list contains the list of azure asset IDs used by the search tool.
   */
  vectorStores?: (VectorStoreConfigurations)[];
}
export type ArrayVectorStoreConfigurations = Array<VectorStoreConfigurations>;
/**
 * The structure, containing the list of vector storage configurations i.e. the list of azure asset IDs.
 */
export interface VectorStoreConfigurations {
  /**
   * Name
   */
  storeName: string;
  /**
   * Configurations
   */
  storeConfiguration: VectorStoreConfiguration;
}
/**
 * Vector storage configuration is the list of data sources, used when multiple
 * files can be used for the enterprise file search.
 */
export interface VectorStoreConfiguration {
  /**
   * Data sources
   */
  dataSources: (VectorStoreDataSource)[];
}
/**
 * A set of index resources used by the `azure_ai_search` tool.
 */
export interface AzureAiSearchResource {
  /**
   * The indices attached to this agent. There can be a maximum of 1 index
   * resource attached to the agent.
   */
  indexList?: (IndexResource)[];
}
export type ArrayIndexResource = Array<IndexResource>;
/**
 * A Index resource.
 */
export interface IndexResource {
  /**
   * An index connection id in an IndexResource attached to this agent.
   */
  indexConnectionId: string;
  /**
   * The name of an index in an IndexResource attached to this agent.
   */
  indexName: string;
}
/**
 * An object describing the expected output of the model. If `json_object` only `function` type `tools` are allowed to be passed to the Run.
 * If `text` the model can return text or any value needed.
 */
export interface AgentsApiResponseFormat {
  /**
   * Must be one of `text` or `json_object`.
   */
  type?: ResponseFormat;
}
/**
 * Possible API response formats.
 */
export type ResponseFormat = "text" | "json_object";/**
 * Possible API response formats.
 */
export enum KnownResponseFormat {
  /**
   * `text` format should be used for requests involving any sort of ToolCall.
   */
  Text = "text",
  /**
   * Using `json_object` format will limit the usage of ToolCall to only functions.
   */
  JsonObject = "json_object",
}
/**
 * The type of response format being defined: `json_schema`
 */
export interface ResponseFormatJsonSchemaType {
  /**
   * Type
   */
  type: "json_schema";
  /**
   * The JSON schema, describing response format.
   */
  jsonSchema: ResponseFormatJsonSchema;
}
/**
 * A description of what the response format is for, used by the model to determine how to respond in the format.
 */
export interface ResponseFormatJsonSchema {
  /**
   * A description of what the response format is for, used by the model to determine how to respond in the format.
   */
  description?: string;
  /**
   * The name of a schema.
   */
  name: string;
  /**
   * The JSON schema object, describing the response format.
   */
  schema: any;
}
export type ArrayToolDefinitionUnion = Array<ToolDefinitionUnion>;
/**
 * Specifies the format that the model must output. Compatible with GPT-4 Turbo and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.
 *
 * Setting to `{ "type": "json_object" }` enables JSON mode, which guarantees the message the model generates is valid JSON.
 *
 * **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message.
 * Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit,
 * resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off
 * if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.
 */
export type AgentsApiResponseFormatOption = string | AgentsApiResponseFormatMode | AgentsApiResponseFormat | ResponseFormatJsonSchemaType;
/**
 * Represents the mode in which the model will handle the return format of a tool call.
 */
export type AgentsApiResponseFormatMode = "auto" | "none";/**
 * Represents the mode in which the model will handle the return format of a tool call.
 */
export enum KnownAgentsApiResponseFormatMode {
  /**
   * Default value. Let the model handle the return format.
   */
  Auto = "auto",
  /**
   * Setting the value to `none`, will result in a 400 Bad request.
   */
  None = "none",
}
/**
 * Represents an agent that can call the model and use tools.
 */
export interface Agent {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always assistant.
   */
  object: "assistant";
  /**
   * The Unix timestamp, in seconds, representing when this object was created.
   */
  createdAt: Date;
  /**
   * The name of the agent.
   */
  name: (string) | null;
  /**
   * The description of the agent.
   */
  description: (string) | null;
  /**
   * The ID of the model to use.
   */
  model: string;
  /**
   * The system instructions for the agent to use.
   */
  instructions: (string) | null;
  /**
   * The collection of tools enabled for the agent.
   */
  tools: (ToolDefinitionUnion)[];
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example, the `code_interpreter`
   * tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources: (ToolResources) | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature: (number) | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  topP: (number) | null;
  /**
   * The response format of the tool calls used by this agent.
   */
  responseFormat?: AgentsApiResponseFormatOption;
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata: (Record<string, string>) | null;
}
/**
 * The response data for a requested list of items.
 */
export interface OpenAiPageableListOfAgent {
  /**
   * The object type, which is always list.
   */
  object: "list";
  /**
   * The requested list of items.
   */
  data: (Agent)[];
  /**
   * The first ID represented in this list.
   */
  firstId: string;
  /**
   * The last ID represented in this list.
   */
  lastId: string;
  /**
   * A value indicating whether there are additional values available not captured in this list.
   */
  hasMore: boolean;
}
export type ArrayAgent = Array<Agent>;
/**
 * The status of an agent deletion operation.
 */
export interface AgentDeletionStatus {
  /**
   * The ID of the resource specified for deletion.
   */
  id: string;
  /**
   * A value indicating whether deletion was successful.
   */
  deleted: boolean;
  /**
   * The object type, which is always 'assistant.deleted'.
   */
  object: "assistant.deleted";
}
/**
 * A single message within an agent thread, as provided during that thread's creation for its initial state.
 */
export interface ThreadMessageOptions {
  /**
   * The role of the entity that is creating the message. Allowed values include:
   * - `user`: Indicates the message is sent by an actual user and should be used in most
   * cases to represent user-generated messages.
   * - `assistant`: Indicates the message is generated by the agent. Use this value to insert
   * messages from the agent into the
   * conversation.
   */
  role: MessageRole;
  /**
   * The textual content of the initial message. Currently, robust input including images and annotated text may only be provided via
   * a separate call to the create message API.
   */
  content: string;
  /**
   * A list of files attached to the message, and the tools they should be added to.
   */
  attachments?: (MessageAttachment)[];
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata?: Record<string, string>;
}
/**
 * The possible values for roles attributed to messages in a thread.
 */
export type MessageRole = "user" | "assistant";/**
 * The possible values for roles attributed to messages in a thread.
 */
export enum KnownMessageRole {
  /**
   * The role representing the end-user.
   */
  User = "user",
  /**
   * The role representing the agent.
   */
  Agent = "assistant",
}
export type ArrayMessageAttachment = Array<MessageAttachment>;
/**
 * This describes to which tools a file has been attached.
 */
export interface MessageAttachment {
  /**
   * The ID of the file to attach to the message.
   */
  fileId?: string;
  /**
   * Azure asset ID.
   */
  dataSource?: VectorStoreDataSource;
  /**
   * The tools to add to this file.
   */
  tools: (MessageAttachmentToolDefinition)[];
}
export type ArrayMessageAttachmentToolDefinition = Array<MessageAttachmentToolDefinition>;
/**
 * The possible tools to which files will be added by this message
 */
export type MessageAttachmentToolDefinition = CodeInterpreterToolDefinition | FileSearchToolDefinition;
export type ArrayThreadMessageOptions = Array<ThreadMessageOptions>;
/**
 * Information about a single thread associated with an agent.
 */
export interface AgentThread {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always 'thread'.
   */
  object: "thread";
  /**
   * The Unix timestamp, in seconds, representing when this object was created.
   */
  createdAt: Date;
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the type
   * of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list
   * of vector store IDs.
   */
  toolResources: (ToolResources) | null;
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata: (Record<string, string>) | null;
}
/**
 * The status of a thread deletion operation.
 */
export interface ThreadDeletionStatus {
  /**
   * The ID of the resource specified for deletion.
   */
  id: string;
  /**
   * A value indicating whether deletion was successful.
   */
  deleted: boolean;
  /**
   * The object type, which is always 'thread.deleted'.
   */
  object: "thread.deleted";
}
/**
 * A single, existing message within an agent thread.
 */
export interface ThreadMessage {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always 'thread.message'.
   */
  object: "thread.message";
  /**
   * The Unix timestamp, in seconds, representing when this object was created.
   */
  createdAt: Date;
  /**
   * The ID of the thread that this message belongs to.
   */
  threadId: string;
  /**
   * The status of the message.
   */
  status: MessageStatus;
  /**
   * On an incomplete message, details about why the message is incomplete.
   */
  incompleteDetails: (MessageIncompleteDetails) | null;
  /**
   * The Unix timestamp (in seconds) for when the message was completed.
   */
  completedAt: (Date) | null;
  /**
   * The Unix timestamp (in seconds) for when the message was marked as incomplete.
   */
  incompleteAt: (Date) | null;
  /**
   * The role associated with the agent thread message.
   */
  role: MessageRole;
  /**
   * The list of content items associated with the agent thread message.
   */
  content: (MessageContentUnion)[];
  /**
   * If applicable, the ID of the agent that authored this message.
   */
  assistantId: (string) | null;
  /**
   * If applicable, the ID of the run associated with the authoring of this message.
   */
  runId: (string) | null;
  /**
   * A list of files attached to the message, and the tools they were added to.
   */
  attachments: ((MessageAttachment)[]) | null;
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata: (Record<string, string>) | null;
}
/**
 * The possible execution status values for a thread message.
 */
export type MessageStatus = "in_progress" | "incomplete" | "completed";/**
 * The possible execution status values for a thread message.
 */
export enum KnownMessageStatus {
  /**
   * A run is currently creating this message.
   */
  InProgress = "in_progress",
  /**
   * This message is incomplete. See incomplete_details for more information.
   */
  Incomplete = "incomplete",
  /**
   * This message was successfully completed by a run.
   */
  Completed = "completed",
}
/**
 * Information providing additional detail about a message entering an incomplete status.
 */
export interface MessageIncompleteDetails {
  /**
   * The provided reason describing why the message was marked as incomplete.
   */
  reason: MessageIncompleteDetailsReason;
}
/**
 * A set of reasons describing why a message is marked as incomplete.
 */
export type MessageIncompleteDetailsReason = "content_filter" | "max_tokens" | "run_cancelled" | "run_failed" | "run_expired";/**
 * A set of reasons describing why a message is marked as incomplete.
 */
export enum KnownMessageIncompleteDetailsReason {
  /**
   * The run generating the message was terminated due to content filter flagging.
   */
  ContentFilter = "content_filter",
  /**
   * The run generating the message exhausted available tokens before completion.
   */
  MaxTokens = "max_tokens",
  /**
   * The run generating the message was cancelled before completion.
   */
  RunCancelled = "run_cancelled",
  /**
   * The run generating the message failed.
   */
  RunFailed = "run_failed",
  /**
   * The run generating the message expired.
   */
  RunExpired = "run_expired",
}
export type ArrayMessageContentUnion = Array<MessageContentUnion>;
/**
 * An abstract representation of a single item of thread message content.
 */
export interface MessageContent {
  /**
   * The object type.
   */
  type: string;
}/**
 * Alias for MessageContentUnion
 */
export type MessageContentUnion = MessageTextContent | MessageImageFileContent | MessageContentUnion;
/**
 * A representation of a textual item of thread message content.
 */
export interface MessageTextContent extends MessageContentUnion {
  /**
   * The object type, which is always 'text'.
   */
  type: "text";
  /**
   * The text and associated annotations for this thread message content item.
   */
  text: MessageTextDetails;
}
/**
 * The text and associated annotations for a single item of agent thread message content.
 */
export interface MessageTextDetails {
  /**
   * The text data.
   */
  value: string;
  /**
   * A list of annotations associated with this text.
   */
  annotations: (MessageTextAnnotationUnion)[];
}
export type ArrayMessageTextAnnotationUnion = Array<MessageTextAnnotationUnion>;
/**
 * An abstract representation of an annotation to text thread message content.
 */
export interface MessageTextAnnotation {
  /**
   * The object type.
   */
  type: string;
  /**
   * The textual content associated with this text annotation item.
   */
  text: string;
}/**
 * Alias for MessageTextAnnotationUnion
 */
export type MessageTextAnnotationUnion = MessageTextFileCitationAnnotation | MessageTextFilePathAnnotation | MessageTextAnnotationUnion;
/**
 * A citation within the message that points to a specific quote from a specific File associated with the agent or the message. Generated when the agent uses the 'file_search' tool to search files.
 */
export interface MessageTextFileCitationAnnotation extends MessageTextAnnotationUnion {
  /**
   * The object type, which is always 'file_citation'.
   */
  type: "file_citation";
  /**
   * A citation within the message that points to a specific quote from a specific file.
   * Generated when the agent uses the "file_search" tool to search files.
   */
  fileCitation: MessageTextFileCitationDetails;
  /**
   * The first text index associated with this text annotation.
   */
  startIndex?: number;
  /**
   * The last text index associated with this text annotation.
   */
  endIndex?: number;
}
/**
 * A representation of a file-based text citation, as used in a file-based annotation of text thread message content.
 */
export interface MessageTextFileCitationDetails {
  /**
   * The ID of the file associated with this citation.
   */
  fileId: string;
  /**
   * The specific quote cited in the associated file.
   */
  quote: string;
}
/**
 * A citation within the message that points to a file located at a specific path.
 */
export interface MessageTextFilePathAnnotation extends MessageTextAnnotationUnion {
  /**
   * The object type, which is always 'file_path'.
   */
  type: "file_path";
  /**
   * A URL for the file that's generated when the agent used the code_interpreter tool to generate a file.
   */
  filePath: MessageTextFilePathDetails;
  /**
   * The first text index associated with this text annotation.
   */
  startIndex?: number;
  /**
   * The last text index associated with this text annotation.
   */
  endIndex?: number;
}
/**
 * An encapsulation of an image file ID, as used by message image content.
 */
export interface MessageTextFilePathDetails {
  /**
   * The ID of the specific file that the citation is from.
   */
  fileId: string;
}
/**
 * A representation of image file content in a thread message.
 */
export interface MessageImageFileContent extends MessageContentUnion {
  /**
   * The object type, which is always 'image_file'.
   */
  type: "image_file";
  /**
   * The image file for this thread message content item.
   */
  imageFile: MessageImageFileDetails;
}
/**
 * An image reference, as represented in thread message content.
 */
export interface MessageImageFileDetails {
  /**
   * The ID for the file associated with this image.
   */
  fileId: string;
}
/**
 * The response data for a requested list of items.
 */
export interface OpenAiPageableListOfThreadMessage {
  /**
   * The object type, which is always list.
   */
  object: "list";
  /**
   * The requested list of items.
   */
  data: (ThreadMessage)[];
  /**
   * The first ID represented in this list.
   */
  firstId: string;
  /**
   * The last ID represented in this list.
   */
  lastId: string;
  /**
   * A value indicating whether there are additional values available not captured in this list.
   */
  hasMore: boolean;
}
export type ArrayThreadMessage = Array<ThreadMessage>;
/**
 * Controls for how a thread will be truncated prior to the run. Use this to control the initial
 * context window of the run.
 */
export interface TruncationObject {
  /**
   * The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will
   * be truncated to the `lastMessages` count most recent messages in the thread. When set to `auto`, messages in the middle of the thread
   * will be dropped to fit the context length of the model, `max_prompt_tokens`.
   */
  type: TruncationStrategy;
  /**
   * The number of most recent messages from the thread when constructing the context for the run.
   */
  lastMessages?: number;
}
/**
 * Possible truncation strategies for the thread.
 */
export type TruncationStrategy = "auto" | "last_messages";/**
 * Possible truncation strategies for the thread.
 */
export enum KnownTruncationStrategy {
  /**
   * Default value. Messages in the middle of the thread will be dropped to fit the context length of the model.
   */
  Auto = "auto",
  /**
   * The thread will truncate to the `lastMessages` count of recent messages.
   */
  LastMessages = "last_messages",
}
/**
 * Specifies a tool the model should use. Use to force the model to call a specific tool.
 */
export interface AgentsNamedToolChoice {
  /**
   * the type of tool. If type is `function`, the function name must be set.
   */
  type: AgentsNamedToolChoiceType;
  /**
   * The name of the function to call
   */
  function_?: FunctionName;
}
/**
 * Available tool types for agents named tools.
 */
export type AgentsNamedToolChoiceType = "function" | "code_interpreter" | "file_search" | "bing_grounding" | "fabric_aiskill" | "sharepoint_grounding" | "azure_ai_search";/**
 * Available tool types for agents named tools.
 */
export enum KnownAgentsNamedToolChoiceType {
  /**
   * Tool type `function`
   */
  Function = "function",
  /**
   * Tool type `code_interpreter`
   */
  CodeInterpreter = "code_interpreter",
  /**
   * Tool type `file_search`
   */
  FileSearch = "file_search",
  /**
   * Tool type `bing_grounding`
   */
  BingGrounding = "bing_grounding",
  /**
   * Tool type `fabric_aiskill`
   */
  MicrosoftFabric = "fabric_aiskill",
  /**
   * Tool type `sharepoint_grounding`
   */
  Sharepoint = "sharepoint_grounding",
  /**
   * Tool type `azure_ai_search`
   */
  AzureAiSearch = "azure_ai_search",
}
/**
 * The function name that will be used, if using the `function` tool
 */
export interface FunctionName {
  /**
   * The name of the function to call
   */
  name: string;
}
/**
 * Controls which (if any) tool is called by the model.
 * - `none` means the model will not call any tools and instead generates a message.
 * - `auto` is the default value and means the model can pick between generating a message or calling a tool.
 * Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}`
 * forces the model to call that tool.
 */
export type AgentsApiToolChoiceOption = string | AgentsApiToolChoiceOptionMode | AgentsNamedToolChoice;
/**
 * Specifies how the tool choice will be used
 */
export type AgentsApiToolChoiceOptionMode = "none" | "auto";/**
 * Specifies how the tool choice will be used
 */
export enum KnownAgentsApiToolChoiceOptionMode {
  /**
   * The model will not call a function and instead generates a message.
   */
  None = "none",
  /**
   * The model can pick between generating a message or calling a function.
   */
  Auto = "auto",
}
/**
 * Data representing a single evaluation run of an agent thread.
 */
export interface ThreadRun {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always 'thread.run'.
   */
  object: "thread.run";
  /**
   * The ID of the thread associated with this run.
   */
  threadId: string;
  /**
   * The ID of the agent associated with the thread this run was performed against.
   */
  assistantId: string;
  /**
   * The status of the agent thread run.
   */
  status: RunStatus;
  /**
   * The details of the action required for the agent thread run to continue.
   */
  requiredAction?: RequiredActionUnion;
  /**
   * The last error, if any, encountered by this agent thread run.
   */
  lastError: (RunError) | null;
  /**
   * The ID of the model to use.
   */
  model: string;
  /**
   * The overridden system instructions used for this agent thread run.
   */
  instructions: string;
  /**
   * The overridden enabled tools used for this agent thread run.
   */
  tools: (ToolDefinitionUnion)[];
  /**
   * The Unix timestamp, in seconds, representing when this object was created.
   */
  createdAt: Date;
  /**
   * The Unix timestamp, in seconds, representing when this item expires.
   */
  expiresAt: (Date) | null;
  /**
   * The Unix timestamp, in seconds, representing when this item was started.
   */
  startedAt: (Date) | null;
  /**
   * The Unix timestamp, in seconds, representing when this completed.
   */
  completedAt: (Date) | null;
  /**
   * The Unix timestamp, in seconds, representing when this was cancelled.
   */
  cancelledAt: (Date) | null;
  /**
   * The Unix timestamp, in seconds, representing when this failed.
   */
  failedAt: (Date) | null;
  /**
   * Details on why the run is incomplete. Will be `null` if the run is not incomplete.
   */
  incompleteDetails: (IncompleteRunDetails) | null;
  /**
   * Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).
   */
  usage: (RunCompletionUsage) | null;
  /**
   * The sampling temperature used for this run. If not set, defaults to 1.
   */
  temperature?: number;
  /**
   * The nucleus sampling value used for this run. If not set, defaults to 1.
   */
  topP?: number;
  /**
   * The maximum number of prompt tokens specified to have been used over the course of the run.
   */
  maxPromptTokens: (number) | null;
  /**
   * The maximum number of completion tokens specified to have been used over the course of the run.
   */
  maxCompletionTokens: (number) | null;
  /**
   * The strategy to use for dropping messages as the context windows moves forward.
   */
  truncationStrategy: (TruncationObject) | null;
  /**
   * Controls whether or not and which tool is called by the model.
   */
  toolChoice: (AgentsApiToolChoiceOption) | null;
  /**
   * The response format of the tool calls used in this run.
   */
  responseFormat: (AgentsApiResponseFormatOption) | null;
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata: (Record<string, string>) | null;
  /**
   * Override the tools the agent can use for this run. This is useful for modifying the behavior on a per-run basis
   */
  toolResources?: UpdateToolResourcesOptions;
  /**
   * Determines if tools can be executed in parallel within the run.
   */
  parallelToolCalls: boolean;
}
/**
 * Possible values for the status of an agent thread run.
 */
export type RunStatus = "queued" | "in_progress" | "requires_action" | "cancelling" | "cancelled" | "failed" | "completed" | "expired";/**
 * Possible values for the status of an agent thread run.
 */
export enum KnownRunStatus {
  /**
   * Represents a run that is queued to start.
   */
  Queued = "queued",
  /**
   * Represents a run that is in progress.
   */
  InProgress = "in_progress",
  /**
   * Represents a run that needs another operation, such as tool output submission, to continue.
   */
  RequiresAction = "requires_action",
  /**
   * Represents a run that is in the process of cancellation.
   */
  Cancelling = "cancelling",
  /**
   * Represents a run that has been cancelled.
   */
  Cancelled = "cancelled",
  /**
   * Represents a run that failed.
   */
  Failed = "failed",
  /**
   * Represents a run that successfully completed.
   */
  Completed = "completed",
  /**
   * Represents a run that expired before it could otherwise finish.
   */
  Expired = "expired",
}
/**
 * An abstract representation of a required action for an agent thread run to continue.
 */
export interface RequiredAction {
  /**
   * The object type.
   */
  type: string;
}/**
 * Alias for RequiredActionUnion
 */
export type RequiredActionUnion = SubmitToolOutputsAction | RequiredActionUnion;
/**
 * The details for required tool calls that must be submitted for an agent thread run to continue.
 */
export interface SubmitToolOutputsAction extends RequiredActionUnion {
  /**
   * The object type, which is always 'submit_tool_outputs'.
   */
  type: "submit_tool_outputs";
  /**
   * The details describing tools that should be called to submit tool outputs.
   */
  submitToolOutputs: SubmitToolOutputsDetails;
}
/**
 * The details describing tools that should be called to submit tool outputs.
 */
export interface SubmitToolOutputsDetails {
  /**
   * The list of tool calls that must be resolved for the agent thread run to continue.
   */
  toolCalls: (RequiredToolCallUnion)[];
}
export type ArrayRequiredToolCallUnion = Array<RequiredToolCallUnion>;
/**
 * An abstract representation of a tool invocation needed by the model to continue a run.
 */
export interface RequiredToolCall {
  /**
   * The object type for the required tool call.
   */
  type: string;
  /**
   * The ID of the tool call. This ID must be referenced when submitting tool outputs.
   */
  id: string;
}/**
 * Alias for RequiredToolCallUnion
 */
export type RequiredToolCallUnion = RequiredFunctionToolCall | RequiredToolCallUnion;
/**
 * A representation of a requested call to a function tool, needed by the model to continue evaluation of a run.
 */
export interface RequiredFunctionToolCall extends RequiredToolCallUnion {
  /**
   * The object type of the required tool call. Always 'function' for function tools.
   */
  type: "function";
  /**
   * Detailed information about the function to be executed by the tool that includes name and arguments.
   */
  function_: RequiredFunctionToolCallDetails;
}
/**
 * The detailed information for a function invocation, as provided by a required action invoking a function tool, that includes the name of and arguments to the function.
 */
export interface RequiredFunctionToolCallDetails {
  /**
   * The name of the function.
   */
  name: string;
  /**
   * The arguments to use when invoking the named function, as provided by the model. Arguments are presented as a JSON document that should be validated and parsed for evaluation.
   */
  arguments: string;
}
/**
 * The details of an error as encountered by an agent thread run.
 */
export interface RunError {
  /**
   * The status for the error.
   */
  code: string;
  /**
   * The human-readable text associated with the error.
   */
  message: string;
}
/**
 * Details on why the run is incomplete. Will be `null` if the run is not incomplete.
 */
export interface IncompleteRunDetails {
  /**
   * The reason why the run is incomplete. This indicates which specific token limit was reached during the run.
   */
  reason: IncompleteDetailsReason;
}
/**
 * The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.
 */
export type IncompleteDetailsReason = "max_completion_tokens" | "max_prompt_tokens";/**
 * The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.
 */
export enum KnownIncompleteDetailsReason {
  /**
   * Maximum completion tokens exceeded
   */
  MaxCompletionTokens = "max_completion_tokens",
  /**
   * Maximum prompt tokens exceeded
   */
  MaxPromptTokens = "max_prompt_tokens",
}
/**
 * Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).
 */
export interface RunCompletionUsage {
  /**
   * Number of completion tokens used over the course of the run.
   */
  completionTokens: number;
  /**
   * Number of prompt tokens used over the course of the run.
   */
  promptTokens: number;
  /**
   * Total number of tokens used (prompt + completion).
   */
  totalTokens: number;
}
/**
 * Request object. A set of resources that are used by the agent's tools. The resources are specific to the type of tool.
 * For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of
 * vector store IDs.
 */
export interface UpdateToolResourcesOptions {
  /**
   * Overrides the list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  codeInterpreter?: UpdateCodeInterpreterToolResourceOptions;
  /**
   * Overrides the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent.
   */
  fileSearch?: UpdateFileSearchToolResourceOptions;
  /**
   * Overrides the resources to be used by the `azure_ai_search` tool consisting of index IDs and names.
   */
  azureAiSearch?: AzureAiSearchResource;
}
/**
 * Request object to update `code_interpreted` tool resources.
 */
export interface UpdateCodeInterpreterToolResourceOptions {
  /**
   * A list of file IDs to override the current list of the agent.
   */
  fileIds?: (string)[];
}
/**
 * Request object to update `file_search` tool resources.
 */
export interface UpdateFileSearchToolResourceOptions {
  /**
   * A list of vector store IDs to override the current list of the agent.
   */
  vectorStoreIds?: (string)[];
}
/**
 * The response data for a requested list of items.
 */
export interface OpenAiPageableListOfThreadRun {
  /**
   * The object type, which is always list.
   */
  object: "list";
  /**
   * The requested list of items.
   */
  data: (ThreadRun)[];
  /**
   * The first ID represented in this list.
   */
  firstId: string;
  /**
   * The last ID represented in this list.
   */
  lastId: string;
  /**
   * A value indicating whether there are additional values available not captured in this list.
   */
  hasMore: boolean;
}
export type ArrayThreadRun = Array<ThreadRun>;
/**
 * The data provided during a tool outputs submission to resolve pending tool calls and allow the model to continue.
 */
export interface ToolOutput {
  /**
   * The ID of the tool call being resolved, as provided in the tool calls of a required action from a run.
   */
  toolCallId?: string;
  /**
   * The output from the tool to be submitted.
   */
  output?: string;
}
export type ArrayToolOutput = Array<ToolOutput>;
/**
 * The details used to create a new agent thread.
 */
export interface AgentThreadCreationOptions {
  /**
   * The initial messages to associate with the new thread.
   */
  messages?: (ThreadMessageOptions)[];
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the
   * type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires
   * a list of vector store IDs.
   */
  toolResources?: ToolResources;
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata?: Record<string, string>;
}
/**
 * Detailed information about a single step of an agent thread run.
 */
export interface RunStep {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always 'thread.run.step'.
   */
  object: "thread.run.step";
  /**
   * The type of run step, which can be either message_creation or tool_calls.
   */
  type: RunStepType;
  /**
   * The ID of the agent associated with the run step.
   */
  assistantId: string;
  /**
   * The ID of the thread that was run.
   */
  threadId: string;
  /**
   * The ID of the run that this run step is a part of.
   */
  runId: string;
  /**
   * The status of this run step.
   */
  status: RunStepStatus;
  /**
   * The details for this run step.
   */
  stepDetails: RunStepDetailsUnion;
  /**
   * If applicable, information about the last error encountered by this run step.
   */
  lastError: (RunStepError) | null;
  /**
   * The Unix timestamp, in seconds, representing when this object was created.
   */
  createdAt: Date;
  /**
   * The Unix timestamp, in seconds, representing when this item expired.
   */
  expiredAt: (Date) | null;
  /**
   * The Unix timestamp, in seconds, representing when this completed.
   */
  completedAt: (Date) | null;
  /**
   * The Unix timestamp, in seconds, representing when this was cancelled.
   */
  cancelledAt: (Date) | null;
  /**
   * The Unix timestamp, in seconds, representing when this failed.
   */
  failedAt: (Date) | null;
  /**
   * Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.
   */
  usage?: RunStepCompletionUsage;
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata: (Record<string, string>) | null;
}
/**
 * The possible types of run steps.
 */
export type RunStepType = "message_creation" | "tool_calls";/**
 * The possible types of run steps.
 */
export enum KnownRunStepType {
  /**
   * Represents a run step to create a message.
   */
  MessageCreation = "message_creation",
  /**
   * Represents a run step that calls tools.
   */
  ToolCalls = "tool_calls",
}
/**
 * Possible values for the status of a run step.
 */
export type RunStepStatus = "in_progress" | "cancelled" | "failed" | "completed" | "expired";/**
 * Possible values for the status of a run step.
 */
export enum KnownRunStepStatus {
  /**
   * Represents a run step still in progress.
   */
  InProgress = "in_progress",
  /**
   * Represents a run step that was cancelled.
   */
  Cancelled = "cancelled",
  /**
   * Represents a run step that failed.
   */
  Failed = "failed",
  /**
   * Represents a run step that successfully completed.
   */
  Completed = "completed",
  /**
   * Represents a run step that expired before otherwise finishing.
   */
  Expired = "expired",
}
/**
 * An abstract representation of the details for a run step.
 */
export interface RunStepDetails {
  /**
   * The object type.
   */
  type: RunStepType;
}/**
 * Alias for RunStepDetailsUnion
 */
export type RunStepDetailsUnion = RunStepMessageCreationDetails | RunStepToolCallDetails | RunStepDetailsUnion;
/**
 * The detailed information associated with a message creation run step.
 */
export interface RunStepMessageCreationDetails extends RunStepDetailsUnion {
  /**
   * The object type, which is always 'message_creation'.
   */
  type: "message_creation";
  /**
   * Information about the message creation associated with this run step.
   */
  messageCreation: RunStepMessageCreationReference;
}
/**
 * The details of a message created as a part of a run step.
 */
export interface RunStepMessageCreationReference {
  /**
   * The ID of the message created by this run step.
   */
  messageId: string;
}
/**
 * The detailed information associated with a run step calling tools.
 */
export interface RunStepToolCallDetails extends RunStepDetailsUnion {
  /**
   * The object type, which is always 'tool_calls'.
   */
  type: "tool_calls";
  /**
   * A list of tool call details for this run step.
   */
  toolCalls: (RunStepToolCallUnion)[];
}
export type ArrayRunStepToolCallUnion = Array<RunStepToolCallUnion>;
/**
 * An abstract representation of a detailed tool call as recorded within a run step for an existing run.
 */
export interface RunStepToolCall {
  /**
   * The object type.
   */
  type: string;
  /**
   * The ID of the tool call. This ID must be referenced when you submit tool outputs.
   */
  id: string;
}/**
 * Alias for RunStepToolCallUnion
 */
export type RunStepToolCallUnion = RunStepCodeInterpreterToolCall | RunStepFileSearchToolCall | RunStepBingGroundingToolCall | RunStepAzureAiSearchToolCall | RunStepSharepointToolCall | RunStepMicrosoftFabricToolCall | RunStepFunctionToolCall | RunStepToolCallUnion;
/**
 * A record of a call to a code interpreter tool, issued by the model in evaluation of a defined tool, that
 * represents inputs and outputs consumed and emitted by the code interpreter.
 */
export interface RunStepCodeInterpreterToolCall extends RunStepToolCallUnion {
  /**
   * The object type, which is always 'code_interpreter'.
   */
  type: "code_interpreter";
  /**
   * The details of the tool call to the code interpreter tool.
   */
  codeInterpreter: RunStepCodeInterpreterToolCallDetails;
}
/**
 * The detailed information about a code interpreter invocation by the model.
 */
export interface RunStepCodeInterpreterToolCallDetails {
  /**
   * The input provided by the model to the code interpreter tool.
   */
  input: string;
  /**
   * The outputs produced by the code interpreter tool back to the model in response to the tool call.
   */
  outputs: (RunStepCodeInterpreterToolCallOutputUnion)[];
}
export type ArrayRunStepCodeInterpreterToolCallOutputUnion = Array<RunStepCodeInterpreterToolCallOutputUnion>;
/**
 * An abstract representation of an emitted output from a code interpreter tool.
 */
export interface RunStepCodeInterpreterToolCallOutput {
  /**
   * The object type.
   */
  type: string;
}/**
 * Alias for RunStepCodeInterpreterToolCallOutputUnion
 */
export type RunStepCodeInterpreterToolCallOutputUnion = RunStepCodeInterpreterLogOutput | RunStepCodeInterpreterImageOutput | RunStepCodeInterpreterToolCallOutputUnion;
/**
 * A representation of a log output emitted by a code interpreter tool in response to a tool call by the model.
 */
export interface RunStepCodeInterpreterLogOutput extends RunStepCodeInterpreterToolCallOutputUnion {
  /**
   * The object type, which is always 'logs'.
   */
  type: "logs";
  /**
   * The serialized log output emitted by the code interpreter.
   */
  logs: string;
}
/**
 * A representation of an image output emitted by a code interpreter tool in response to a tool call by the model.
 */
export interface RunStepCodeInterpreterImageOutput extends RunStepCodeInterpreterToolCallOutputUnion {
  /**
   * The object type, which is always 'image'.
   */
  type: "image";
  /**
   * Referential information for the image associated with this output.
   */
  image: RunStepCodeInterpreterImageReference;
}
/**
 * An image reference emitted by a code interpreter tool in response to a tool call by the model.
 */
export interface RunStepCodeInterpreterImageReference {
  /**
   * The ID of the file associated with this image.
   */
  fileId: string;
}
/**
 * A record of a call to a file search tool, issued by the model in evaluation of a defined tool, that represents
 * executed file search.
 */
export interface RunStepFileSearchToolCall extends RunStepToolCallUnion {
  /**
   * The object type, which is always 'file_search'.
   */
  type: "file_search";
  /**
   * The ID of the tool call. This ID must be referenced when you submit tool outputs.
   */
  id: string;
  /**
   * For now, this is always going to be an empty object.
   */
  fileSearch: RunStepFileSearchToolCallResults;
}
/**
 * The results of the file search.
 */
export interface RunStepFileSearchToolCallResults {
  /**
   * Ranking options for file search.
   */
  rankingOptions?: FileSearchRankingOptions;
  /**
   * The array of a file search results
   */
  results: (RunStepFileSearchToolCallResult)[];
}
export type ArrayRunStepFileSearchToolCallResult = Array<RunStepFileSearchToolCallResult>;
/**
 *   File search tool call result.
 */
export interface RunStepFileSearchToolCallResult {
  /**
   * The ID of the file that result was found in.
   */
  fileId: string;
  /**
   * The name of the file that result was found in.
   */
  fileName: string;
  /**
   * The score of the result. All values must be a floating point number between 0 and 1.
   */
  score: number;
  /**
   * The content of the result that was found. The content is only included if requested via the include query parameter.
   */
  content?: (FileSearchToolCallContent)[];
}
export type ArrayFileSearchToolCallContent = Array<FileSearchToolCallContent>;
/**
 * The file search result content object.
 */
export interface FileSearchToolCallContent {
  /**
   * The type of the content.
   */
  type: "text";
  /**
   * The text content of the file.
   */
  text: string;
}
/**
 * A record of a call to a bing grounding tool, issued by the model in evaluation of a defined tool, that represents
 * executed search with bing grounding.
 */
export interface RunStepBingGroundingToolCall extends RunStepToolCallUnion {
  /**
   * The object type, which is always 'bing_grounding'.
   */
  type: "bing_grounding";
  /**
   * Reserved for future use.
   */
  bingGrounding: Record<string, string>;
}
/**
 * A record of a call to an Azure AI Search tool, issued by the model in evaluation of a defined tool, that represents
 * executed Azure AI search.
 */
export interface RunStepAzureAiSearchToolCall extends RunStepToolCallUnion {
  /**
   * The object type, which is always 'azure_ai_search'.
   */
  type: "azure_ai_search";
  /**
   * Reserved for future use.
   */
  azureAiSearch: Record<string, string>;
}
/**
 * A record of a call to a SharePoint tool, issued by the model in evaluation of a defined tool, that represents
 * executed SharePoint actions.
 */
export interface RunStepSharepointToolCall extends RunStepToolCallUnion {
  /**
   * The object type, which is always 'sharepoint_grounding'.
   */
  type: "sharepoint_grounding";
  /**
   * Reserved for future use.
   */
  sharePoint: Record<string, string>;
}
/**
 * A record of a call to a Microsoft Fabric tool, issued by the model in evaluation of a defined tool, that represents
 * executed Microsoft Fabric operations.
 */
export interface RunStepMicrosoftFabricToolCall extends RunStepToolCallUnion {
  /**
   * The object type, which is always 'fabric_aiskill'.
   */
  type: "fabric_aiskill";
  /**
   * Reserved for future use.
   */
  microsoftFabric: Record<string, string>;
}
/**
 * A record of a call to a function tool, issued by the model in evaluation of a defined tool, that represents the inputs
 * and output consumed and emitted by the specified function.
 */
export interface RunStepFunctionToolCall extends RunStepToolCallUnion {
  /**
   * The object type, which is always 'function'.
   */
  type: "function";
  /**
   * The detailed information about the function called by the model.
   */
  function_: RunStepFunctionToolCallDetails;
}
/**
 * The detailed information about the function called by the model.
 */
export interface RunStepFunctionToolCallDetails {
  /**
   * The name of the function.
   */
  name: string;
  /**
   * The arguments that the model requires are provided to the named function.
   */
  arguments: string;
  /**
   * The output of the function, only populated for function calls that have already have had their outputs submitted.
   */
  output: (string) | null;
}
/**
 * The error information associated with a failed run step.
 */
export interface RunStepError {
  /**
   * The error code for this error.
   */
  code: RunStepErrorCode;
  /**
   * The human-readable text associated with this error.
   */
  message: string;
}
/**
 * Possible error code values attributable to a failed run step.
 */
export type RunStepErrorCode = "server_error" | "rate_limit_exceeded";/**
 * Possible error code values attributable to a failed run step.
 */
export enum KnownRunStepErrorCode {
  /**
   * Represents a server error.
   */
  ServerError = "server_error",
  /**
   * Represents an error indicating configured rate limits were exceeded.
   */
  RateLimitExceeded = "rate_limit_exceeded",
}
/**
 * Usage statistics related to the run step.
 */
export interface RunStepCompletionUsage {
  /**
   * Number of completion tokens used over the course of the run step.
   */
  completionTokens: number;
  /**
   * Number of prompt tokens used over the course of the run step.
   */
  promptTokens: number;
  /**
   * Total number of tokens used (prompt + completion).
   */
  totalTokens: number;
}
/**
 * The response data for a requested list of items.
 */
export interface OpenAiPageableListOfRunStep {
  /**
   * The object type, which is always list.
   */
  object: "list";
  /**
   * The requested list of items.
   */
  data: (RunStep)[];
  /**
   * The first ID represented in this list.
   */
  firstId: string;
  /**
   * The last ID represented in this list.
   */
  lastId: string;
  /**
   * A value indicating whether there are additional values available not captured in this list.
   */
  hasMore: boolean;
}
export type ArrayRunStep = Array<RunStep>;
/**
 * The response data from a file list operation.
 */
export interface FileListResponse {
  /**
   * The object type, which is always 'list'.
   */
  object: "list";
  /**
   * The files returned for the request.
   */
  data: (OpenAiFile)[];
}
export type ArrayOpenAiFile = Array<OpenAIFile>;
/**
 * Represents an agent that can call the model and use tools.
 */
export interface OpenAiFile {
  /**
   * The object type, which is always 'file'.
   */
  object: "file";
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The size of the file, in bytes.
   */
  bytes: number;
  /**
   * The name of the file.
   */
  filename: string;
  /**
   * The Unix timestamp, in seconds, representing when this object was created.
   */
  createdAt: Date;
  /**
   * The intended purpose of a file.
   */
  purpose: FilePurpose;
  /**
   * The state of the file. This field is available in Azure OpenAI only.
   */
  status?: FileState;
  /**
   * The error message with details in case processing of this file failed. This field is available in Azure OpenAI only.
   */
  statusDetails?: string;
}
/**
 * The possible values denoting the intended usage of a file.
 */
export type FilePurpose = "fine-tune" | "fine-tune-results" | "assistants" | "assistants_output" | "batch" | "batch_output" | "vision";/**
 * The possible values denoting the intended usage of a file.
 */
export enum KnownFilePurpose {
  /**
   * Indicates a file is used for fine tuning input.
   */
  FineTune = "fine-tune",
  /**
   * Indicates a file is used for fine tuning results.
   */
  FineTuneResults = "fine-tune-results",
  /**
   * Indicates a file is used as input to agents.
   */
  Agents = "assistants",
  /**
   * Indicates a file is used as output by agents.
   */
  AgentsOutput = "assistants_output",
  /**
   * Indicates a file is used as input to .
   */
  Batch = "batch",
  /**
   * Indicates a file is used as output by a vector store batch operation.
   */
  BatchOutput = "batch_output",
  /**
   * Indicates a file is used as input to a vision operation.
   */
  Vision = "vision",
}
/**
 * The state of the file.
 */
export type FileState = "uploaded" | "pending" | "running" | "processed" | "error" | "deleting" | "deleted";/**
 * The state of the file.
 */
export enum KnownFileState {
  /**
   * The file has been uploaded but it's not yet processed. This state is not returned by Azure OpenAI and exposed only for
   * compatibility. It can be categorized as an inactive state.
   */
  Uploaded = "uploaded",
  /**
   * The operation was created and is not queued to be processed in the future. It can be categorized as an inactive state.
   */
  Pending = "pending",
  /**
   * The operation has started to be processed. It can be categorized as an active state.
   */
  Running = "running",
  /**
   * The operation has successfully processed and is ready for consumption. It can be categorized as a terminal state.
   */
  Processed = "processed",
  /**
   * The operation has completed processing with a failure and cannot be further consumed. It can be categorized as a terminal state.
   */
  Error = "error",
  /**
   * The entity is in the process to be deleted. This state is not returned by Azure OpenAI and exposed only for compatibility.
   * It can be categorized as an active state.
   */
  Deleting = "deleting",
  /**
   * The entity has been deleted but may still be referenced by other entities predating the deletion. It can be categorized as a
   * terminal state.
   */
  Deleted = "deleted",
}
/**
 * model interface _UploadFileRequest
 */
export interface _UploadFileRequest {
  /**
   * The file data, in bytes.
   */
  file: any;
  /**
   * The intended purpose of the uploaded file. Use `assistants` for Agents and Message files, `vision` for Agents image file inputs, `batch` for Batch API, and `fine-tune` for Fine-tuning.
   */
  purpose: FilePurpose;
  /**
   * The name of the file.
   */
  filename?: string;
}
/**
 * A status response from a file deletion operation.
 */
export interface FileDeletionStatus {
  /**
   * The ID of the resource specified for deletion.
   */
  id: string;
  /**
   * A value indicating whether deletion was successful.
   */
  deleted: boolean;
  /**
   * The object type, which is always 'file'.
   */
  object: "file";
}
/**
 * The response data for a requested list of items.
 */
export interface OpenAiPageableListOfVectorStore {
  /**
   * The object type, which is always list.
   */
  object: "list";
  /**
   * The requested list of items.
   */
  data: (VectorStore)[];
  /**
   * The first ID represented in this list.
   */
  firstId: string;
  /**
   * The last ID represented in this list.
   */
  lastId: string;
  /**
   * A value indicating whether there are additional values available not captured in this list.
   */
  hasMore: boolean;
}
export type ArrayVectorStore = Array<VectorStore>;
/**
 * A vector store is a collection of processed files can be used by the `file_search` tool.
 */
export interface VectorStore {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always `vector_store`
   */
  object: "vector_store";
  /**
   * The Unix timestamp (in seconds) for when the vector store was created.
   */
  createdAt: Date;
  /**
   * The name of the vector store.
   */
  name: string;
  /**
   * The total number of bytes used by the files in the vector store.
   */
  usageBytes: number;
  /**
   * Files count grouped by status processed or being processed by this vector store.
   */
  fileCounts: VectorStoreFileCount;
  /**
   * The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.
   */
  status: VectorStoreStatus;
  /**
   * Details on when this vector store expires
   */
  expiresAfter?: VectorStoreExpirationPolicy;
  /**
   * The Unix timestamp (in seconds) for when the vector store will expire.
   */
  expiresAt?: Date;
  /**
   * The Unix timestamp (in seconds) for when the vector store was last active.
   */
  lastActiveAt: (Date) | null;
  /**
   * A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length.
   */
  metadata: (Record<string, string>) | null;
}
/**
 * Counts of files processed or being processed by this vector store grouped by status.
 */
export interface VectorStoreFileCount {
  /**
   * The number of files that are currently being processed.
   */
  inProgress: number;
  /**
   * The number of files that have been successfully processed.
   */
  completed: number;
  /**
   * The number of files that have failed to process.
   */
  failed: number;
  /**
   * The number of files that were cancelled.
   */
  cancelled: number;
  /**
   * The total number of files.
   */
  total: number;
}
/**
 * Vector store possible status
 */
export type VectorStoreStatus = "expired" | "in_progress" | "completed";/**
 * Vector store possible status
 */
export enum KnownVectorStoreStatus {
  /**
   * expired status indicates that this vector store has expired and is no longer available for use.
   */
  Expired = "expired",
  /**
   * in_progress status indicates that this vector store is still processing files.
   */
  InProgress = "in_progress",
  /**
   * completed status indicates that this vector store is ready for use.
   */
  Completed = "completed",
}
/**
 * The expiration policy for a vector store.
 */
export interface VectorStoreExpirationPolicy {
  /**
   * Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.
   */
  anchor: VectorStoreExpirationPolicyAnchor;
  /**
   * The anchor timestamp after which the expiration policy applies.
   */
  days: number;
}
/**
 * Describes the relationship between the days and the expiration of this vector store
 */
export type VectorStoreExpirationPolicyAnchor = "last_active_at";/**
 * Describes the relationship between the days and the expiration of this vector store
 */
export enum KnownVectorStoreExpirationPolicyAnchor {
  /**
   * The expiration policy is based on the last time the vector store was active.
   */
  LastActiveAt = "last_active_at",
}
/**
 * An abstract representation of a vector store chunking strategy configuration.
 */
export interface VectorStoreChunkingStrategyRequest {
  /**
   * The object type.
   */
  type: VectorStoreChunkingStrategyRequestType;
}/**
 * Alias for VectorStoreChunkingStrategyRequestUnion
 */
export type VectorStoreChunkingStrategyRequestUnion = VectorStoreAutoChunkingStrategyRequest | VectorStoreStaticChunkingStrategyRequest | VectorStoreChunkingStrategyRequestUnion;
/**
 * Type of chunking strategy
 */
export type VectorStoreChunkingStrategyRequestType = "auto" | "static";/**
 * Type of chunking strategy
 */
export enum KnownVectorStoreChunkingStrategyRequestType {
  /**
   * auto
   */
  Auto = "auto",
  /**
   * static
   */
  Static = "static",
}
/**
 * The default strategy. This strategy currently uses a max_chunk_size_tokens of 800 and chunk_overlap_tokens of 400.
 */
export interface VectorStoreAutoChunkingStrategyRequest extends VectorStoreChunkingStrategyRequestUnion {
  /**
   * The object type, which is always 'auto'.
   */
  type: "auto";
}
/**
 * A statically configured chunking strategy.
 */
export interface VectorStoreStaticChunkingStrategyRequest extends VectorStoreChunkingStrategyRequestUnion {
  /**
   * The object type, which is always 'static'.
   */
  type: "static";
  /**
   * The options for the static chunking strategy.
   */
  static_: VectorStoreStaticChunkingStrategyOptions;
}
/**
 * Options to configure a vector store static chunking strategy.
 */
export interface VectorStoreStaticChunkingStrategyOptions {
  /**
   * The maximum number of tokens in each chunk. The default value is 800. The minimum value is 100 and the maximum value is 4096.
   */
  maxChunkSizeTokens: number;
  /**
   * The number of tokens that overlap between chunks. The default value is 400.
   * Note that the overlap must not exceed half of max_chunk_size_tokens.
   */
  chunkOverlapTokens: number;
}
/**
 * Response object for deleting a vector store.
 */
export interface VectorStoreDeletionStatus {
  /**
   * The ID of the resource specified for deletion.
   */
  id: string;
  /**
   * A value indicating whether deletion was successful.
   */
  deleted: boolean;
  /**
   * The object type, which is always 'vector_store.deleted'.
   */
  object: "vector_store.deleted";
}
/**
 * The response data for a requested list of items.
 */
export interface OpenAiPageableListOfVectorStoreFile {
  /**
   * The object type, which is always list.
   */
  object: "list";
  /**
   * The requested list of items.
   */
  data: (VectorStoreFile)[];
  /**
   * The first ID represented in this list.
   */
  firstId: string;
  /**
   * The last ID represented in this list.
   */
  lastId: string;
  /**
   * A value indicating whether there are additional values available not captured in this list.
   */
  hasMore: boolean;
}
export type ArrayVectorStoreFile = Array<VectorStoreFile>;
/**
 * Description of a file attached to a vector store.
 */
export interface VectorStoreFile {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always `vector_store.file`.
   */
  object: "vector_store.file";
  /**
   * The total vector store usage in bytes. Note that this may be different from the original file
   * size.
   */
  usageBytes: number;
  /**
   * The Unix timestamp (in seconds) for when the vector store file was created.
   */
  createdAt: Date;
  /**
   * The ID of the vector store that the file is attached to.
   */
  vectorStoreId: string;
  /**
   * The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.
   */
  status: VectorStoreFileStatus;
  /**
   * The last error associated with this vector store file. Will be `null` if there are no errors.
   */
  lastError: (VectorStoreFileError) | null;
  /**
   * The strategy used to chunk the file.
   */
  chunkingStrategy: VectorStoreChunkingStrategyResponseUnion;
}
/**
 * Vector store file status
 */
export type VectorStoreFileStatus = "in_progress" | "completed" | "failed" | "cancelled";/**
 * Vector store file status
 */
export enum KnownVectorStoreFileStatus {
  /**
   * The file is currently being processed.
   */
  InProgress = "in_progress",
  /**
   * The file has been successfully processed.
   */
  Completed = "completed",
  /**
   * The file has failed to process.
   */
  Failed = "failed",
  /**
   * The file was cancelled.
   */
  Cancelled = "cancelled",
}
/**
 * Details on the error that may have occurred while processing a file for this vector store
 */
export interface VectorStoreFileError {
  /**
   * One of `server_error` or `rate_limit_exceeded`.
   */
  code: VectorStoreFileErrorCode;
  /**
   * A human-readable description of the error.
   */
  message: string;
}
/**
 * Error code variants for vector store file processing
 */
export type VectorStoreFileErrorCode = "server_error" | "invalid_file" | "unsupported_file";/**
 * Error code variants for vector store file processing
 */
export enum KnownVectorStoreFileErrorCode {
  /**
   * An server error occurred.
   */
  ServerError = "server_error",
  /**
   * The file is not valid.
   */
  InvalidFile = "invalid_file",
  /**
   * The file is of unsupported type.
   */
  UnsupportedFile = "unsupported_file",
}
/**
 * An abstract representation of a vector store chunking strategy configuration.
 */
export interface VectorStoreChunkingStrategyResponse {
  /**
   * The object type.
   */
  type: VectorStoreChunkingStrategyResponseType;
}/**
 * Alias for VectorStoreChunkingStrategyResponseUnion
 */
export type VectorStoreChunkingStrategyResponseUnion = VectorStoreAutoChunkingStrategyResponse | VectorStoreStaticChunkingStrategyResponse | VectorStoreChunkingStrategyResponseUnion;
/**
 * Type of chunking strategy
 */
export type VectorStoreChunkingStrategyResponseType = "other" | "static";/**
 * Type of chunking strategy
 */
export enum KnownVectorStoreChunkingStrategyResponseType {
  /**
   * other
   */
  Other = "other",
  /**
   * static
   */
  Static = "static",
}
/**
 * This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the chunking_strategy concept was introduced in the API.
 */
export interface VectorStoreAutoChunkingStrategyResponse extends VectorStoreChunkingStrategyResponseUnion {
  /**
   * The object type, which is always 'other'.
   */
  type: "other";
}
/**
 * A statically configured chunking strategy.
 */
export interface VectorStoreStaticChunkingStrategyResponse extends VectorStoreChunkingStrategyResponseUnion {
  /**
   * The object type, which is always 'static'.
   */
  type: "static";
  /**
   * The options for the static chunking strategy.
   */
  static_: VectorStoreStaticChunkingStrategyOptions;
}
/**
 * Response object for deleting a vector store file relationship.
 */
export interface VectorStoreFileDeletionStatus {
  /**
   * The ID of the resource specified for deletion.
   */
  id: string;
  /**
   * A value indicating whether deletion was successful.
   */
  deleted: boolean;
  /**
   * The object type, which is always 'vector_store.deleted'.
   */
  object: "vector_store.file.deleted";
}
/**
 * A batch of files attached to a vector store.
 */
export interface VectorStoreFileBatch {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always `vector_store.file_batch`.
   */
  object: "vector_store.files_batch";
  /**
   * The Unix timestamp (in seconds) for when the vector store files batch was created.
   */
  createdAt: Date;
  /**
   * The ID of the vector store that the file is attached to.
   */
  vectorStoreId: string;
  /**
   * The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.
   */
  status: VectorStoreFileBatchStatus;
  /**
   * Files count grouped by status processed or being processed by this vector store.
   */
  fileCounts: VectorStoreFileCount;
}
/**
 * The status of the vector store file batch.
 */
export type VectorStoreFileBatchStatus = "in_progress" | "completed" | "cancelled" | "failed";/**
 * The status of the vector store file batch.
 */
export enum KnownVectorStoreFileBatchStatus {
  /**
   * The vector store is still processing this file batch.
   */
  InProgress = "in_progress",
  /**
   * the vector store file batch is ready for use.
   */
  Completed = "completed",
  /**
   * The vector store file batch was cancelled.
   */
  Cancelled = "cancelled",
  /**
   * The vector store file batch failed to process.
   */
  Failed = "failed",
}
/**
 * Represents a message delta i.e. any changed fields on a message during streaming.
 */
export interface MessageDeltaChunk {
  /**
   * The identifier of the message, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always `thread.message.delta`.
   */
  object: "thread.message.delta";
  /**
   * The delta containing the fields that have changed on the Message.
   */
  delta: MessageDelta;
}
/**
 * Represents the typed 'delta' payload within a streaming message delta chunk.
 */
export interface MessageDelta {
  /**
   * The entity that produced the message.
   */
  role: MessageRole;
  /**
   * The content of the message as an array of text and/or images.
   */
  content: (MessageDeltaContentUnion)[];
}
export type ArrayMessageDeltaContentUnion = Array<MessageDeltaContentUnion>;
/**
 * The abstract base representation of a partial streamed message content payload.
 */
export interface MessageDeltaContent {
  /**
   * The index of the content part of the message.
   */
  index: number;
  /**
   * The type of content for this content part.
   */
  type: string;
}/**
 * Alias for MessageDeltaContentUnion
 */
export type MessageDeltaContentUnion = MessageDeltaImageFileContent | MessageDeltaTextContent | MessageDeltaContentUnion;
/**
 * Represents a streamed image file content part within a streaming message delta chunk.
 */
export interface MessageDeltaImageFileContent extends MessageDeltaContentUnion {
  /**
   * The type of content for this content part, which is always "image_file."
   */
  type: "image_file";
  /**
   * The image_file data.
   */
  imageFile?: MessageDeltaImageFileContentObject;
}
/**
 * Represents the 'image_file' payload within streaming image file content.
 */
export interface MessageDeltaImageFileContentObject {
  /**
   * The file ID of the image in the message content.
   */
  fileId?: string;
}
/**
 * Represents a streamed text content part within a streaming message delta chunk.
 */
export interface MessageDeltaTextContent extends MessageDeltaContentUnion {
  /**
   * The type of content for this content part, which is always "text."
   */
  type: "text";
  /**
   * The text content details.
   */
  text?: MessageDeltaTextContentObject;
}
/**
 * Represents the data of a streamed text content part within a streaming message delta chunk.
 */
export interface MessageDeltaTextContentObject {
  /**
   * The data that makes up the text.
   */
  value?: string;
  /**
   * Annotations for the text.
   */
  annotations?: (MessageDeltaTextAnnotationUnion)[];
}
export type ArrayMessageDeltaTextAnnotationUnion = Array<MessageDeltaTextAnnotationUnion>;
/**
 * The abstract base representation of a streamed text content part's text annotation.
 */
export interface MessageDeltaTextAnnotation {
  /**
   * The index of the annotation within a text content part.
   */
  index: number;
  /**
   * The type of the text content annotation.
   */
  type: string;
}/**
 * Alias for MessageDeltaTextAnnotationUnion
 */
export type MessageDeltaTextAnnotationUnion = MessageDeltaTextFileCitationAnnotation | MessageDeltaTextFilePathAnnotation | MessageDeltaTextAnnotationUnion;
/**
 * Represents a streamed file citation applied to a streaming text content part.
 */
export interface MessageDeltaTextFileCitationAnnotation extends MessageDeltaTextAnnotationUnion {
  /**
   * The type of the text content annotation, which is always "file_citation."
   */
  type: "file_citation";
  /**
   * The file citation information.
   */
  fileCitation?: MessageDeltaTextFileCitationAnnotationObject;
  /**
   * The text in the message content that needs to be replaced
   */
  text?: string;
  /**
   * The start index of this annotation in the content text.
   */
  startIndex?: number;
  /**
   * The end index of this annotation in the content text.
   */
  endIndex?: number;
}
/**
 * Represents the data of a streamed file citation as applied to a streaming text content part.
 */
export interface MessageDeltaTextFileCitationAnnotationObject {
  /**
   * The ID of the specific file the citation is from.
   */
  fileId?: string;
  /**
   * The specific quote in the cited file.
   */
  quote?: string;
}
/**
 * Represents a streamed file path annotation applied to a streaming text content part.
 */
export interface MessageDeltaTextFilePathAnnotation extends MessageDeltaTextAnnotationUnion {
  /**
   * The type of the text content annotation, which is always "file_path."
   */
  type: "file_path";
  /**
   * The file path information.
   */
  filePath?: MessageDeltaTextFilePathAnnotationObject;
  /**
   * The start index of this annotation in the content text.
   */
  startIndex?: number;
  /**
   * The end index of this annotation in the content text.
   */
  endIndex?: number;
  /**
   * The text in the message content that needs to be replaced
   */
  text?: string;
}
/**
 * Represents the data of a streamed file path annotation as applied to a streaming text content part.
 */
export interface MessageDeltaTextFilePathAnnotationObject {
  /**
   * The file ID for the annotation.
   */
  fileId?: string;
}
/**
 * Represents a run step delta i.e. any changed fields on a run step during streaming.
 */
export interface RunStepDeltaChunk {
  /**
   * The identifier of the run step, which can be referenced in API endpoints.
   */
  id: string;
  /**
   * The object type, which is always `thread.run.step.delta`.
   */
  object: "thread.run.step.delta";
  /**
   * The delta containing the fields that have changed on the run step.
   */
  delta: RunStepDelta;
}
/**
 * Represents the delta payload in a streaming run step delta chunk.
 */
export interface RunStepDelta {
  /**
   * The details of the run step.
   */
  stepDetails?: RunStepDeltaDetailUnion;
}
/**
 * Represents a single run step detail item in a streaming run step's delta payload.
 */
export interface RunStepDeltaDetail {
  /**
   * The object type for the run step detail object.
   */
  type: string;
}/**
 * Alias for RunStepDeltaDetailUnion
 */
export type RunStepDeltaDetailUnion = RunStepDeltaMessageCreation | RunStepDeltaToolCallObject | RunStepDeltaDetailUnion;
/**
 * Represents a message creation within a streaming run step delta.
 */
export interface RunStepDeltaMessageCreation extends RunStepDeltaDetailUnion {
  /**
   * The object type, which is always "message_creation."
   */
  type: "message_creation";
  /**
   * The message creation data.
   */
  messageCreation?: RunStepDeltaMessageCreationObject;
}
/**
 * Represents the data within a streaming run step message creation response object.
 */
export interface RunStepDeltaMessageCreationObject {
  /**
   * The ID of the newly-created message.
   */
  messageId?: string;
}
/**
 * Represents an invocation of tool calls as part of a streaming run step.
 */
export interface RunStepDeltaToolCallObject extends RunStepDeltaDetailUnion {
  /**
   * The object type, which is always "tool_calls."
   */
  type: "tool_calls";
  /**
   * The collection of tool calls for the tool call detail item.
   */
  toolCalls?: (RunStepDeltaToolCallUnion)[];
}
export type ArrayRunStepDeltaToolCallUnion = Array<RunStepDeltaToolCallUnion>;
/**
 * The abstract base representation of a single tool call within a streaming run step's delta tool call details.
 */
export interface RunStepDeltaToolCall {
  /**
   * The index of the tool call detail in the run step's tool_calls array.
   */
  index: number;
  /**
   * The ID of the tool call, used when submitting outputs to the run.
   */
  id: string;
  /**
   * The type of the tool call detail item in a streaming run step's details.
   */
  type: string;
}/**
 * Alias for RunStepDeltaToolCallUnion
 */
export type RunStepDeltaToolCallUnion = RunStepDeltaFunctionToolCall | RunStepDeltaFileSearchToolCall | RunStepDeltaCodeInterpreterToolCall | RunStepDeltaToolCallUnion;
/**
 * Represents a function tool call within a streaming run step's tool call details.
 */
export interface RunStepDeltaFunctionToolCall extends RunStepDeltaToolCallUnion {
  /**
   * The object type, which is always "function."
   */
  type: "function";
  /**
   * The function data for the tool call.
   */
  function_?: RunStepDeltaFunction;
}
/**
 * Represents the function data in a streaming run step delta's function tool call.
 */
export interface RunStepDeltaFunction {
  /**
   * The name of the function.
   */
  name?: string;
  /**
   * The arguments passed to the function as input.
   */
  arguments?: string;
  /**
   * The output of the function, null if outputs have not yet been submitted.
   */
  output?: string;
}
/**
 * Represents a file search tool call within a streaming run step's tool call details.
 */
export interface RunStepDeltaFileSearchToolCall extends RunStepDeltaToolCallUnion {
  /**
   * The object type, which is always "file_search."
   */
  type: "file_search";
  /**
   * Reserved for future use.
   */
  fileSearch?: Record<string, string>;
}
/**
 * Represents a Code Interpreter tool call within a streaming run step's tool call details.
 */
export interface RunStepDeltaCodeInterpreterToolCall extends RunStepDeltaToolCallUnion {
  /**
   * The object type, which is always "code_interpreter."
   */
  type: "code_interpreter";
  /**
   * The Code Interpreter data for the tool call.
   */
  codeInterpreter?: RunStepDeltaCodeInterpreterDetailItemObject;
}
/**
 * Represents the Code Interpreter tool call data in a streaming run step's tool calls.
 */
export interface RunStepDeltaCodeInterpreterDetailItemObject {
  /**
   * The input into the Code Interpreter tool call.
   */
  input?: string;
  /**
   * The outputs from the Code Interpreter tool call. Code Interpreter can output one or more
   * items, including text (`logs`) or images (`image`). Each of these are represented by a
   * different object type.
   */
  outputs?: (RunStepDeltaCodeInterpreterOutputUnion)[];
}
export type ArrayRunStepDeltaCodeInterpreterOutputUnion = Array<RunStepDeltaCodeInterpreterOutputUnion>;
/**
 * The abstract base representation of a streaming run step tool call's Code Interpreter tool output.
 */
export interface RunStepDeltaCodeInterpreterOutput {
  /**
   * The index of the output in the streaming run step tool call's Code Interpreter outputs array.
   */
  index: number;
  /**
   * The type of the streaming run step tool call's Code Interpreter output.
   */
  type: string;
}/**
 * Alias for RunStepDeltaCodeInterpreterOutputUnion
 */
export type RunStepDeltaCodeInterpreterOutputUnion = RunStepDeltaCodeInterpreterLogOutput | RunStepDeltaCodeInterpreterImageOutput | RunStepDeltaCodeInterpreterOutputUnion;
/**
 * Represents a log output as produced by the Code Interpreter tool and as represented in a streaming run step's delta tool calls collection.
 */
export interface RunStepDeltaCodeInterpreterLogOutput extends RunStepDeltaCodeInterpreterOutputUnion {
  /**
   * The type of the object, which is always "logs."
   */
  type: "logs";
  /**
   * The text output from the Code Interpreter tool call.
   */
  logs?: string;
}
/**
 * Represents an image output as produced the Code interpreter tool and as represented in a streaming run step's delta tool calls collection.
 */
export interface RunStepDeltaCodeInterpreterImageOutput extends RunStepDeltaCodeInterpreterOutputUnion {
  /**
   * The object type, which is always "image."
   */
  type: "image";
  /**
   * The image data for the Code Interpreter tool call output.
   */
  image?: RunStepDeltaCodeInterpreterImageOutputObject;
}
/**
 * Represents the data for a streaming run step's Code Interpreter tool call image output.
 */
export interface RunStepDeltaCodeInterpreterImageOutputObject {
  /**
   * The file ID for the image.
   */
  fileId?: string;
}
/**
 * Each event in a server-sent events stream has an `event` and `data` property:
 *
 * ```
 * event: thread.created
 * data: {"id": "thread_123", "object": "thread", ...}
 * ```
 *
 * We emit events whenever a new object is created, transitions to a new state, or is being
 * streamed in parts (deltas). For example, we emit `thread.run.created` when a new run
 * is created, `thread.run.completed` when a run completes, and so on. When an Agent chooses
 * to create a message during a run, we emit a `thread.message.created event`, a
 * `thread.message.in_progress` event, many `thread.message.delta` events, and finally a
 * `thread.message.completed` event.
 *
 * We may add additional events over time, so we recommend handling unknown events gracefully
 * in your code.
 */
export type AgentStreamEvent = string | ThreadStreamEvent | RunStreamEvent | RunStepStreamEvent | MessageStreamEvent | ErrorEvent | DoneEvent;
/**
 * Thread operation related streaming events
 */
export type ThreadStreamEvent = "thread.created";/**
 * Thread operation related streaming events
 */
export enum KnownThreadStreamEvent {
  /**
   * Event sent when a new thread is created. The data of this event is of type AgentThread
   */
  ThreadCreated = "thread.created",
}
/**
 * Run operation related streaming events
 */
export type RunStreamEvent = "thread.run.created" | "thread.run.queued" | "thread.run.in_progress" | "thread.run.requires_action" | "thread.run.completed" | "thread.run.incomplete" | "thread.run.failed" | "thread.run.cancelling" | "thread.run.cancelled" | "thread.run.expired";/**
 * Run operation related streaming events
 */
export enum KnownRunStreamEvent {
  /**
   * Event sent when a new run is created. The data of this event is of type ThreadRun
   */
  ThreadRunCreated = "thread.run.created",
  /**
   * Event sent when a run moves to `queued` status. The data of this event is of type ThreadRun
   */
  ThreadRunQueued = "thread.run.queued",
  /**
   * Event sent when a run moves to `in_progress` status. The data of this event is of type ThreadRun
   */
  ThreadRunInProgress = "thread.run.in_progress",
  /**
   * Event sent when a run moves to `requires_action` status. The data of this event is of type ThreadRun
   */
  ThreadRunRequiresAction = "thread.run.requires_action",
  /**
   * Event sent when a run is completed. The data of this event is of type ThreadRun
   */
  ThreadRunCompleted = "thread.run.completed",
  /**
   * Event sent when a run ends incomplete. The data of this event is of type ThreadRun
   */
  ThreadRunIncomplete = "thread.run.incomplete",
  /**
   * Event sent when a run fails. The data of this event is of type ThreadRun
   */
  ThreadRunFailed = "thread.run.failed",
  /**
   * Event sent when a run moves to `cancelling` status. The data of this event is of type ThreadRun
   */
  ThreadRunCancelling = "thread.run.cancelling",
  /**
   * Event sent when a run is cancelled. The data of this event is of type ThreadRun
   */
  ThreadRunCancelled = "thread.run.cancelled",
  /**
   * Event sent when a run is expired. The data of this event is of type ThreadRun
   */
  ThreadRunExpired = "thread.run.expired",
}
/**
 * Run step operation related streaming events
 */
export type RunStepStreamEvent = "thread.run.step.created" | "thread.run.step.in_progress" | "thread.run.step.delta" | "thread.run.step.completed" | "thread.run.step.failed" | "thread.run.step.cancelled" | "thread.run.step.expired";/**
 * Run step operation related streaming events
 */
export enum KnownRunStepStreamEvent {
  /**
   * Event sent when a new thread run step is created. The data of this event is of type RunStep
   */
  ThreadRunStepCreated = "thread.run.step.created",
  /**
   * Event sent when a run step moves to `in_progress` status. The data of this event is of type RunStep
   */
  ThreadRunStepInProgress = "thread.run.step.in_progress",
  /**
   * Event sent when a run step is being streamed. The data of this event is of type RunStepDeltaChunk
   */
  ThreadRunStepDelta = "thread.run.step.delta",
  /**
   * Event sent when a run step is completed. The data of this event is of type RunStep
   */
  ThreadRunStepCompleted = "thread.run.step.completed",
  /**
   * Event sent when a run step fails. The data of this event is of type RunStep
   */
  ThreadRunStepFailed = "thread.run.step.failed",
  /**
   * Event sent when a run step is cancelled. The data of this event is of type RunStep
   */
  ThreadRunStepCancelled = "thread.run.step.cancelled",
  /**
   * Event sent when a run step is expired. The data of this event is of type RunStep
   */
  ThreadRunStepExpired = "thread.run.step.expired",
}
/**
 * Message operation related streaming events
 */
export type MessageStreamEvent = "thread.message.created" | "thread.message.in_progress" | "thread.message.delta" | "thread.message.completed" | "thread.message.incomplete";/**
 * Message operation related streaming events
 */
export enum KnownMessageStreamEvent {
  /**
   * Event sent when a new message is created. The data of this event is of type ThreadMessage
   */
  ThreadMessageCreated = "thread.message.created",
  /**
   * Event sent when a message moves to `in_progress` status. The data of this event is of type ThreadMessage
   */
  ThreadMessageInProgress = "thread.message.in_progress",
  /**
   * Event sent when a message is being streamed. The data of this event is of type MessageDeltaChunk
   */
  ThreadMessageDelta = "thread.message.delta",
  /**
   * Event sent when a message is completed. The data of this event is of type ThreadMessage
   */
  ThreadMessageCompleted = "thread.message.completed",
  /**
   * Event sent before a message is completed. The data of this event is of type ThreadMessage
   */
  ThreadMessageIncomplete = "thread.message.incomplete",
}
/**
 * Terminal event indicating a server side error while streaming.
 */
export type ErrorEvent = "error";/**
 * Terminal event indicating a server side error while streaming.
 */
export enum KnownErrorEvent {
  /**
   * Event sent when an error occurs, such as an internal server error or a timeout.
   */
  Error = "error",
}
/**
 * Terminal event indicating the successful end of a stream.
 */
export type DoneEvent = "done";/**
 * Terminal event indicating the successful end of a stream.
 */
export enum KnownDoneEvent {
  /**
   * Event sent when the stream is done.
   */
  Done = "done",
}
/**
 * The available sorting options when requesting a list of response objects.
 */
export type ListSortOrder = "asc" | "desc";/**
 * The available sorting options when requesting a list of response objects.
 */
export enum KnownListSortOrder {
  /**
   * Specifies an ascending sort order.
   */
  Ascending = "asc",
  /**
   * Specifies a descending sort order.
   */
  Descending = "desc",
}
/**
 * A list of additional fields to include in the response.
 */
export type RunAdditionalFieldList = "step_details.tool_calls[*].file_search.results[*].content";/**
 * A list of additional fields to include in the response.
 */
export enum KnownRunAdditionalFieldList {
  /**
   * File search result content.
   */
  FileSearchContents = "step_details.tool_calls[*].file_search.results[*].content",
}
/**
 * Query parameter filter for vector store file retrieval endpoint
 */
export type VectorStoreFileStatusFilter = "in_progress" | "completed" | "failed" | "cancelled";/**
 * Query parameter filter for vector store file retrieval endpoint
 */
export enum KnownVectorStoreFileStatusFilter {
  /**
   * Retrieve only files that are currently being processed
   */
  InProgress = "in_progress",
  /**
   * Retrieve only files that have been successfully processed
   */
  Completed = "completed",
  /**
   * Retrieve only files that have failed to process
   */
  Failed = "failed",
  /**
   * Retrieve only files that were cancelled
   */
  Cancelled = "cancelled",
}
export type ArrayRunAdditionalFieldList = Array<RunAdditionalFieldList>;
