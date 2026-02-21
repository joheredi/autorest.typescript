# Skill: Alloy JSON Serializer Components

## Pattern

Convert ts-morph `FunctionDeclarationStructure`-returning builder functions into Alloy JSX `<ts.FunctionDeclaration>` components.

### Key Conversions

| Old Pattern | Alloy Pattern |
|---|---|
| `resolveReference(refkey(type, "serializer"))` | `refkey(type, "serializer")` in `code` template |
| `resolveReference(refkey(type))` | `refkey(type)` for type param |
| `FunctionDeclarationStructure` return | `<ts.FunctionDeclaration>` JSX |
| `addDeclaration(sf, fn, refkey)` | `<ts.FunctionDeclaration refkey={...}>` (auto-registration) |
| `useDependencies().X` | `httpRuntimeLib.X` from ExternalPackages.tsx |
| `useContext("sdkTypes")` | `useSdkTypes()` from SdkContextProvider |

### Component Structure

```tsx
function SerializerFn(props: { context: SdkContext; type: SdkModelType }): Children {
  if (!shouldGenerate(context, type)) return null;
  const functionName = `${normalizeModelName(context, type, NameType.Operation)}Serializer`;
  return (
    <ts.FunctionDeclaration
      export
      name={functionName}
      refkey={refkey(type, "serializer")}
      parameters={[{ name: "item", type: refkey(type) }]}
      returnType="any"
    >
      {code`return { ...body };`}
    </ts.FunctionDeclaration>
  );
}
```

### File Grouping

Serializers render into the same `models/models.ts` files as Models.tsx. Multiple `<ts.SourceFile>` elements with the same path get merged by Alloy.

### Reference: XmlSerializers.tsx

Kane's `XmlSerializers.tsx` is the authoritative pattern reference. Follow its structure for imports, guards, and component organization.
