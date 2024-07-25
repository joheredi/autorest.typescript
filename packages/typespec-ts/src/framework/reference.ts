import { isDependency } from "./dependency.js";
import { useBinder } from "./hooks/binder.js";
import { refkey as getRefKey } from "./refkey.js";

export function resolveReference(_refkey: unknown): string {
  let refkey = _refkey;
  if (isDependency(_refkey)) {
    refkey = _refkey.key;
  }
  const binder = useBinder();
  const stringRefkey = typeof refkey === "string" ? refkey : getRefKey(refkey);

  return binder.resolveReference(stringRefkey);
}
