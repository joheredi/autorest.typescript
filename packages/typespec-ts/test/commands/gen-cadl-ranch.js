import {
  modularTsps,
  nonBrandedModularTsps,
  nonBrandedRlcTsps,
  rlcTsps
} from "./cadl-ranch-list.js";
import { runTypespec } from "./run.js";

const BATCH_SIZE = 20;

async function generateTypeSpecs(tag = "rlc", isDebugging) {
  let list = rlcTsps;

  switch (tag) {
    case "rlc":
      list = rlcTsps;
      break;
    case "modular":
      list = modularTsps;
      break;
    case "non-branded-rlc":
      list = nonBrandedRlcTsps;
      break;
    case "non-branded-modular":
      list = nonBrandedModularTsps;
      break;
    default:
      list = rlcTsps;
      break;
  }

  for (let i = 0; i < list.length; i += BATCH_SIZE) {
    const batch = list.slice(i, i + BATCH_SIZE);
    const generatePromises = batch.map((tsp) => {
      if (isDebugging && tsp.debug !== true) {
        return Promise.resolve(); // Skip non-debugging tasks in debug mode
      }
      return runTypespec(tsp, tag);
    });

    await Promise.allSettled(generatePromises);
  }
}

async function main() {
  const isDebugging = process.argv.indexOf("--debug") !== -1;
  const tagOptions = process.argv.filter((s) => s.startsWith("--tag="));
  const tag = tagOptions[0]?.split("=")[1];
  await generateTypeSpecs(tag, isDebugging);
}

let exitCode = 0;
try {
  await main();
} catch (e) {
  console.error(e);
  exitCode = 1;
} finally {
  process.exit(exitCode);
}
