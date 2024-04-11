import {
  modularTsps,
  nonBrandedModularTsps,
  nonBrandedRlcTsps,
  rlcTsps
} from "./cadl-ranch-list.js";
import pkg from "chalk";
import os from "os";
import { Worker } from "worker_threads";

const { bold } = pkg;
const logError = (str) => console.error(bold.red(str));
// tag could be "rlc" | "modular"
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

  const maxConcurrentWorkers = os.cpus().length;
  let activeWorkers = 0;

  for (const tsp of list) {
    if (isDebugging === true && tsp.debug !== true) {
      continue;
    }

    // Wait for an available worker
    if (activeWorkers >= maxConcurrentWorkers) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }

    const worker = new Worker("./test/commands/run.js");
    activeWorkers++;

    // Send the worker the data it needs to do the work

    worker.postMessage({ config: tsp, mode: tag });

    worker.on("message", ({ status, error }) => {
      if (status === "closed") {
        activeWorkers--;
      }
    });

    worker.on("error", (error) => {
      console.error(`Error from worker: ${error}`);
      activeWorkers--;
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
      activeWorkers--;
    });
  }

  while (activeWorkers > 0) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}

async function main() {
  console.time("generateTypeSpecs");
  const isDebugging = process.argv.indexOf("--debug") !== -1;
  const tagOptions = process.argv.filter((s) => s.startsWith("--tag="));
  const tag = tagOptions[0]?.split("=")[1];
  await generateTypeSpecs(tag, isDebugging);
  console.timeEnd("generateTypeSpecs");
}

let exitCode = 0;
try {
  await main();
} catch (e) {
  console.error(`Error occurred during execution\n${e.message}`);
  exitCode = 1;
} finally {
  process.exit(exitCode);
}
