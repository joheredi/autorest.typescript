import { Project } from "ts-morph";
import { useContext } from "../contextManager.js";
const serializeRecordFunction = {
  symbol: "serializeRecord",
  content: `
export function serializeRecord<
  T extends string | number | boolean | Date | null,
  R
>(item: Record<string, T>): Record<string, R>;
export function serializeRecord<T, R>(
  item: Record<string, T>,
  serializer: (item: T) => R
): Record<string, R>;
export function serializeRecord<T, R>(
  item: Record<string, T>,
  serializer?: (item: T) => R
): Record<string, R> {
  return Object.keys(item).reduce(
    (acc, key) => {
      if (isSupportedRecordType(item[key])) {
        acc[key] = item[key] as any;
      } else if (serializer) {
        const value = item[key];
        if (value !== undefined) {
          acc[key] = serializer(value);
        }
      } else {
        console.warn(\`Don't know how to serialize \${item[key]}\`);
        acc[key] = item[key] as any;
      }
      return acc;
    },
    {} as Record<string, R>
  );
}`
};

const deserializeRecordFunction = {
  symbol: "deserializeRecord",
  content: `
 function _deserializeRecord<T, R>(
  item: Record<string, R>,
  deserializer: (item: R) => T
): Record<string, T> {
  return Object.keys(item).reduce(
    (acc, key) => {
      const value = item[key];
      if (isSupportedRecordType(value)) {
        acc[key] = value as any;
      } else if (deserializer) {
        if (value !== undefined) {
          acc[key] = deserializer(value);
        }
      } else {
        console.warn(\`Don't know how to deserialize \${item[key]}\`);
        acc[key] = value as any;
      }
      return acc;
    },
    {} as Record<string, T>
  );
}

export const deserializeRecord = withNullChecks(_deserializeRecord);
  `
};

const isRecordElementSupportedFunction = {
  symbol: "isSupportedRecordType",
  content: `
function isSupportedRecordType(t: any) {
  return ["number", "string", "boolean", "null"].includes(typeof t) || t instanceof Date;
}
`
};

const withNullChecks = {
  symbol: "withNullChecks",
  content: `
  type SafeReturn<I, R> = 
  I extends null 
  ? I extends undefined 
    ? R : R | null
  : I extends undefined
    ? I extends null
      ? R : R | undefined
    :R;
        



export function withNullChecks<I, R, A extends any[]>(
  fn: (input: NonNullable<I>, ...args: A) => R
): (input: I | null | undefined, ...args: A) => SafeReturn<I, R> {
  return function (input: I | null | undefined, ...args: A): SafeReturn<I, R> {
    if (input === null || input === undefined) {
      return null as SafeReturn<I, R>;
    }

    return fn(input as NonNullable<I>, ...args) as SafeReturn<I, R>;
  };
}
  `
};

const deserializePlainDate = {
  symbol: "deserializePlainDate",
  content: `
   function _deserializePlainDate(date: string): string {
    return date;
  }
    export const deserializePlainDate = withNullChecks(_deserializePlainDate)
  `
};

const deserializePlainTime = {
  symbol: "deserializePlainTime",
  content: `
   function _deserializePlainTime(time: string): string {
    return time;
  }
    export const deserializePlainTime = withNullChecks(_deserializePlainTime)
  `
};

const deserializeUtcDateTime = {
  symbol: "deserializeUtcDateTime",
  content: `
 function _deserializeUtcDateTime(datetime: string): Date {
  return new Date(datetime);
}
  export const deserializeUtcDateTime = withNullChecks(_deserializeUtcDateTime)
  `
};

const deserializeOffsetDateTime = {
  symbol: "deserializeLocalDateTime",
  content: `
  function _deserializeOffsetDateTime(datetime: string): string {
  return datetime;
}
  export const deserializeOffsetDateTime = withNullChecks(_deserializeOffsetDateTime)
  `
};

const deserializeDuration = {
  symbol: "deserializeLocalDateTime",
  content: `
 function _deserializeDuration(duration: string): string {
  return duration;
}
  export const deserializeDuration = withNullChecks(_deserializeDuration)
  `
};

const passthroughDeserializer = {
  symbol: "passthroughDeserializer",
  content: `
  function _passthroughDeserializer<T>(input: T): T {
    return input;
  }

  export const passthroughDeserializer = withNullChecks(_passthroughDeserializer);
  `
};

export function emitSerializerHelpersFile(
  project: Project,
  srcPath: string = "src"
) {
  const symbolMap = useContext("symbolMap");
  const sourceFile = project.createSourceFile(
    `${srcPath}/helpers/serializerHelpers.ts`,
    "",
    {
      overwrite: true
    }
  );

  if (!symbolMap.has(serializeRecordFunction.symbol)) {
    symbolMap.set(serializeRecordFunction.symbol, sourceFile);
  }

  if (!symbolMap.has(isRecordElementSupportedFunction.symbol)) {
    symbolMap.set(isRecordElementSupportedFunction.symbol, sourceFile);
  }

  if (!symbolMap.has(deserializeRecordFunction.symbol)) {
    symbolMap.set(deserializeRecordFunction.symbol, sourceFile);
  }

  if (!symbolMap.has(withNullChecks.symbol)) {
    symbolMap.set(withNullChecks.symbol, sourceFile);
  }

  if (!symbolMap.has(deserializePlainDate.symbol)) {
    symbolMap.set(deserializePlainDate.symbol, sourceFile);
  }

  if (!symbolMap.has(deserializePlainTime.symbol)) {
    symbolMap.set(deserializePlainTime.symbol, sourceFile);
  }

  if (!symbolMap.has(deserializeUtcDateTime.symbol)) {
    symbolMap.set(deserializeUtcDateTime.symbol, sourceFile);
  }

  if (!symbolMap.has(deserializeOffsetDateTime.symbol)) {
    symbolMap.set(deserializeOffsetDateTime.symbol, sourceFile);
  }

  if (!symbolMap.has(deserializeDuration.symbol)) {
    symbolMap.set(deserializeDuration.symbol, sourceFile);
  }

  if (!symbolMap.has(passthroughDeserializer.symbol)) {
    symbolMap.set(passthroughDeserializer.symbol, sourceFile);
  }

  sourceFile.addStatements([
    serializeRecordFunction.content,
    isRecordElementSupportedFunction.content,
    deserializeRecordFunction.content,
    withNullChecks.content,
    deserializePlainDate.content,
    deserializePlainTime.content,
    deserializeUtcDateTime.content,
    deserializeOffsetDateTime.content,
    deserializeDuration.content,
    passthroughDeserializer.content
  ]);
}
