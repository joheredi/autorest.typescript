import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

async function run(command, parameters, options = {}) {
  const childProcess = spawn(command, parameters, {
    cwd: options.cwd,
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === "win32",
  });

  return onExit(childProcess);
}

const onExit = (childProcess) => {
  return new Promise((resolve, reject) => {
    childProcess.once("exit", (code, signal) => {
      if (code === 0) {
        resolve();
      }
      reject(new Error(`Exit with code: ${code}`));
    });

    childProcess.once("error", (error) => {
      reject(error);
    });
  });
};

async function generate(path) {
  const result = await run("cadl", ["compile", "./spec"], { cwd: path });
  if (result?.stderr) {
    console.log(Error(result.stderr));
    process.exitCode = 1;
  }
}

async function build(path) {
  const command = `npm install && npm run build`;
  console.log(command);
  const installResult = await run("npm", ["install"], {
    cwd: `${path}/cadl-output`,
  });
  const buildResult = await run("npm", ["run", "build"], {
    cwd: `${path}/cadl-output`,
  });

  const resultError = installResult.stderr ?? buildResult.stderr;
  if (resultError) {
    console.log(Error(resultError));
    process.exitCode = 1;
  }
}

async function main() {
  const folder = process.argv[process.argv.length - 1];

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const root = join(__dirname, "..");

  const folders = folder ? [folder] : await readdir(join(root, "test"));

  for (const folder of folders) {
    const path = join(root, "test", folder);
    console.log(`================Start ${folder}===============`);
    await generate(path);
    await build(path);
    console.log(`================End ${folder}===============`);
  }
}

main();
