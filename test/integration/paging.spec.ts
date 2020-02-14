import { PagingClient } from "./generated/paging/src/pagingClient";
import { expect } from "chai";
describe.only("Paging", () => {
  it("Should return 10 pages ", async () => {
    const client = new PagingClient();
    const it = client.paging.getMultiplePages();
    let iteration = 0;

    for await (let result of it) {
      expect(result.some(p => p.properties?.id === iteration + 1)).to.be.true;
      iteration++;
    }

    expect(iteration).to.equal(10);
  });
});
