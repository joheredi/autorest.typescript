declare module namespace {
  export interface SubnamespaceToClients {}

  export interface Policy {
    type: string;
    key: string;
  }

  export interface ValueType {
    type: string;
  }

  export interface XmlMetadata {}

  export interface Type {
    type: string;
    policy: Policy;
    apiVersions: any[];
    clientDefaultValue?: any;
    value: string;
    valueType: ValueType;
    xmlMetadata: XmlMetadata;
  }

  export interface Parameter {
    optional: boolean;
    description: string;
    clientName: string;
    inOverload: boolean;
    restApiName: string;
    location: string;
    type: Type;
    implementation: string;
    skipUrlEncoding: boolean;
    clientDefaultValue: string;
    in_docstring?: boolean;
  }

  export interface ValueType2 {
    type: string;
  }

  export interface XmlMetadata2 {}

  export interface Type2 {
    type: string;
    apiVersions: any[];
    clientDefaultValue?: any;
    value: string;
    valueType: ValueType2;
    xmlMetadata: XmlMetadata2;
  }

  export interface Parameter2 {
    optional: boolean;
    description: string;
    clientName: string;
    inOverload: boolean;
    restApiName: string;
    location: string;
    type: Type2;
    implementation: string;
    skipUrlEncoding: boolean;
    clientDefaultValue: string;
    in_docstring?: boolean;
    checkClientInput?: boolean;
    delimiter?: any;
    explode?: boolean;
    groupedBy?: any;
    inDocstring?: boolean;
    inOverriden?: boolean;
  }

  export interface DiscriminatedSubtypes {}

  export interface DiscriminatedSubtypes2 {}

  export interface ElementType2 {
    type: string;
  }

  export interface Type5 {
    type: string;
    format: string;
    elementType: ElementType2;
  }

  export interface Property2 {
    clientName: string;
    restApiName: string;
    type: Type5;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes2;
    properties: Property2[];
    snakeCaseName: string;
    base: string;
  }

  export interface ValueType3 {
    type: string;
  }

  export interface Value {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes3 {}

  export interface ValueType4 {
    type: string;
  }

  export interface Value2 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes4 {}

  export interface ElementType3 {
    type: string;
  }

  export interface Type7 {
    type: string;
    elementType: ElementType3;
  }

  export interface Property4 {
    clientName: string;
    restApiName: string;
    type: Type7;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes5 {}

  export interface Type8 {
    type: string;
    format: string;
  }

  export interface Property5 {
    clientName: string;
    restApiName: string;
    type: Type8;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType4 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes5;
    properties: Property5[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type6 {
    type: string;
    name: string;
    description: string;
    valueType: ValueType4;
    values: Value2[];
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes4;
    properties: Property4[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType4;
  }

  export interface Property3 {
    clientName: string;
    restApiName: string;
    type: Type6;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type4 {
    type: string;
    elementType: ElementType;
    name: string;
    description: string;
    valueType: ValueType3;
    values: Value[];
    format: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes3;
    properties: Property3[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property {
    clientName: string;
    restApiName: string;
    type: Type4;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type3 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes;
    properties: Property[];
    snakeCaseName: string;
    base: string;
  }

  export interface BodyParameter {
    contentTypes: string[];
    type: Type3;
    restApiName: string;
    location: string;
    optional: boolean;
    description: string;
    clientName: string;
    inOverload: boolean;
    defaultContentType: string;
  }

  export interface Type9 {
    type: string;
  }

  export interface Header {
    type: Type9;
    restApiName: string;
  }

  export interface DiscriminatedSubtypes6 {}

  export interface DiscriminatedSubtypes7 {}

  export interface DiscriminatedSubtypes8 {}

  export interface DiscriminatedSubtypes9 {}

  export interface DiscriminatedSubtypes10 {}

  export interface ElementType7 {
    type: string;
  }

  export interface Type15 {
    type: string;
    elementType: ElementType7;
  }

  export interface Property10 {
    clientName: string;
    restApiName: string;
    type: Type15;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type14 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes10;
    properties: Property10[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property9 {
    clientName: string;
    restApiName: string;
    type: Type14;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType6 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes9;
    properties: Property9[];
    snakeCaseName: string;
    base: string;
  }

  export interface ValueType5 {
    type: string;
  }

  export interface Value3 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes11 {}

  export interface ValueType6 {
    type: string;
  }

  export interface Value4 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes12 {}

  export interface ElementType8 {
    type: string;
  }

  export interface Type17 {
    type: string;
    elementType: ElementType8;
  }

  export interface Property12 {
    clientName: string;
    restApiName: string;
    type: Type17;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes13 {}

  export interface Type18 {
    type: string;
    format: string;
  }

  export interface Property13 {
    clientName: string;
    restApiName: string;
    type: Type18;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType9 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes13;
    properties: Property13[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type16 {
    type: string;
    name: string;
    description: string;
    valueType: ValueType6;
    values: Value4[];
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes12;
    properties: Property12[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType9;
  }

  export interface Property11 {
    clientName: string;
    restApiName: string;
    type: Type16;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type13 {
    type: string;
    elementType: ElementType6;
    name: string;
    description: string;
    valueType: ValueType5;
    values: Value3[];
    format: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes11;
    properties: Property11[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property8 {
    clientName: string;
    restApiName: string;
    type: Type13;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes14 {}

  export interface Type19 {
    type: string;
  }

  export interface Property14 {
    clientName: string;
    restApiName: string;
    type: Type19;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType10 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes14;
    properties: Property14[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type12 {
    type: string;
    format: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes8;
    properties: Property8[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType10;
  }

  export interface Property7 {
    clientName: string;
    restApiName: string;
    type: Type12;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType5 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes7;
    properties: Property7[];
    snakeCaseName: string;
    base: string;
  }

  export interface DiscriminatedSubtypes15 {}

  export interface ValueType7 {
    type: string;
  }

  export interface Value5 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes16 {}

  export interface Type21 {
    type: string;
    format: string;
  }

  export interface Property16 {
    clientName: string;
    restApiName: string;
    type: Type21;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType11 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes16;
    properties: Property16[];
    snakeCaseName: string;
    base: string;
  }

  export interface DiscriminatedSubtypes17 {}

  export interface ValueType8 {
    type: string;
  }

  export interface Value6 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes18 {}

  export interface ElementType12 {
    type: string;
  }

  export interface Type23 {
    type: string;
    elementType: ElementType12;
  }

  export interface Property18 {
    clientName: string;
    restApiName: string;
    type: Type23;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes19 {}

  export interface Type24 {
    type: string;
    format: string;
  }

  export interface Property19 {
    clientName: string;
    restApiName: string;
    type: Type24;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType13 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes19;
    properties: Property19[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type22 {
    type: string;
    format: string;
    name: string;
    description: string;
    valueType: ValueType8;
    values: Value6[];
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes18;
    properties: Property18[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType13;
  }

  export interface Property17 {
    clientName: string;
    restApiName: string;
    type: Type22;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type20 {
    type: string;
    name: string;
    description: string;
    valueType: ValueType7;
    values: Value5[];
    elementType: ElementType11;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes17;
    properties: Property17[];
    snakeCaseName: string;
    base: string;
    format: string;
  }

  export interface Property15 {
    clientName: string;
    restApiName: string;
    type: Type20;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type11 {
    type: string;
    elementType: ElementType5;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes15;
    properties: Property15[];
    snakeCaseName: string;
    base: string;
    format: string;
  }

  export interface Property6 {
    clientName: string;
    restApiName: string;
    type: Type11;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type10 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes6;
    properties: Property6[];
    snakeCaseName: string;
    base: string;
  }

  export interface Respons {
    headers: Header[];
    statusCodes: number[];
    discriminator: string;
    type: Type10;
  }

  export interface Type25 {
    type: string;
  }

  export interface Header2 {
    type: Type25;
    restApiName: string;
  }

  export interface DiscriminatedSubtypes20 {}

  export interface ValueType9 {
    type: string;
  }

  export interface Value7 {
    name: string;
    value: string;
    description: string;
  }

  export interface Type27 {
    type: string;
    name: string;
    description: string;
    valueType: ValueType9;
    values: Value7[];
  }

  export interface Property20 {
    clientName: string;
    restApiName: string;
    type: Type27;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type26 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes20;
    properties: Property20[];
    snakeCaseName: string;
    base: string;
  }

  export interface Exception {
    headers: Header2[];
    statusCodes: string[];
    discriminator: string;
    type: Type26;
  }

  export interface Operation {
    name: string;
    description: string;
    summary: string;
    url: string;
    method: string;
    parameters: Parameter2[];
    bodyParameter: BodyParameter;
    responses: Respons[];
    exceptions: Exception[];
    groupName: string;
    discriminator: string;
    isOverload: boolean;
    overloads: any[];
    apiVersions: any[];
    itemName: string;
    continuationTokenName: string;
  }

  export interface OperationGroup {
    className: string;
    propertyName: string;
    operations: Operation[];
  }

  export interface Client {
    name: string;
    description: string;
    parameters: Parameter[];
    operationGroups: OperationGroup[];
    url: string;
    apiVersions: any[];
  }

  export interface Policy2 {
    type: string;
    key: string;
  }

  export interface DiscriminatedSubtypes21 {}

  export interface DiscriminatedSubtypes22 {}

  export interface DiscriminatedSubtypes23 {}

  export interface DiscriminatedSubtypes24 {}

  export interface DiscriminatedSubtypes25 {}

  export interface ElementType16 {
    type: string;
  }

  export interface Type33 {
    type: string;
    elementType: ElementType16;
  }

  export interface Property25 {
    clientName: string;
    restApiName: string;
    type: Type33;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type32 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes25;
    properties: Property25[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property24 {
    clientName: string;
    restApiName: string;
    type: Type32;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType15 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes24;
    properties: Property24[];
    snakeCaseName: string;
    base: string;
  }

  export interface ValueType10 {
    type: string;
  }

  export interface Value8 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes26 {}

  export interface ValueType11 {
    type: string;
  }

  export interface Value9 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes27 {}

  export interface ElementType17 {
    type: string;
  }

  export interface Type35 {
    type: string;
    elementType: ElementType17;
  }

  export interface Property27 {
    clientName: string;
    restApiName: string;
    type: Type35;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes28 {}

  export interface Type36 {
    type: string;
    format: string;
  }

  export interface Property28 {
    clientName: string;
    restApiName: string;
    type: Type36;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType18 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes28;
    properties: Property28[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type34 {
    type: string;
    name: string;
    description: string;
    valueType: ValueType11;
    values: Value9[];
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes27;
    properties: Property27[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType18;
  }

  export interface Property26 {
    clientName: string;
    restApiName: string;
    type: Type34;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type31 {
    type: string;
    elementType: ElementType15;
    name: string;
    description: string;
    valueType: ValueType10;
    values: Value8[];
    format: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes26;
    properties: Property26[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property23 {
    clientName: string;
    restApiName: string;
    type: Type31;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes29 {}

  export interface Type37 {
    type: string;
  }

  export interface Property29 {
    clientName: string;
    restApiName: string;
    type: Type37;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType19 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes29;
    properties: Property29[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type30 {
    type: string;
    format: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes23;
    properties: Property23[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType19;
  }

  export interface Property22 {
    clientName: string;
    restApiName: string;
    type: Type30;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType14 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes22;
    properties: Property22[];
    snakeCaseName: string;
    base: string;
  }

  export interface ValueType12 {
    type: string;
  }

  export interface Value10 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes30 {}

  export interface ValueType13 {
    type: string;
  }

  export interface Value11 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes31 {}

  export interface DiscriminatedSubtypes32 {}

  export interface ElementType21 {
    type: string;
  }

  export interface Type40 {
    type: string;
    elementType: ElementType21;
  }

  export interface Property32 {
    clientName: string;
    restApiName: string;
    type: Type40;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type39 {
    type: string;
    format: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes32;
    properties: Property32[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property31 {
    clientName: string;
    restApiName: string;
    type: Type39;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType20 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes31;
    properties: Property31[];
    snakeCaseName: string;
    base: string;
  }

  export interface DiscriminatedSubtypes33 {}

  export interface ValueType14 {
    type: string;
  }

  export interface Value12 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes34 {}

  export interface ElementType22 {
    type: string;
  }

  export interface Type42 {
    type: string;
    elementType: ElementType22;
  }

  export interface Property34 {
    clientName: string;
    restApiName: string;
    type: Type42;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes35 {}

  export interface Type43 {
    type: string;
    format: string;
  }

  export interface Property35 {
    clientName: string;
    restApiName: string;
    type: Type43;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType23 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes35;
    properties: Property35[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type41 {
    type: string;
    format: string;
    name: string;
    description: string;
    valueType: ValueType14;
    values: Value12[];
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes34;
    properties: Property34[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType23;
  }

  export interface Property33 {
    clientName: string;
    restApiName: string;
    type: Type41;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type38 {
    type: string;
    name: string;
    description: string;
    valueType: ValueType13;
    values: Value11[];
    elementType: ElementType20;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes33;
    properties: Property33[];
    snakeCaseName: string;
    base: string;
    format: string;
  }

  export interface Property30 {
    clientName: string;
    restApiName: string;
    type: Type38;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type29 {
    type: string;
    elementType: ElementType14;
    name: string;
    description: string;
    valueType: ValueType12;
    values: Value10[];
    format: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes30;
    properties: Property30[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property21 {
    clientName: string;
    restApiName: string;
    type: Type29;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes36 {}

  export interface DiscriminatedSubtypes37 {}

  export interface DiscriminatedSubtypes38 {}

  export interface DiscriminatedSubtypes39 {}

  export interface ElementType26 {
    type: string;
  }

  export interface Type47 {
    type: string;
    elementType: ElementType26;
  }

  export interface Property39 {
    clientName: string;
    restApiName: string;
    type: Type47;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type46 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes39;
    properties: Property39[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property38 {
    clientName: string;
    restApiName: string;
    type: Type46;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType25 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes38;
    properties: Property38[];
    snakeCaseName: string;
    base: string;
  }

  export interface ValueType15 {
    type: string;
  }

  export interface Value13 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes40 {}

  export interface ValueType16 {
    type: string;
  }

  export interface Value14 {
    name: string;
    value: string;
    description: string;
  }

  export interface DiscriminatedSubtypes41 {}

  export interface ElementType27 {
    type: string;
  }

  export interface Type49 {
    type: string;
    elementType: ElementType27;
  }

  export interface Property41 {
    clientName: string;
    restApiName: string;
    type: Type49;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes42 {}

  export interface Type50 {
    type: string;
    format: string;
  }

  export interface Property42 {
    clientName: string;
    restApiName: string;
    type: Type50;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType28 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes42;
    properties: Property42[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type48 {
    type: string;
    name: string;
    description: string;
    valueType: ValueType16;
    values: Value14[];
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes41;
    properties: Property41[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType28;
  }

  export interface Property40 {
    clientName: string;
    restApiName: string;
    type: Type48;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface Type45 {
    type: string;
    elementType: ElementType25;
    name: string;
    description: string;
    valueType: ValueType15;
    values: Value13[];
    format: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes40;
    properties: Property40[];
    snakeCaseName: string;
    base: string;
  }

  export interface Property37 {
    clientName: string;
    restApiName: string;
    type: Type45;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface DiscriminatedSubtypes43 {}

  export interface Type51 {
    type: string;
  }

  export interface Property43 {
    clientName: string;
    restApiName: string;
    type: Type51;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType29 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes43;
    properties: Property43[];
    snakeCaseName: string;
    base: string;
  }

  export interface Type44 {
    type: string;
    format: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes37;
    properties: Property37[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType29;
  }

  export interface Property36 {
    clientName: string;
    restApiName: string;
    type: Type44;
    optional: boolean;
    description: string;
    readonly: boolean;
  }

  export interface ElementType24 {
    type: string;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes36;
    properties: Property36[];
    snakeCaseName: string;
    base: string;
  }

  export interface ValueType17 {
    type: string;
  }

  export interface Value15 {
    name: string;
    value: string;
    description: string;
  }

  export interface XmlMetadata3 {}

  export interface Type28 {
    type: string;
    policy: Policy2;
    name: string;
    description: string;
    parents: any[];
    discriminatedSubtypes: DiscriminatedSubtypes21;
    properties: Property21[];
    snakeCaseName: string;
    base: string;
    elementType: ElementType24;
    valueType: ValueType17;
    values: Value15[];
    format: string;
    apiVersions: any[];
    clientDefaultValue?: any;
    value: string;
    xmlMetadata: XmlMetadata3;
  }

  export interface RootObject {
    namespace: string;
    subnamespaceToClients: SubnamespaceToClients;
    clients: Client[];
    types: Type28[];
  }
}
