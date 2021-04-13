import { Project } from "ts-morph";
import { ClientDetails } from "../models/clientDetails";
import { OperationGroupDetails } from "../models/operationDetails";
export declare function generateClient(clientDetails: ClientDetails, project: Project, hideClients: boolean): void;
export declare function checkForNameCollisions(importedOperations: OperationGroupDetails[], inlineOperations: OperationGroupDetails[]): void;
//# sourceMappingURL=clientFileGenerator.d.ts.map