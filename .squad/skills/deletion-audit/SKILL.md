# Skill: Safe File Deletion Audit for ts-morph → Alloy Migration

## When to Use
Before deleting any file during the Alloy migration, run this audit pattern to verify the file is truly orphaned.

## Audit Steps

### 1. Production imports
```bash
grep -rn "from.*/<filename>" src/ --include='*.ts' --include='*.tsx'
```

### 2. Test imports
```bash
grep -rn "<filename>" test/ test-next/ --include='*.ts' --include='*.tsx'
```

### 3. Framework/config references
```bash
grep -rn "<filename>" *.json tsconfig*.json
```

### 4. Export-level check
A file may be imported but only some exports are used. Check each export:
```bash
grep -n "^export " src/modular/<filename>.ts
# Then for each export:
grep -rn "<exportName>" src/ test/ --include='*.ts' --include='*.tsx'
```

## Key Gotcha: Test Infrastructure
`test/util/emitUtil.ts` imports many "orphaned" build files to recreate a mini ts-morph pipeline for unit tests. Files with zero production imports may still have test imports. Always check `test/` directory.

## Key Gotcha: Transitive Dependencies
Even if a file isn't directly imported, it may export utility functions used by files that ARE imported. Example: `emitModels.ts` exports `normalizeModelName` used by `Serializers.tsx`.

## Safe Deletion Criteria
A file is safe to delete ONLY if:
1. Zero production imports (`src/`)
2. Zero test imports (`test/`, `test-next/`)
3. Zero config references
4. No dynamic imports (`import()` expressions)
