import { CadlEnum } from "../interfaces";

export function generateEnums(cadlEnum: CadlEnum) {
  const definitions: string[] = [];
  const enumDefinition = `
    enum ${cadlEnum.name}${cadlEnum.isExtensible ? "KnownValues" : ""} {
        ${cadlEnum.members
          .map((m) => {
            return `"${m.name}"` !== m.value
              ? `${m.name}: ${m.value}`
              : m.value;
          })
          .join(", ")}
    }`;

  definitions.push(enumDefinition);

  if (cadlEnum.isExtensible) {
    const knownValues = `
    @knownValues(${cadlEnum.name}KnownValues)
    model ${cadlEnum.name} is string {}`;

    definitions.push(knownValues);
  }

  return definitions;
}
