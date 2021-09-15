import { assert } from "chai";
import BodyComplex, {
  BodyComplexRestClientRestClient
} from "./generated/bodyComplexRest/src";

import * as moment from "moment";

describe("BodyComplex Rest Client", () => {
  let client: BodyComplexRestClientRestClient;

  beforeEach(() => {
    client = BodyComplex({ allowInsecureConnection: true });
  });

  describe("Swagger Complex Type BAT", function() {
    describe("Basic Types Operations", function() {
      it("should get and put valid basic type properties", async function() {
        const result = await client.path("/complex/basic/valid").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(result.body.id, 2);
        assert.strictEqual(result.body.name, "abc");
        assert.strictEqual(result.body.color, "YELLOW");

        const resultPut = await client
          .path("/complex/basic/valid")
          .put({ body: { id: 2, name: "abc", color: "Magenta" } });

        assert.equal(resultPut.status, "200");
      });

      it("should get null basic type properties", async function() {
        // const result = await testClient.basic.getNull();
        const result = await client.path("/complex/basic/null").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(null, result.body.id);
        assert.strictEqual(null, result.body.name);
      });

      it("should get empty basic type properties", async () => {
        // const result = await testClient.basic.getEmpty();
        const result = await client.path("/complex/basic/empty").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(result.body.id, undefined);
        assert.strictEqual(result.body.name, undefined);
      });

      it("should get basic type properties when the payload is empty", async () => {
        const result = await client.path("/complex/basic/notprovided").get();
        assert.equal(result.body, undefined);
      });

      it("should deserialize invalid basic types without throwing", async () => {
        const result = await client.path("/complex/basic/invalid").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.deepEqual(result.body, { id: "a", name: "abc" } as any);
      });
    });

    describe("Primitive Types Operations", function() {
      it("should handle getComplexPolymorphismDotSyntax", async () => {
        const result = await client.path("/complex/primitive/double").put({
          body: {
            field1: 3e-100,
            field_56_zeros_after_the_dot_and_negative_zero_before_dot_and_this_is_a_long_field_name_on_purpose: -5e-57
          }
        });

        assert.equal(result.status, "200");
      });

      it("should handle getComplexPolymorphismDotSyntax", async () => {
        const result = await client.path("/complex/primitive/double").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(result.body.field1, 3e-100);
        assert.strictEqual(
          result.body
            .field_56_zeros_after_the_dot_and_negative_zero_before_dot_and_this_is_a_long_field_name_on_purpose,
          -0.000000000000000000000000000000000000000000000000000000005
        );
      });

      it("should get and put valid int properties", async () => {
        const result = await client.path("/complex/primitive/integer").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(result.body.field1, -1);
        assert.strictEqual(result.body.field2, 2);

        const resultPut = await client
          .path("/complex/primitive/integer")
          .put({ body: { field1: -1, field2: 2 } });
        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid long properties", async () => {
        const result = await client.path("/complex/primitive/long").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }
        assert.strictEqual(result.body.field1, 1099511627775);
        assert.strictEqual(result.body.field2, -999511627788);

        const resultPut = await client.path("/complex/primitive/long").put({
          body: {
            field1: 1099511627775,
            field2: -999511627788
          }
        });

        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid float properties", async () => {
        const result = await client.path("/complex/primitive/float").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }
        assert.strictEqual(result.body.field1, 1.05);
        assert.strictEqual(result.body.field2, -0.003);

        const resultPut = await client.path("/complex/primitive/float").put({
          body: {
            field1: 1.05,
            field2: -0.003
          }
        });
      });

      it("should get and put valid bool properties", async () => {
        const result = await client.path("/complex/primitive/bool").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(result.body.field_true, true);
        assert.strictEqual(result.body.field_false, false);

        const resultPut = await client.path("/complex/primitive/bool").put({
          body: {
            field_true: true,
            field_false: false
          }
        });

        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid string properties", async () => {
        const result = await client.path("/complex/primitive/string").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(result.body.field, "goodrequest");
        assert.strictEqual(result.body.empty, "");
        assert.strictEqual((result as any)["nullProperty"], undefined);

        const resultPut = await client.path("/complex/primitive/string").put({
          body: {
            field: "goodrequest",
            empty: ""
          }
        });

        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid date properties", async () => {
        const result = await client.path("/complex/primitive/date").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }
        assert.deepEqual(result.body.field, new Date("0001-01-01"));
        assert.deepEqual(result.body.leap, new Date("2016-02-29"));

        const resultPut = await client.path("/complex/primitive/date").put({
          body: {
            field: new Date("0001-01-01"),
            leap: new Date("2016-02-29")
          }
        });

        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid date-time properties", async () => {
        const result = await client.path("/complex/primitive/datetime").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }
        assert.deepEqual(result.body.field, new Date("0001-01-01T00:00:00Z"));
        assert.deepEqual(result.body.now, new Date("2015-05-18T18:38:00Z"));

        const resultPut = await client.path("/complex/primitive/datetime").put({
          body: {
            field: new Date("0001-01-01T00:00:00Z"),
            now: new Date("2015-05-18T18:38:00Z")
          }
        });

        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid date-time-rfc1123 properties", async () => {
        const timeStringOne = "Mon, 01 Jan 0001 00:00:00 GMT";
        const timeStringTwo = "Mon, 18 May 2015 11:38:00 GMT";

        const result = await client
          .path("/complex/primitive/datetimerfc1123")
          .get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }
        assert.deepEqual(result.body.field, new Date(timeStringOne));
        assert.deepEqual(result.body.now, new Date(timeStringTwo));

        const dateFormat = "ddd, DD MMM YYYY HH:mm:ss";
        const fieldDate = moment.utc(timeStringOne, dateFormat).toDate();

        const resultPut = await client
          .path("/complex/primitive/datetimerfc1123")
          .put({
            body: {
              field: fieldDate,
              now: new Date(timeStringTwo)
            }
          });
        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid duration properties", async function() {
        const durationString = "P123DT22H14M12.011S";
        const result = await client.path("/complex/primitive/duration").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.strictEqual(result.body.field, durationString);

        const resultPut = await client.path("/complex/primitive/duration").put({
          body: {
            field: durationString
          }
        });

        assert.equal(resultPut.status, "200");
      });

      it("should get and put valid byte properties", async () => {
        const byteBuffer = new Uint8Array([
          255,
          254,
          253,
          252,
          0,
          250,
          249,
          248,
          247,
          246
        ]);

        const result = await client.path("/complex/primitive/byte").get();

        if (result.status !== "200") {
          const error = `Unexpected status code ${result.status}`;
          assert.fail(error);
          throw error;
        }

        assert.deepEqual(
          [].slice.apply(result.body.field),
          [].slice.apply(byteBuffer)
        );

        const resultPut = await client.path("/complex/primitive/byte").put({
          body: {
            field: byteBuffer
          }
        });

        assert.equal(resultPut.status, "200");
      });
    });
  });
});
