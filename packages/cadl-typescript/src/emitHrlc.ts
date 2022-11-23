import { buildClient, RLCOptions } from "@azure-tools/rlc-common";
import { Program } from "@cadl-lang/compiler";
import { emitContentByBuilder } from "./emitUtil.js";
import { transformRLCModel } from "./transform/transform.js";
export interface HrlcClient {
  name: string;
}

export interface HrlcParameter {
  definedIn: "method" | "client";
  name: string;
  serializedName: string;
  clientDefaultValue?: string;
  isOptional?: boolean;
  in: "path" | "query" | "header" | "body";
}

export async function emitHrlc(program: Program, options: RLCOptions) {
  const rlcModels = await transformRLCModel(program, options);
  await emitContentByBuilder(program, buildClient, rlcModels);
}
// async function emitClientContext(program: Program, project: Project) {
//   const clientContext = project.createSourceFile("clientContext.ts");
//   const clients = listClients(program);

//   for (const client of clients) {
//     clientContext.addFunction({
//       name: client.name,
//       statements: `return new ${client.name}Client(this);`
//     });
//   }
//   emitClientParams(program, clients[0]!);
//   await emitFile(
//     { content: clientContext.getText(), path: "hello.ts" },
//     program
//   );
// }

// async function emitClientParams(program: Program, _client: Client) {
//   const urlInfo = transformUrlInfo(program);
//   console.log(urlInfo);
// }
