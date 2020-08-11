import { BodyFormData } from "./generated/bodyFormData/src/bodyFormData";
import { isNode } from "@azure/core-http";
import { createReadStream, readFileSync } from "fs"
import { assert } from "chai";

describe.only("BodyFormData", () => {
    let client: BodyFormData;

    beforeEach(() => {
        client = new BodyFormData();
    });

    if (isNode) {
        it("(Node) should correctly accept file via form-dat ", async () => {
            try {
                const file = () => createReadStream(__dirname + '/assets/sample.png');
                const result = await client.formdata.uploadFile(file, 'sample.png');
                const buff = await readStreamToBuffer(result.readableStreamBody!)
                assert.deepEqual(buff, readFileSync(__dirname + '/assets/sample.png'));
            } catch (error) {
                assert.fail(JSON.stringify(error))
            }
        })
    }

    if (!isNode) {
        it('browser should correctly accept file via form-dat', async function () {
            const content = require(`arraybuffer-loader!${__dirname}/sample.png`);
            const blob = new Blob([content]);
            const response = await client.formdata.uploadFile(blob, 'sample.png');
            const body = await response.blobBody;
            const reader = new FileReader();
            const readPromise = new Promise(function (resolve, reject) {
                reader.addEventListener("error", reject);
                reader.addEventListener("abort", reject);
                reader.addEventListener("load", resolve);
            });
            reader.readAsArrayBuffer(body);
            await readPromise;
            const actualBytes = new Uint8Array(reader.result as ArrayBuffer);
            const expectedBytes = new Uint8Array(content);
            actualBytes.length.should.equal(expectedBytes.length, 'length');
            for (let i = 0; i < actualBytes.length; i++) {
                actualBytes[i].should.equal(expectedBytes[i], `position ${i}`);
            }
        });
    }


})


const readStreamToBuffer = async function (strm: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const bufs: Buffer[] = [];
        strm.on('data', function (d: Buffer) {
            bufs.push(d);
        });
        strm.on('end', function () {
            resolve(Buffer.concat(bufs));
        });
        strm.on('error', reject);
    });
};