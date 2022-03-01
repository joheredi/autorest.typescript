import { Project } from "ts-morph";
import * as path from 'path';
import * as fs from 'fs';
import * as hbs from "handlebars";
import { getAutorestOptions } from "../../autorestSession";

export function generateRecordedClientFile(
    project: Project
  ) {
    const { generateTest, restLevelClient } = getAutorestOptions();
    if (!generateTest || !restLevelClient) {
      return;
    }
    const metadata = {}
    const file = fs.readFileSync(path.join(__dirname, "rlcRecordedClient.ts.hbs"), {
      encoding: "utf-8"
    });
    const recordedClientFileContents = hbs.compile(file, { noEscape: true });
    project.createSourceFile("test/public/utils/recordedClient.ts", recordedClientFileContents(metadata), {
      overwrite: true
    });
  }