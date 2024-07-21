import { shouldEmitInline } from "../../../src/next/utils/type-utils.js";
import { describe, it, expect } from "vitest";

describe("shouldEmitInline", () => {
  it("should return true for anonymous types by default", () => {
    expect(shouldEmitInline({ isGeneratedName: true })).toBe(true);
  });

  it("should return false for named types by default", () => {
    expect(shouldEmitInline({ isGeneratedName: false })).toBe(false);
  });

  it("should return true when emitInline is set to true", () => {
    expect(
      shouldEmitInline({ isGeneratedName: false }, { emitInline: true })
    ).toBe(true);

    expect(
      shouldEmitInline({ isGeneratedName: true }, { emitInline: true })
    ).toBe(true);
  });

  it("should return false when emitInline is set to false", () => {
    expect(
      shouldEmitInline({ isGeneratedName: false }, { emitInline: false })
    ).toBe(false);

    expect(
      shouldEmitInline({ isGeneratedName: true }, { emitInline: false })
    ).toBe(false);
  });
});
