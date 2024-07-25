export interface Dependency {
  kind: "dependency";
  key: string;
  reference: {
    name: string;
    module: string;
  };
}

export function isDependency(refkey: unknown): refkey is Dependency {
  return (
    typeof refkey === "object" &&
    refkey !== null &&
    "kind" in refkey &&
    refkey.kind === "dependency"
  );
}
