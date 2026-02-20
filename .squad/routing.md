# Routing Rules

## Domain Routing

| Domain | Primary | Backup |
|--------|---------|--------|
| Architecture, migration strategy, code review | Ripley | — |
| JSON serializers, deserializers, buildSerializerFunction, buildDeserializerFunction | Dallas | Ripley |
| XML serializers, deserializers, buildXmlSerializerFunction | Kane | Dallas |
| Operation helpers, operationHelpers.ts, buildOperations.ts, emitModelsOptions.ts | Lambert | Ripley |
| Tests, validation, cleanup, deletion of old files | Parker | Ripley |
| Static helper refkeys, ExternalPackages, framework wiring | Ripley | Lambert |
| Alloy JSX components, code templates | Dallas or Kane (by format) | Lambert |

## File Routing

| File/Pattern | Agent |
|-------------|-------|
| `buildSerializerFunction.ts` | Dallas |
| `buildDeserializerFunction.ts` | Dallas |
| `buildXmlSerializerFunction.ts` | Kane |
| `operationHelpers.ts` | Lambert |
| `buildOperations.ts` | Lambert |
| `emitModelsOptions.ts` | Lambert |
| `emitModels.ts` | Parker (deletion) / Dallas (serializer extraction) |
| `alloy-emitter.tsx` | Ripley |
| `components/Serializers.tsx` | Dallas |
| `components/XmlSerializers.tsx` | Kane |
| `components/Operations.tsx` | Lambert |
| `src/framework/*` | Parker (deletion phase) |
| `test/**` | Parker |

## Escalation

Ambiguous → Ripley decides routing.
Multi-domain → fan out to relevant agents in parallel.
