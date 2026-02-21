# Skill: Alloy XML Serializer Component Pattern

## When to Use
When converting ts-morph function builders that produce XML serializer/deserializer `FunctionDeclarationStructure` objects into Alloy JSX components.

## Pattern

### 1. Parameters use `ParameterDescriptor[]`
```tsx
<ts.FunctionDeclaration
  parameters={[{ name: "item", type: refkey(type) }]}
  returnType="string"
>
```
NOT `parameters={{ item: refkey(type) }}`.

### 2. Static helper refs via typed accessor
```tsx
import { xmlHelperRefkey } from "./StaticHelpers.js";
const serializeToXmlRef = xmlHelperRefkey("serializeToXml");
```

### 3. External deps via package libs
```tsx
const uint8Ref = isAzure
  ? azureCoreUtilLib.uint8ArrayToString
  : httpRuntimeLib.uint8ArrayToString;
```

### 4. Nested serializer references
Use `refkey(type, "xmlObjectSerializer")` interpolated in `code` templates. Alloy auto-resolves.

### 5. File grouping
XML serializers emit into the same `models/models.ts` files as the model declarations, using `getModelNamespaces()` for namespace grouping.

### 6. Guard functions
Extract `shouldGenerateSerializer()` / `shouldGenerateDeserializer()` with usage flag checks, error type filtering, and diagnostic reporting.
