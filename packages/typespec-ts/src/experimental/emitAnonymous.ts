import { SourceFile } from "ts-morph";
import { useContext } from "../contextManager.js";
import { emitDeclaration } from "./emitDeclaration.js";

export function emitAnonymous(sourceFile: SourceFile) {
  const { tcgcContext } = useContext("emitContext");
  const emitQueue = useContext("emitQueue");

  const anonymousModels = tcgcContext.experimental_sdkPackage.models.filter(
    (m) => m.isGeneratedName
  );

  for (const model of anonymousModels) {
    emitQueue.add(model);
  }

  completePendingDeclarations(sourceFile);
}

function completePendingDeclarations(sourceFile: SourceFile): void {
  const typeQueue = useContext("emitQueue");

  // Add all pending declarations to the module tree.
  while (!typeQueue.isEmpty()) {
    while (!typeQueue.isEmpty()) {
      const type = typeQueue.take()!;

      emitDeclaration(type, sourceFile);
    }
  }
}
