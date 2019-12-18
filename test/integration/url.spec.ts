import * as assert from "assert";
import { UrlClient } from "./generated/url/src/urlClient";
describe("Url Client", function() {
  var clientOptions = { noRetryPolicy: true, baseUri: "http://localhost:3000" };
  var testClient = new UrlClient("globalStringPath", clientOptions);
  testClient.globalStringQuery = "globalStringQuery";
  it("should work when path has null, empty, and multi-byte byte values", async function() {
    try {
      await testClient.paths.byteNull(null as any);
      assert.fail("Expected byteNull to throw error with null bytePath");
    } catch {
      assert.ok("Threw as expected");
    }

    const str = "啊齄丂狛狜隣郎隣兀﨩";
    const encoded = Buffer.from(str, "utf-8");
    await testClient.paths.byteMultiByte(encoded);
    assert.ok("byteMultiByte call succeeded");
  });

  //     });
  //     it('should work when path has string', function (done) {
  //       testClient.paths.stringEmpty(function (error, result) {
  //         should().not.exist(error);
  //         testClient.paths.stringNull(null, function (error, result) {
  //           error.should.exist;
  //           testClient.paths.stringUrlEncoded(function (error, result) {
  //             should().not.exist(error);
  //             done();
  //           });
  //         });
  //       });
  //     });
  //     it('should work when path has base64url encoded string', function (done) {
  //       testClient.paths.base64Url(stringToByteArray('lorem'), function (error, result) {
  //         should().not.exist(error);
  //         should().not.exist(result);
  //         done();
  //       });
  //     });
  //     it('should work when path has a paramaeter in UnixTime format', function (done) {
  //       testClient.paths.unixTimeUrl(new Date('2016-04-13T00:00:00.000Z'), function (error, result) {
  //         should().not.exist(error);
  //         done();
  //       });
  //     });
  //     it('should work when path has datetime', function (done) {
  //       testClient.paths.dateTimeValid(function (error, result) {
  //         should().not.exist(error);
  //         testClient.paths.dateTimeNull(null, function (error, result) {
  //           error.should.exist;
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when path has date', async function () {
  //       await testClient.paths.dateValid();
  //     });
  //     it('should work when query has date', async function () {
  //       await testClient.queries.dateValid();
  //     });
  //     it('should work when path has enum', async function () {
  //       const error1 = await msAssert.throwsAsync(testClient.paths.enumValid(<AutoRestUrlTestServiceModels.UriColor>''));
  //       error1.message.should.equal(` is not a valid value for enumPath. The valid values are: ["red color","green color","blue color"].`);
  //       const error2 = await msAssert.throwsAsync(testClient.paths.enumNull(<AutoRestUrlTestServiceModels.UriColor>null));
  //       error2.message.should.equal(`enumPath cannot be null or undefined.`);
  //       await testClient.paths.enumValid('green color');
  //     });
  //     it('should work when path has bool', async function () {
  //       await testClient.paths.getBooleanTrue();
  //       await testClient.paths.getBooleanFalse();
  //     });
  //     it('should work when path has double decimal values', function (done) {
  //       testClient.paths.doubleDecimalNegative(function (error, result) {
  //         should().not.exist(error);
  //         testClient.paths.doubleDecimalPositive(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when path has float values', function (done) {
  //       testClient.paths.floatScientificNegative(function (error, result) {
  //         should().not.exist(error);
  //         testClient.paths.floatScientificPositive(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when path has integer values', function (done) {
  //       testClient.paths.getIntNegativeOneMillion(function (error, result) {
  //         should().not.exist(error);
  //         testClient.paths.getIntOneMillion(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when path has big integer values', function (done) {
  //       testClient.paths.getNegativeTenBillion(function (error, result) {
  //         should().not.exist(error);
  //         testClient.paths.getTenBillion(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when use values in different portion of url', function (done) {
  //       var optionalParams = { localStringQuery: 'localStringQuery', pathItemStringQuery: 'pathItemStringQuery' };
  //       testClient.pathItems.getAllWithValues('localStringPath', 'pathItemStringPath', optionalParams, function (error, result) {
  //         should().not.exist(error);
  //         done();
  //       });
  //     });
  //     it('should work when use null values in different portion of url', function (done) {
  //       testClient.globalStringQuery = null;
  //       var optionalParams = { localStringQuery: <string>null, pathItemStringQuery: 'pathItemStringQuery' };
  //       testClient.pathItems.getGlobalAndLocalQueryNull('localStringPath', 'pathItemStringPath', optionalParams, function (error, result) {
  //         should().not.exist(error);
  //         optionalParams = { localStringQuery: 'localStringQuery', pathItemStringQuery: 'pathItemStringQuery' };
  //         testClient.pathItems.getGlobalQueryNull('localStringPath', 'pathItemStringPath', optionalParams, function (error, result) {
  //           should().not.exist(error);
  //           testClient.globalStringQuery = 'globalStringQuery';
  //           optionalParams = { localStringQuery: null, pathItemStringQuery: null };
  //           testClient.pathItems.getLocalPathItemQueryNull('localStringPath', 'pathItemStringPath', optionalParams, function (error, result) {
  //             should().not.exist(error);
  //             done();
  //           });
  //         });
  //       });
  //     });
  //     it('should work when query has bool', function (done) {
  //       testClient.queries.getBooleanTrue(function (error, result) {
  //         should().not.exist(error);
  //         testClient.queries.getBooleanFalse(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when query has double values', function (done) {
  //       testClient.queries.doubleDecimalNegative(function (error, result) {
  //         should().not.exist(error);
  //         testClient.queries.doubleDecimalPositive(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when query has float values', function (done) {
  //       testClient.queries.floatScientificNegative(function (error, result) {
  //         should().not.exist(error);
  //         testClient.queries.floatScientificPositive(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when query has int values', function (done) {
  //       testClient.queries.getIntNegativeOneMillion(function (error, result) {
  //         should().not.exist(error);
  //         testClient.queries.getIntOneMillion(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when query has billion values', function (done) {
  //       testClient.queries.getNegativeTenBillion(function (error, result) {
  //         should().not.exist(error);
  //         testClient.queries.getTenBillion(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when query has string values', function (done) {
  //       testClient.queries.stringEmpty(function (error, result) {
  //         should().not.exist(error);
  //         testClient.queries.stringUrlEncoded(function (error, result) {
  //           should().not.exist(error);
  //           done();
  //         });
  //       });
  //     });
  //     it('should work when query has datetime', function (done) {
  //       testClient.queries.dateTimeValid(function (error, result) {
  //         should().not.exist(error);
  //         done();
  //       });
  //     });
  //     it('should work when query has byte values', async function () {
  //       await testClient.queries.byteEmpty();
  //       await testClient.queries.byteMultiByte({ byteQuery: stringToByteArray('啊齄丂狛狜隣郎隣兀﨩') });
  //     });
  //     it('should work when query has enum values', async function () {
  //       await msAssert.throwsAsync(testClient.queries.enumValid({ enumQuery: <AutoRestUrlTestServiceModels.UriColor>'' }));
  //       await testClient.queries.enumNull({ enumQuery: null });
  //       await testClient.queries.enumValid({ enumQuery: 'green color' });
  //     });
  //     it('should work when query has string array values', async function () {
  //       const testArray = ['ArrayQuery1', 'begin!*\'();:@ &=+$,/?#[]end', null, ''];
  //       await testClient.queries.arrayStringCsvEmpty({ arrayQuery: [] });
  //       await testClient.queries.arrayStringCsvValid({ arrayQuery: testArray });
  //       await testClient.queries.arrayStringPipesValid({ arrayQuery: testArray });
  //       await testClient.queries.arrayStringSsvValid({ arrayQuery: testArray });
  //       await testClient.queries.arrayStringTsvValid({ arrayQuery: testArray });
  //     });
  //     it('should work when path has string array values', async function () {
  //       await testClient.paths.arrayCsvInPath(['ArrayPath1', 'begin!*\'();:@ &=+$,/?#[]end', null, '']);
  //     });
  //     it('should work when use null values in url query', async function () {
  //       await testClient.queries.byteNull({ byteQuery: null });
  //       await testClient.queries.dateNull({ dateQuery: null });
  //       await testClient.queries.dateTimeNull({ dateTimeQuery: null });
  //       await testClient.queries.doubleNull({ doubleQuery: null });
  //       await testClient.queries.floatNull({ floatQuery: null });
  //       await testClient.queries.getBooleanNull({ boolQuery: null });
  //       await testClient.queries.getIntNull({ intQuery: null });
  //       await testClient.queries.getLongNull({ longQuery: null });
  //       await testClient.queries.stringNull({ stringQuery: null });
  //       await testClient.queries.arrayStringCsvNull({ arrayQuery: null });
  //     });
});
