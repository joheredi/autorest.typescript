import { Project } from "ts-morph";
const serializeRecordFunction = `
export function serializeRecord<T extends string | number | boolean | Date | null, R>(item: Record<string, T>): Record<string, R>;
export function serializeRecord<T, R>(item: Record<string, T>, serializer: (item: T) => R): Record<string, R>;
export function serializeRecord<T, R>(item: Record<string, T>, serializer?: (item: T) => R): Record<string, R> {
  return Object.keys(item).reduce((acc, key) => {

    if(serializer) {
      const value = item[key];
        if (value !== undefined) {
          acc[key] = serializer(value);
        }
    } else {
      if(!isSupportedRecordType(item[key])) {
        console.warn(\`Don't know how to serialize \${item[key]}\`)
      }
      acc[key] = item[key] as any
    }
    return acc;
  }, {} as Record<string, R>)
}
`;
const isRecordElementSupportedFunction = `
function isSupportedRecordType(t: any) {
  return ["number", "string", "boolean", "null"].includes(typeof t) || t instanceof Date;
}
`;

// const serializeArrayFunction = `export function serializeArray<T extends string | number | boolean | Date | null, R>(array: T[]): R[];
// export function serializeArray<T, R>(array: T[], serializer: (item: T) => R): R[];
// export function serializeArray<T, R>(array: T[], serializer?: (item: T) => R): R[] {
//   return array.map(item => {
//     if (serializer) {
//       return serializer(item);
//     } else {
//       if (!isSupportedArrayType(item)) {
//         console.warn(\`Don't know how to serialize \${item}\`);
//       }
//       return item as any;
//     }
//   });
// }`;

// const isSupportedArrayType = `function isSupportedArrayType(t: any): boolean {
//   return (
//     ["number", "string", "boolean"].includes(typeof t) ||
//     t === null ||
//     t instanceof Date
//   );
// }`;

export function emitSerializerHelpersFile(
  project: Project,
  srcPath: string = "src"
) {
  const sourceFile = project.createSourceFile(
    `${srcPath}/helpers/serializerHelpers.ts`,
    "",
    {
      overwrite: true
    }
  );

  sourceFile.addStatements([
    serializeRecordFunction,
    isRecordElementSupportedFunction
  ]);
}
