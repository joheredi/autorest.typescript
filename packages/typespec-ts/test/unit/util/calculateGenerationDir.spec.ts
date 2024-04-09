import { calculateGenerationDir } from "../../../src/utils/calculateGenerationDir.js";
import fsextra from "fs-extra";
import {
  describe,
  it,
  afterEach,
  assert,
  vi,
  MockInstance,
  beforeEach
} from "vitest";

describe("calculateGenerationDir", () => {
  let pathExistsSpy: MockInstance;

  beforeEach(async function () {
    pathExistsSpy = vi.spyOn(fsextra, "pathExists");
  });

  afterEach(async function () {
    // Reset the modules that quibble has replaced
    vi.restoreAllMocks();
  });

  describe("modular", () => {
    it("should return correct generation dir when customization is present", async () => {
      pathExistsSpy.mockImplementation(async () => false);
      const cwd = process.cwd();
      const result = await calculateGenerationDir({ isModularLibrary: true });

      assert.strictEqual(result.rootDir, cwd);
      assert.strictEqual(result.metadataDir, cwd);
      assert.strictEqual(result.rlcSourcesDir, `${cwd}/src/rest`);
      assert.strictEqual(result.modularSourcesDir, `${cwd}/src`);
    });

    it("should return correct generation dir when customization is present", async () => {
      pathExistsSpy.mockImplementation(async () => true);
      const cwd = process.cwd();
      const result = await calculateGenerationDir({ isModularLibrary: true });

      assert.strictEqual(result.rootDir, cwd);
      assert.strictEqual(result.metadataDir, cwd);
      assert.strictEqual(
        result.rlcSourcesDir,
        `${cwd}/sources/generated/src/rest`
      );
      assert.strictEqual(
        result.modularSourcesDir,
        `${cwd}/sources/generated/src`
      );
    });

    it("should return correct dir structure when emitterOutputDir is provided ", async () => {
      pathExistsSpy.mockImplementation(async () => false);
      const emitterOutputDir = "/test";
      const result = await calculateGenerationDir(
        { isModularLibrary: true },
        emitterOutputDir
      );

      assert.strictEqual(result.rootDir, emitterOutputDir);
      assert.strictEqual(result.metadataDir, emitterOutputDir);
      assert.strictEqual(result.rlcSourcesDir, `${emitterOutputDir}/src/rest`);
      assert.strictEqual(result.modularSourcesDir, `${emitterOutputDir}/src`);
    });
  });

  describe("rlc", () => {
    it("should return correct generation dir when emitterOutputDir is not provided and customization structure is not present", async () => {
      pathExistsSpy.mockImplementation(async () => false);
      const cwd = process.cwd();
      const result = await calculateGenerationDir({ isModularLibrary: false });

      assert.strictEqual(result.rootDir, cwd);
      assert.strictEqual(result.metadataDir, cwd);
      assert.strictEqual(result.rlcSourcesDir, `${cwd}/src`);
      assert.strictEqual(result.modularSourcesDir, undefined);
    });

    it("should return correct generation dir when emitterOutputDir is provided and customization structure is present", async () => {
      pathExistsSpy.mockImplementation(async () => true);
      const cwd = process.cwd();
      const result = await calculateGenerationDir({ isModularLibrary: false });

      assert.strictEqual(result.rootDir, cwd);
      assert.strictEqual(result.metadataDir, cwd);
      assert.strictEqual(result.rlcSourcesDir, `${cwd}/sources/generated/src`);
      assert.strictEqual(result.modularSourcesDir, undefined);
    });

    it("should return correct dir structure when emitterOutputDir is provided ", async () => {
      pathExistsSpy.mockImplementation(async () => false);
      const emitterOutputDir = "/test";
      const result = await calculateGenerationDir(
        { isModularLibrary: false },
        emitterOutputDir
      );

      assert.strictEqual(result.rootDir, emitterOutputDir);
      assert.strictEqual(result.metadataDir, emitterOutputDir);
      assert.strictEqual(result.rlcSourcesDir, `${emitterOutputDir}/src`);
    });
  });
});
