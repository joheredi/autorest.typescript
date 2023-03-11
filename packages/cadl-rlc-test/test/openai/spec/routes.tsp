import "@azure-tools/typespec-azure-core";
import "@typespec/rest";
import "@azure-tools/typespec-client-generator-core";

import "./models/completions.create.tsp";
import "./models/embeddings.create.tsp";

using TypeSpec.Rest;
using TypeSpec.Http;
using Azure.Core;
using Azure.ClientGenerator;

namespace Azure.OpenAI;

@doc("Return the embeddings for a given prompt.")
@TypeSpec.Rest.actionSeparator("/")
@action("embeddings")
@Azure.ClientGenerator.Core.convenientAPI(true)
op getEmbeddings is Azure.Core.ResourceAction<Deployment, Embeddings.EmbeddingsOptions, Embeddings.Embeddings>;


@doc("Return the completions for a given prompt.")
@TypeSpec.Rest.actionSeparator("/")
@action("completions")
@Azure.ClientGenerator.Core.convenientAPI(true)
op getCompletions is Azure.Core.ResourceAction<Deployment, Completions.CompletionsOptions, Completions.Completions>;