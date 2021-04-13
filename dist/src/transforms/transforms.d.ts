import { ClientDetails } from "../models/clientDetails";
import { UnionDetails } from "../models/unionDetails";
import { CodeModel, ChoiceSchema, SealedChoiceSchema } from "@azure-tools/codemodel";
import { Host } from "@autorest/extension-base";
export declare function transformChoices(codeModel: CodeModel): Promise<UnionDetails[]>;
export declare function transformChoice(choice: ChoiceSchema | SealedChoiceSchema): UnionDetails;
export declare function transformCodeModel(codeModel: CodeModel, host: Host): Promise<ClientDetails>;
//# sourceMappingURL=transforms.d.ts.map