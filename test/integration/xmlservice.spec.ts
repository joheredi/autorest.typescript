import * as assert from "assert";
import { XmlServiceClient } from "./generated/xmlservice/src/xmlServiceClient";
describe("XmlService", () => {
  let client: XmlServiceClient;

  beforeEach(() => {
    client = new XmlServiceClient();
  });

  it.only("should correctly deserialize a simple XML Document", async () => {
    const result = await client.xml.getSimple();
    assert.equal(result.author, "Yours Truly");
    assert.equal(result.date, "Date of publication");
    assert.equal(result.title, "Sample Slide Show");
    assert.equal(result.slides!.length, 2);

    // Verify slide1
    assert.equal(result.slides![0].title, "Wake up to WonderWidgets!");
    assert.equal(result.slides![0].type, "all");
    assert.equal(result.slides![0].items!.length, 0);

    // Verify slide2
    assert.equal(result.slides![1].title, "Overview");
    assert.equal(result.slides![1].type, "all");
    assert.equal(result.slides![1].items!.length, 3);
    assert.equal(result.slides![1].items![0], "Why WonderWidgets are great");
    assert.equal(result.slides![1].items![1], "");
    assert.equal(result.slides![1].items![2], "Who buys WonderWidgets");
  });
});
