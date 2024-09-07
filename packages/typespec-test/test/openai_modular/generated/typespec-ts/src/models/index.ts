// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  audioTranscriptionOptionsDeserializer,
  audioTranscriptionFormatDeserializer,
  audioTranscriptionTimestampGranularityDeserializer,
  audioTaskLabelDeserializer,
  audioTranslationOptionsDeserializer,
  audioTranslationFormatDeserializer,
  completionsOptionsDeserializer,
  contentFilterSeverityDeserializer,
  completionsFinishReasonDeserializer,
  chatCompletionsOptionsDeserializer,
  chatRequestMessageDeserializer,
  chatRequestMessageUnionDeserializer,
  chatRoleDeserializer,
  chatRequestSystemMessageDeserializer,
  chatRequestUserMessageDeserializer,
  chatRequestUserMessageContentDeserializer,
  chatMessageContentItemDeserializer,
  chatMessageContentItemUnionDeserializer,
  chatMessageTextContentItemDeserializer,
  chatMessageImageContentItemDeserializer,
  chatMessageImageUrlDeserializer,
  chatMessageImageDetailLevelDeserializer,
  chatRequestAssistantMessageDeserializer,
  chatCompletionsToolCallDeserializer,
  chatCompletionsToolCallUnionDeserializer,
  chatCompletionsFunctionToolCallDeserializer,
  functionCallDeserializer,
  chatRequestToolMessageDeserializer,
  chatRequestFunctionMessageDeserializer,
  functionDefinitionDeserializer,
  chatCompletionsOptionsFunctionCallDeserializer,
  functionCallPresetDeserializer,
  functionNameDeserializer,
  azureChatExtensionConfigurationDeserializer,
  azureChatExtensionConfigurationUnionDeserializer,
  azureChatExtensionTypeDeserializer,
  azureSearchChatExtensionConfigurationDeserializer,
  azureSearchChatExtensionParametersDeserializer,
  onYourDataAuthenticationOptionsDeserializer,
  onYourDataAuthenticationOptionsUnionDeserializer,
  onYourDataAuthenticationTypeDeserializer,
  onYourDataApiKeyAuthenticationOptionsDeserializer,
  onYourDataConnectionStringAuthenticationOptionsDeserializer,
  onYourDataKeyAndKeyIdAuthenticationOptionsDeserializer,
  onYourDataEncodedApiKeyAuthenticationOptionsDeserializer,
  onYourDataAccessTokenAuthenticationOptionsDeserializer,
  onYourDataSystemAssignedManagedIdentityAuthenticationOptionsDeserializer,
  onYourDataUserAssignedManagedIdentityAuthenticationOptionsDeserializer,
  onYourDataContextPropertyDeserializer,
  azureSearchIndexFieldMappingOptionsDeserializer,
  azureSearchQueryTypeDeserializer,
  onYourDataVectorizationSourceDeserializer,
  onYourDataVectorizationSourceUnionDeserializer,
  onYourDataVectorizationSourceTypeDeserializer,
  onYourDataEndpointVectorizationSourceDeserializer,
  onYourDataVectorSearchAuthenticationOptionsDeserializer,
  onYourDataVectorSearchAuthenticationOptionsUnionDeserializer,
  onYourDataVectorSearchAuthenticationTypeDeserializer,
  onYourDataVectorSearchApiKeyAuthenticationOptionsDeserializer,
  onYourDataVectorSearchAccessTokenAuthenticationOptionsDeserializer,
  onYourDataDeploymentNameVectorizationSourceDeserializer,
  onYourDataModelIdVectorizationSourceDeserializer,
  azureMachineLearningIndexChatExtensionConfigurationDeserializer,
  azureMachineLearningIndexChatExtensionParametersDeserializer,
  azureCosmosDBChatExtensionConfigurationDeserializer,
  azureCosmosDBChatExtensionParametersDeserializer,
  azureCosmosDBFieldMappingOptionsDeserializer,
  elasticsearchChatExtensionConfigurationDeserializer,
  elasticsearchChatExtensionParametersDeserializer,
  elasticsearchIndexFieldMappingOptionsDeserializer,
  elasticsearchQueryTypeDeserializer,
  pineconeChatExtensionConfigurationDeserializer,
  pineconeChatExtensionParametersDeserializer,
  pineconeFieldMappingOptionsDeserializer,
  azureChatEnhancementConfigurationDeserializer,
  azureChatGroundingEnhancementConfigurationDeserializer,
  azureChatOCREnhancementConfigurationDeserializer,
  chatCompletionsResponseFormatDeserializer,
  chatCompletionsResponseFormatUnionDeserializer,
  chatCompletionsTextResponseFormatDeserializer,
  chatCompletionsJsonResponseFormatDeserializer,
  chatCompletionsToolDefinitionDeserializer,
  chatCompletionsToolDefinitionUnionDeserializer,
  chatCompletionsFunctionToolDefinitionDeserializer,
  chatCompletionsOptionsToolChoiceDeserializer,
  chatCompletionsToolSelectionPresetDeserializer,
  chatCompletionsNamedToolSelectionDeserializer,
  chatCompletionsNamedToolSelectionUnionDeserializer,
  chatCompletionsNamedFunctionToolSelectionDeserializer,
  chatCompletionsFunctionToolSelectionDeserializer,
  azureChatExtensionRetrieveDocumentFilterReasonDeserializer,
  imageGenerationOptionsDeserializer,
  imageSizeDeserializer,
  imageGenerationResponseFormatDeserializer,
  imageGenerationQualityDeserializer,
  imageGenerationStyleDeserializer,
  speechGenerationOptionsDeserializer,
  speechVoiceDeserializer,
  speechGenerationResponseFormatDeserializer,
  embeddingsOptionsDeserializer,
  embeddingEncodingFormatDeserializer,
  serviceApiVersionsDeserializer,
  AudioTranscriptionOptions,
  AudioTranscriptionFormat,
  AudioTranscriptionTimestampGranularity,
  AudioTranscription,
  AudioTaskLabel,
  AudioTranscriptionSegment,
  AudioTranscriptionWord,
  AudioTranslationOptions,
  AudioTranslationFormat,
  AudioTranslation,
  AudioTranslationSegment,
  CompletionsOptions,
  Completions,
  ContentFilterResultsForPrompt,
  ContentFilterResultDetailsForPrompt,
  ContentFilterResult,
  ContentFilterSeverity,
  ContentFilterDetectionResult,
  ContentFilterDetailedResults,
  ContentFilterBlocklistIdResult,
  Choice,
  ContentFilterResultsForChoice,
  ContentFilterCitedDetectionResult,
  CompletionsLogProbabilityModel,
  CompletionsFinishReason,
  CompletionsUsage,
  ChatCompletionsOptions,
  ChatRequestMessage,
  ChatRequestMessageUnion,
  ChatRole,
  ChatRequestSystemMessage,
  ChatRequestUserMessage,
  ChatRequestUserMessageContent,
  ChatMessageContentItem,
  ChatMessageContentItemUnion,
  ChatMessageTextContentItem,
  ChatMessageImageContentItem,
  ChatMessageImageUrl,
  ChatMessageImageDetailLevel,
  ChatRequestAssistantMessage,
  ChatCompletionsToolCall,
  ChatCompletionsToolCallUnion,
  ChatCompletionsFunctionToolCall,
  FunctionCall,
  ChatRequestToolMessage,
  ChatRequestFunctionMessage,
  FunctionDefinition,
  ChatCompletionsOptionsFunctionCall,
  FunctionCallPreset,
  FunctionName,
  AzureChatExtensionConfiguration,
  AzureChatExtensionConfigurationUnion,
  AzureChatExtensionType,
  AzureSearchChatExtensionConfiguration,
  AzureSearchChatExtensionParameters,
  OnYourDataAuthenticationOptions,
  OnYourDataAuthenticationOptionsUnion,
  OnYourDataAuthenticationType,
  OnYourDataApiKeyAuthenticationOptions,
  OnYourDataConnectionStringAuthenticationOptions,
  OnYourDataKeyAndKeyIdAuthenticationOptions,
  OnYourDataEncodedApiKeyAuthenticationOptions,
  OnYourDataAccessTokenAuthenticationOptions,
  OnYourDataSystemAssignedManagedIdentityAuthenticationOptions,
  OnYourDataUserAssignedManagedIdentityAuthenticationOptions,
  OnYourDataContextProperty,
  AzureSearchIndexFieldMappingOptions,
  AzureSearchQueryType,
  OnYourDataVectorizationSource,
  OnYourDataVectorizationSourceUnion,
  OnYourDataVectorizationSourceType,
  OnYourDataEndpointVectorizationSource,
  OnYourDataVectorSearchAuthenticationOptions,
  OnYourDataVectorSearchAuthenticationOptionsUnion,
  OnYourDataVectorSearchAuthenticationType,
  OnYourDataVectorSearchApiKeyAuthenticationOptions,
  OnYourDataVectorSearchAccessTokenAuthenticationOptions,
  OnYourDataDeploymentNameVectorizationSource,
  OnYourDataModelIdVectorizationSource,
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
  AzureChatEnhancementConfiguration,
  AzureChatGroundingEnhancementConfiguration,
  AzureChatOCREnhancementConfiguration,
  ChatCompletionsResponseFormat,
  ChatCompletionsResponseFormatUnion,
  ChatCompletionsTextResponseFormat,
  ChatCompletionsJsonResponseFormat,
  ChatCompletionsToolDefinition,
  ChatCompletionsToolDefinitionUnion,
  ChatCompletionsFunctionToolDefinition,
  ChatCompletionsOptionsToolChoice,
  ChatCompletionsToolSelectionPreset,
  ChatCompletionsNamedToolSelection,
  ChatCompletionsNamedToolSelectionUnion,
  ChatCompletionsNamedFunctionToolSelection,
  ChatCompletionsFunctionToolSelection,
  ChatCompletions,
  ChatChoice,
  ChatResponseMessage,
  AzureChatExtensionsMessageContext,
  AzureChatExtensionDataSourceResponseCitation,
  AzureChatExtensionRetrievedDocument,
  AzureChatExtensionRetrieveDocumentFilterReason,
  ChatChoiceLogProbabilityInfo,
  ChatTokenLogProbabilityResult,
  ChatTokenLogProbabilityInfo,
  ChatFinishDetails,
  ChatFinishDetailsUnion,
  StopFinishDetails,
  MaxTokensFinishDetails,
  AzureChatEnhancements,
  AzureGroundingEnhancement,
  AzureGroundingEnhancementLine,
  AzureGroundingEnhancementLineSpan,
  AzureGroundingEnhancementCoordinatePoint,
  ImageGenerationOptions,
  ImageSize,
  ImageGenerationResponseFormat,
  ImageGenerationQuality,
  ImageGenerationStyle,
  ImageGenerations,
  ImageGenerationData,
  ImageGenerationContentFilterResults,
  ImageGenerationPromptFilterResults,
  SpeechGenerationOptions,
  SpeechVoice,
  SpeechGenerationResponseFormat,
  EmbeddingsOptions,
  EmbeddingEncodingFormat,
  Embeddings,
  EmbeddingItem,
  EmbeddingsUsage,
  ServiceApiVersions,
  ErrorResponse,
} from "./models.js";
export {
  GetAudioTranscriptionAsPlainTextOptionalParams,
  GetAudioTranscriptionAsResponseObjectOptionalParams,
  GetAudioTranslationAsPlainTextOptionalParams,
  GetAudioTranslationAsResponseObjectOptionalParams,
  GetCompletionsOptionalParams,
  GetChatCompletionsOptionalParams,
  GetImageGenerationsOptionalParams,
  GenerateSpeechFromTextOptionalParams,
  GetEmbeddingsOptionalParams,
} from "./options.js";
