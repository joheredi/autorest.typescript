// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  AudioTranscriptionFormat,
  AudioTranscriptionOptions,
  AudioTranscription,
  AudioTaskLabel,
  AudioTranscriptionSegment,
  AudioTranslationFormat,
  AudioTranslationOptions,
  AudioTranslation,
  AudioTranslationSegment,
  CompletionsOptions,
  Completions,
  ContentFilterResultsForPrompt,
  ContentFilterResultDetailsForPrompt,
  ContentFilterResult,
  ContentFilterSeverity,
  ContentFilterDetectionResult,
  ContentFilterBlocklistIdResult,
  Choice,
  ContentFilterResultsForChoice,
  ContentFilterCitedDetectionResult,
  CompletionsLogProbabilityModel,
  CompletionsFinishReason,
  CompletionsUsage,
  ChatRequestMessage,
  ChatRequestSystemMessage,
  ChatRequestUserMessage,
  ChatMessageContentItem,
  ChatMessageTextContentItem,
  ChatMessageImageContentItem,
  ChatMessageImageUrl,
  ChatMessageImageDetailLevel,
  ChatRequestAssistantMessage,
  ChatCompletionsToolCall,
  ChatCompletionsFunctionToolCall,
  FunctionCall,
  ChatRequestToolMessage,
  ChatRequestFunctionMessage,
  ChatRole,
  FunctionDefinition,
  FunctionCallPreset,
  FunctionName,
  AzureChatExtensionConfiguration,
  AzureSearchChatExtensionConfiguration,
  AzureSearchChatExtensionParameters,
  OnYourDataAuthenticationOptions,
  OnYourDataApiKeyAuthenticationOptions,
  OnYourDataConnectionStringAuthenticationOptions,
  OnYourDataKeyAndKeyIdAuthenticationOptions,
  OnYourDataEncodedApiKeyAuthenticationOptions,
  OnYourDataAccessTokenAuthenticationOptions,
  OnYourDataSystemAssignedManagedIdentityAuthenticationOptions,
  OnYourDataUserAssignedManagedIdentityAuthenticationOptions,
  OnYourDataAuthenticationType,
  AzureSearchIndexFieldMappingOptions,
  AzureSearchQueryType,
  OnYourDataVectorizationSource,
  OnYourDataEndpointVectorizationSource,
  OnYourDataDeploymentNameVectorizationSource,
  OnYourDataModelIdVectorizationSource,
  OnYourDataVectorizationSourceType,
  AzureMachineLearningIndexChatExtensionConfiguration,
  AzureMachineLearningIndexChatExtensionParameters,
  AzureCosmosDBChatExtensionConfiguration,
  AzureCosmosDBChatExtensionParameters,
  AzureCosmosDBFieldMappingOptions,
  ElasticsearchChatExtensionConfiguration,
  ElasticsearchChatExtensionParameters,
  ElasticsearchIndexFieldMappingOptions,
  ElasticsearchQueryType,
  PineconeChatExtensionConfiguration,
  PineconeChatExtensionParameters,
  PineconeFieldMappingOptions,
  AzureChatExtensionType,
  AzureChatEnhancementConfiguration,
  AzureChatGroundingEnhancementConfiguration,
  AzureChatOCREnhancementConfiguration,
  ChatCompletionsResponseFormat,
  ChatCompletionsTextResponseFormat,
  ChatCompletionsJsonResponseFormat,
  ChatCompletionsToolDefinition,
  ChatCompletionsFunctionToolDefinition,
  ChatCompletionsToolSelectionPreset,
  ChatCompletionsNamedToolSelection,
  ChatCompletionsNamedFunctionToolSelection,
  ChatCompletionsFunctionToolSelection,
  ChatCompletionsOptions,
  ChatCompletions,
  ChatChoice,
  ChatResponseMessage,
  AzureChatExtensionsMessageContext,
  AzureChatExtensionDataSourceResponseCitation,
  ChatChoiceLogProbabilityInfo,
  ChatTokenLogProbabilityResult,
  ChatTokenLogProbabilityInfo,
  ChatFinishDetails,
  StopFinishDetails,
  MaxTokensFinishDetails,
  AzureChatEnhancements,
  AzureGroundingEnhancement,
  AzureGroundingEnhancementLine,
  AzureGroundingEnhancementLineSpan,
  AzureGroundingEnhancementCoordinatePoint,
  ImageSize,
  ImageGenerationResponseFormat,
  ImageGenerationQuality,
  ImageGenerationStyle,
  ImageGenerationOptions,
  ImageGenerations,
  ImageGenerationData,
  AudioSpeechVoice,
  AudioSpeechOutputFormat,
  AudioSpeechOptions,
  EmbeddingsOptions,
  Embeddings,
  EmbeddingItem,
  EmbeddingsUsage,
  ServiceApiVersions,
  ChatRequestMessageUnion,
  ChatMessageContentItemUnion,
  ChatCompletionsToolCallUnion,
  AzureChatExtensionConfigurationUnion,
  OnYourDataAuthenticationOptionsUnion,
  OnYourDataVectorizationSourceUnion,
  ChatCompletionsResponseFormatUnion,
  ChatCompletionsToolDefinitionUnion,
  ChatCompletionsNamedToolSelectionUnion,
  ChatFinishDetailsUnion,
} from "./models.js";
export {
  GetAudioTranscriptionAsPlainTextOptionalParams,
  GetAudioTranscriptionAsResponseObjectOptionalParams,
  GetAudioTranslationAsPlainTextOptionalParams,
  GetAudioTranslationAsResponseObjectOptionalParams,
  GetCompletionsOptionalParams,
  GetChatCompletionsOptionalParams,
  GetImageGenerationsOptionalParams,
  GetAudioSpeechOptionalParams,
  GetEmbeddingsOptionalParams,
} from "./options.js";
