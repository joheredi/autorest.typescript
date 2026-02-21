# Pattern: Migrating Shared Functions Between Alloy and ts-morph

## Problem

During the Alloy migration, some helper functions are called from **both** migrated code (Alloy JSX) and un-migrated code (ts-morph + binder). Removing `resolveReference()` from these breaks import tracking for the ts-morph side.

## Solution

**Keep `resolveReference()` in shared functions** until both consumers are migrated.

```ts
// SHARED between operations (Alloy) and serializers (ts-morph)
// Keep resolveReference() for serializer import tracking
function sharedHelper(ctx, type) {
  const dependencies = useDependencies();
  const name = resolveReference(dependencies.someSymbol); // KEEP
  return `doThing(${name})`;
}
```

For the Alloy side, handle imports explicitly in the JSX component:

```tsx
function collectFileImports(operations, dpgContext) {
  // Analyze operations to determine which symbols are used
  // Return explicit import declarations
}
```

## When to Remove

Once the other pipeline consumer (e.g., serializers) is also migrated to Alloy, remove `resolveReference()` from the shared function and replace with Alloy Refkeys in code templates.
