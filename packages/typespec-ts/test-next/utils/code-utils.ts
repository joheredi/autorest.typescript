import { format } from "prettier";
import { expect } from "vitest";

export async function expectEqualCode(actual: string, expected: string) {
  const formatedActual = await format(actual, { parser: "typescript" });
  const formatedExpected = await format(expected, { parser: "typescript" });

  expect(formatedActual).toBe(formatedExpected);
}
