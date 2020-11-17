import {
  OperationDetails,
  OperationGroupDetails
} from "../../models/operationDetails";
import { ClientDetails } from "../../models/clientDetails";
import {
  ClassDeclaration,
  OptionalKind,
  ParameterDeclarationStructure,
  Scope,
  SourceFile
} from "ts-morph";
import { NameType, normalizeName } from "../../utils/nameUtils";
import { getOperationParameterSignatures } from "./parameterUtils";
import { generateOperationJSDoc } from "./docsUtils";
import { getResponseBodyType } from "./responseTypeUtils";

type MethodParameter = OptionalKind<
  ParameterDeclarationStructure & {
    description: string;
  }
>;

interface MethodDetails {
  name: string;
  parameters: MethodParameter[];
}

interface PagingMethodSettings {
  initialMethod: MethodDetails;
  nextMethod?: MethodDetails;
  publicMethod: MethodDetails;
  allMethod: MethodDetails;
  pageMethod: MethodDetails;
  bodyResponseType: string;
  nextLinkName?: string;
  itemName: string;
}

/**
 * Adds the required imports for paging operations
 * @param param0 clientDetails
 * @param sourceFile File to add imports to
 */
export function addPagingImports(
  { options, operationGroups }: ClientDetails,
  sourceFile: SourceFile
) {
  if (
    !options.disablePagingAsyncIterators &&
    operationGroups.some(og => hasAsyncIteratorOperations(og))
  ) {
    sourceFile.addImportDeclarations([
      {
        namedImports: ["PagedAsyncIterableIterator"],
        moduleSpecifier: "@azure/core-paging"
      }
    ]);
  }
}

export function hasAsyncIteratorOperations(
  operationGroupDetails: OperationGroupDetails
) {
  return operationGroupDetails.operations.some(o =>
    isSupportedWithAsyncIterators(o)
  );
}

function isSupportedWithAsyncIterators(operation: OperationDetails) {
  if (!operation.pagination?.supportsAsyncIterators) {
    return false;
  }

  return true;
}

export function preparePageableOperations(
  operationGroupDetails: OperationGroupDetails,
  clientDetails: ClientDetails
) {
  if (clientDetails.options.disablePagingAsyncIterators) {
    return;
  }

  operationGroupDetails.operations
    .filter(o => isSupportedWithAsyncIterators(o))
    .forEach(operation => {
      operation.scope = Scope.Private;
      operation.namePrefix = "_";
    });
}

export function writeAsyncIterators(
  operationGroupDetails: OperationGroupDetails,
  clientDetails: ClientDetails,
  operationGroupClass: ClassDeclaration,
  importedModels: Set<string>
) {
  if (clientDetails.options.disablePagingAsyncIterators) {
    return;
  }

  operationGroupDetails.operations
    .filter(
      o => isSupportedWithAsyncIterators(o) && !o.pagination?.isNextLinkMethod
    )
    .forEach(operation => {
      const baseName = normalizeName(operation.name, NameType.Operation);
      const nextOperationName = normalizeName(
        operation.pagination?.nextLinkOperationName || baseName,
        NameType.Operation
      );

      const nextOperation = operationGroupDetails.operations.find(
        o =>
          o.name.toLocaleLowerCase() ===
          operation.pagination?.nextLinkOperationName?.toLocaleLowerCase()
      );

      const bodyResponseType = getResponseBodyType(operation);
      const bodyResponseTypeName =
        bodyResponseType?.typeName.replace("[]", "") || "";

      if (!bodyResponseType) {
        throw new Error(`Pageable operation ${baseName} has no return values`);
      }

      bodyResponseType?.usedModels.forEach(m => importedModels.add(m));

      let nextMethodParameters: MethodParameter[] | null = null;

      if (nextOperation) {
        nextMethodParameters = getOperationParameterSignatures(
          nextOperation,
          clientDetails.parameters,
          importedModels,
          operationGroupClass
        ).baseMethodParameters.map(parameter => {
          if (parameter.name === "nextLink") {
            return { ...parameter, hasQuestionToken: true };
          }

          return parameter;
        });
      }

      const { baseMethodParameters } = getOperationParameterSignatures(
        operation,
        clientDetails.parameters,
        importedModels,
        operationGroupClass
      );

      const pagingMethodSettings: PagingMethodSettings = {
        initialMethod: {
          name: `${operation.namePrefix}${baseName}`,
          parameters: baseMethodParameters
        },
        nextMethod: nextMethodParameters
          ? {
              name: `${operation.namePrefix}${nextOperationName}`,
              parameters: nextMethodParameters
            }
          : undefined,
        publicMethod: { name: baseName, parameters: baseMethodParameters },
        allMethod: { name: `${baseName}All`, parameters: baseMethodParameters },
        pageMethod: {
          name: `${baseName}Page`,
          parameters: baseMethodParameters
        },
        bodyResponseType: bodyResponseTypeName,
        nextLinkName: operation.pagination?.nextLinkName || "nextLink",
        itemName: operation.pagination?.itemName || "value"
      };

      writePublicMethod(operation, operationGroupClass, pagingMethodSettings);
      writePageMethod(operation, operationGroupClass, pagingMethodSettings);
      writeAllMethod(operation, operationGroupClass, pagingMethodSettings);
    });
}

function writePublicMethod(
  operation: OperationDetails,
  operationGroupClass: ClassDeclaration,
  pagingMethodSettings: PagingMethodSettings
) {
  const returnType = `PagedAsyncIterableIterator<${pagingMethodSettings.bodyResponseType}, ${pagingMethodSettings.bodyResponseType}[]>`;

  const method = operationGroupClass.addMethod({
    name: pagingMethodSettings.publicMethod.name,
    parameters: pagingMethodSettings.publicMethod.parameters,
    scope: Scope.Public,
    returnType,
    docs: [
      generateOperationJSDoc(
        pagingMethodSettings.publicMethod.parameters,
        operation.description
      )
    ]
  });

  let parameters = pagingMethodSettings.publicMethod.parameters
    .map(p => p.name)
    .join(",");

  const pageMethodNameParams = pagingMethodSettings.pageMethod.parameters
    .map(p => p.name)
    .join(",");

  method.addStatements([
    `const iter = this.${pagingMethodSettings.allMethod.name}(${parameters});`,
    `return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings) => {
          return this.${pagingMethodSettings.pageMethod.name}(${pageMethodNameParams});
        }
      };`
  ]);
}

function writeAllMethod(
  operation: OperationDetails,
  operationGroupClass: ClassDeclaration,
  pagingMethodSettings: PagingMethodSettings
) {
  const returnType = `AsyncIterableIterator<${pagingMethodSettings.bodyResponseType}>`;

  const pageMethodParameters = pagingMethodSettings.pageMethod.parameters
    .map(p => p.name)
    .join(",");

  const method = operationGroupClass.addMethod({
    name: `*${pagingMethodSettings.allMethod.name}`,
    parameters: pagingMethodSettings.initialMethod.parameters,
    scope: Scope.Private,
    returnType,
    docs: [
      generateOperationJSDoc(
        pagingMethodSettings.initialMethod.parameters,
        operation.description
      )
    ],
    isAsync: true
  });

  method.addStatements([
    `for await (const page of this.${pagingMethodSettings.pageMethod.name}(${pageMethodParameters})) {
        yield *page
     }`
  ]);
}

function writePageMethod(
  operation: OperationDetails,
  operationGroupClass: ClassDeclaration,
  pagingMethodSettings: PagingMethodSettings
) {
  const returnType = `AsyncIterableIterator<${pagingMethodSettings.bodyResponseType}[]>`;
  const itemName = pagingMethodSettings.itemName;
  const nextLinkProperty = normalizeName(
    pagingMethodSettings.nextLinkName!,
    NameType.Property
  );
  const parameters = pagingMethodSettings.initialMethod.parameters
    .map(p => p.name)
    .join(",");

  const method = operationGroupClass.addMethod({
    name: `*${pagingMethodSettings.pageMethod.name}`,
    parameters: pagingMethodSettings.pageMethod.parameters,
    scope: Scope.Private,
    returnType,
    docs: [
      generateOperationJSDoc(
        pagingMethodSettings.initialMethod.parameters,
        operation.description
      )
    ],
    isAsync: true
  });

  let firstRequestStatements = [
    `let result = await this.${pagingMethodSettings.initialMethod.name}(${parameters});`,
    `yield result.${itemName} || [];`
  ];

  if (operation.isLRO) {
    firstRequestStatements = [
      `const poller = await this.${pagingMethodSettings.initialMethod.name}(${parameters});`,
      // TODO: Fix typing here, currently returning the original response type conflicts because the nextPage doesn't contain the LROSymbol. Maybe an union type is the correct type
      `let result: any = await poller.pollUntilDone();`,
      `yield result.${itemName} || [];`
    ];
  }

  method.addStatements(firstRequestStatements);

  if (pagingMethodSettings.nextMethod) {
    const nextParameters = pagingMethodSettings.nextMethod.parameters
      .map(p => (p.name === "nextLink" ? "continuationToken" : p.name))
      .join(",");

    method.addStatements([
      `let continuationToken = result.${nextLinkProperty}`
    ]);

    method.addStatements([
      `while (continuationToken) {
        result = await this.${pagingMethodSettings.nextMethod.name}(${nextParameters});
        continuationToken = result.${nextLinkProperty}
        yield result.${itemName} || [];
      }`
    ]);
  }
}
