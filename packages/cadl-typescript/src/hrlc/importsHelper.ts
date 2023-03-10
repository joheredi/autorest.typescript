export function getModuleFullName(
  name: string,
  isRelative: boolean | undefined,
  scope: "client" | "module"
) {
  if (!isRelative) {
    return name;
  }

  if (scope === "client") {
    return `./api/${name}`;
  } else if (scope === "module") {
    return `./${name}`;
  }

  throw new Error(`Unknown module scope ${scope}`);
}
