"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const nameUtils_1 = require("../utils/nameUtils");
const codemodel_1 = require("@azure-tools/codemodel");
const parameterUtils_1 = require("./utils/parameterUtils");
function generateClientContext(clientDetails, packageDetails, project, hideClients) {
    const importedModels = new Set();
    const clientParams = clientDetails.parameters.filter(param => param.implementationLocation === codemodel_1.ImplementationLocation.Client);
    const hasLRO = clientDetails.operationGroups.some(og => og.operations.some(o => o.isLRO));
    const clientContextClassName = `${clientDetails.className}Context`;
    const clientContextFileName = nameUtils_1.normalizeName(clientContextClassName, nameUtils_1.NameType.File);
    const sourceFile = project.createSourceFile(`${clientDetails.srcPath}/${clientContextFileName}.ts`, undefined, {
        overwrite: true
    });
    writePackageInfo(sourceFile, packageDetails);
    const contextClass = buildClass(sourceFile, clientContextClassName);
    if (hideClients) {
        contextClass.addJsDoc({
            tags: [{
                    tagName: "hidden"
                }],
        });
    }
    writeClassProperties(contextClass, clientParams, importedModels);
    const classConstructor = buildConstructor(contextClass, {
        clientContextClassName,
        clientClassName: clientDetails.className,
        clientParams,
        importedModels
    });
    writeConstructorBody(classConstructor, {
        clientParams,
        clientDetails
    }, hasLRO);
    writeImports(sourceFile, hasLRO, importedModels);
}
exports.generateClientContext = generateClientContext;
function writeImports(sourceFile, hasLRO, importedModels) {
    sourceFile.addImportDeclaration({
        namespaceImport: "coreHttp",
        moduleSpecifier: "@azure/core-http"
    });
    if (importedModels.size) {
        sourceFile.addImportDeclaration({
            namedImports: [...importedModels],
            moduleSpecifier: "./models"
        });
    }
    if (hasLRO) {
        sourceFile.addImportDeclaration({
            namedImports: ["lroPolicy"],
            moduleSpecifier: "./lro"
        });
    }
}
function writePackageInfo(sourceFile, packageDetails) {
    sourceFile.addStatements([
        `\n\n`,
        `const packageName = "${packageDetails.name || ""}";`,
        `const packageVersion = "${packageDetails.version || ""}";`
    ]);
}
function writeClassProperties(contextClass, clientParams, importedModels) {
    const params = clientParams.filter(p => !p.isSynthetic);
    params.forEach(({ typeDetails }) => typeDetails.usedModels.forEach(model => importedModels.add(model)));
    contextClass.addProperties(params.map(param => {
        return {
            name: param.name,
            type: param.typeDetails.typeName,
            hasQuestionToken: !param.required
        };
    }));
}
function writeConstructorBody(classConstructor, { clientParams, clientDetails }, hasLRO) {
    const requiredParams = getRequiredParameters(clientParams);
    const addBlankLine = true;
    const requiredParameters = getRequiredParamAssignments(requiredParams);
    const constantParameters = getConstantClientParamAssignments(clientParams);
    classConstructor.addStatements([
        writeStatements(getRequiredParamChecks(requiredParams), addBlankLine),
        writeStatement(writeDefaultOptions(clientParams.some(p => p.name === "credentials"), hasLRO, clientDetails)),
        writeStatement(getEndpointStatement(clientDetails.endpoint), addBlankLine),
        requiredParameters.length ? "// Parameter assignments" : "",
        writeStatements(getRequiredParamAssignments(requiredParams), addBlankLine),
        constantParameters.length
            ? "// Assigning values to Constant parameters"
            : "",
        writeStatements(constantParameters, addBlankLine)
    ]);
}
const writeStatement = (content, shouldAddBlankLine = false) => (writer) => {
    if (content) {
        writer.writeLine(content);
        shouldAddBlankLine && writer.blankLine();
    }
};
const writeStatements = (lines, shouldAddBlankLine = false) => (writer) => {
    lines.forEach(line => writer.writeLine(line));
    shouldAddBlankLine && writer.blankLine();
};
function getCredentialScopesValue(credentialScopes) {
    if (Array.isArray(credentialScopes)) {
        return `[${credentialScopes.map(scope => `"${scope}"`).join()}]`;
    }
    else if (typeof credentialScopes === "string") {
        return `"${credentialScopes}"`;
    }
    return credentialScopes;
}
function writeDefaultOptions(hasCredentials, hasLRO, clientDetails) {
    const credentialScopes = getCredentialScopesValue(clientDetails.options.credentialScopes);
    const addScopes = credentialScopes
        ? `if(!options.credentialScopes) {
    options.credentialScopes = ${credentialScopes}
  }`
        : "";
    const addLROPolicy = hasLRO
        ? `
    // Building the request policy fatories based on the passed factories and the
    // any required factories needed by the client.
    if (Array.isArray(options.requestPolicyFactories)) {
      // When an array of factories is passed in, we'll just add the required factories,
      // in this case lroPolicy(). It is important to note that passing an array of factories
      // to a new client, bypasses core-http default factories. Just the pipelines provided will be run.
      options.requestPolicyFactories = [lroPolicy(), ...options.requestPolicyFactories]
    } else if (options.requestPolicyFactories) {
      // When we were passed a requestPolicyFactories as a function, we'll create a new one that adds the factories provided
      // in the options plus the required policies. When using this path, the pipelines passed to the client will be added to the
      // default policies added by core-http
      const optionsPolicies = options.requestPolicyFactories([lroPolicy()]) || [
        lroPolicy()
      ];
      options.requestPolicyFactories = defaultFactories => [
        ...optionsPolicies,
        ...defaultFactories
      ];
     
    } else {
      // In case no request policy factories were provided, we'll just need to create a function that will add 
      // the lroPolicy to the default pipelines added by core-http
      options.requestPolicyFactories = (defaultFactories) => ([lroPolicy(), ...defaultFactories])
    }`
        : "";
    return `// Initializing default values for options
  if (!options) {
     options = {};
   }

  if (!options.userAgent) {
     const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
     options.userAgent = \`\${packageName}/\${packageVersion} \${defaultUserAgent}\`;
   }

   ${addScopes}

  ${addLROPolicy}

  super(${hasCredentials ? "credentials" : `undefined`}, options);
  
  this.requestContentType = "application/json; charset=utf-8";
  
  `;
}
function buildClass(sourceFile, clientContextClassName) {
    return sourceFile.addClass({
        name: clientContextClassName,
        extends: "coreHttp.ServiceClient",
        isExported: true
    });
}
function buildConstructor(contextClass, { clientContextClassName, clientParams, clientClassName, importedModels }) {
    const requiredParams = getRequiredParameters(clientParams);
    const hasClientOptionalParams = clientParams.some(p => !p.required);
    const docs = [
        `Initializes a new instance of the ${clientContextClassName} class.`,
        ...parameterUtils_1.formatJsDocParam(requiredParams),
        `@param options The parameter options`
    ]
        .filter(d => !!d)
        .join("\n");
    let clientOptionsParameterType = "coreHttp.ServiceClientOptions";
    if (hasClientOptionalParams) {
        const typeName = `${clientClassName}OptionalParams`;
        importedModels.add(typeName);
        clientOptionsParameterType = typeName;
    }
    requiredParams.forEach(({ typeDetails }) => typeDetails.usedModels.forEach(model => importedModels.add(model)));
    return contextClass.addConstructor({
        docs: [docs],
        parameters: [
            ...requiredParams.map(p => ({
                name: p.name,
                type: p.typeDetails.typeName
            })),
            {
                name: "options",
                hasQuestionToken: true,
                type: clientOptionsParameterType
            }
        ]
    });
}
function getRequiredParameters(parameters) {
    /**
     * Getting parameters that are marked as required, and also don't have a defaultValue.
     * Constants are also exluded since they have defined value
     */
    return parameters.filter(p => p.required && p.schemaType !== codemodel_1.SchemaType.Constant && !p.defaultValue);
}
function getEndpointStatement({ endpoint }) {
    return `this.baseUri = options.endpoint ${endpoint ? ` || "${endpoint}"` : ""};`;
}
function getConstantClientParamAssignments(clientParameters) {
    return clientParameters
        .filter(p => !!p.defaultValue || p.schemaType === codemodel_1.SchemaType.Constant)
        .map(({ name, defaultValue }) => `this.${name} = options.${name} ||  ${defaultValue}`);
}
function getRequiredParamChecks(requiredParameters) {
    return requiredParameters.map(({ name }) => `if(${name} === undefined) {
    throw new Error("'${name}' cannot be null");
  }`);
}
function getRequiredParamAssignments(requiredParameters) {
    const disallowedClientParameters = ["credentials"];
    return requiredParameters
        .filter(({ name }) => !disallowedClientParameters.includes(name))
        .map(({ name }) => `this.${name} = ${name};`);
}
//# sourceMappingURL=clientContextFileGenerator.js.map