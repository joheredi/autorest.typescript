export interface RLCModel {
  libraryName: string;
  srcPath: string;
  paths: Paths;
  operationGroups: OperationGroup[];
  shortcuts: OperationShortcuts;
}

export interface OperationShortcuts {
  groups: OperationShortcutGroup[];
}

export interface Operation {
  docs?: string;
  name: string;
  path: string;
  verb: string;
  parameters: Parameter[];
  returnType: string;
}

export interface Parameter {
  docs?: string;
  name: string;
  type: TsType;
  location: ParameterLocation;
}

export type ParameterLocation =
  | "path"
  | "query"
  | "body"
  | "header"
  | "url"
  | "cookie"
  | "none"
  | "virtual";

export type TsType = PrimitiveType | ImportedType | ArrayType | RecordType;

export interface PrimitiveType {
  kind: "primitive";
  name:
    | "number"
    | "string"
    | "boolean"
    | "object"
    | "Date"
    | "undefined"
    | "null"
    | "unknown"
    | "Uint8Array"
    | "any";
}

export interface ImportedType {
  kind: "imported";
  name: string;
}

export interface ArrayType {
  kind: "array";
  elementType: TsType;
}

export interface RecordType {
  kind: "record";
  valueType: TsType;
}

export interface OperationGroup {
  description: string;
  name: string;
  operations: Operation[];
}

export interface OperationShortcutGroup {
  name: string;
  type: string;
}

export type Methods = {
  [key: string]: [OperationMethod];
};

export interface ResponseTypes {
  success: string[];
  error: string[];
}

export interface OperationMethod {
  optionsName: string;
  description: string;
  hasOptionalOptions: boolean;
  returnType: string;
  successStatus: string[];
  responseTypes: ResponseTypes;
}

export interface PathMetadata {
  name: string;
  pathParameters: PathParameter[];
  methods: Methods;
  annotations?: OperationAnnotations;
}

export type Paths = Record<string, PathMetadata>;

export type PathParameter = {
  name: string;
  type: string;
  description?: string;
};

export interface OperationAnnotations {
  isLongRunning?: boolean;
  isPageable?: boolean;
}
