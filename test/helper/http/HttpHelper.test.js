/*
 Copyright 2008-present Shaiksphere, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const TOKEN = "pk_5f5651f4e7f046e6b6ecf8afeb72d0c2",
    BASE_URI = `https://cloud.iexapis.com/v1/stock/market/batch?token=${TOKEN}`,
    // supportedMethods = [
    //     "GET",
    //     "HEAD",
    //     "POST",
    //     "PUT",
    //     "PATCH",
    //     "DELETE"
    // ],
    username = "username",
    password = "password",
    stockSymbols = [
        "AAPL",
        "ALBO"
    ],
    wrapFunction = function (url, options = {}) {
        mindsmine.Http.request(url, options);
    };

describe("mindsmine.Http.request method", () => {
    test("should throw TypeError due to null url", () => {
        function callFunction() {
            wrapFunction(null);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'url'. @ERROR_PERMITTED_STRING@");
    });

    test("should throw TypeError due to invalid url", () => {
        function callFunction() {
            wrapFunction("http:// shouldfail.com");
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'url'. Invalid URL.");
    });

    test("should throw TypeError due to invalid HTTP method", () => {
        function callFunction() {
            wrapFunction(
                "https://api.iextrading.com",
                {
                    method: "BLAH"
                }
            );
        }

        expect(callFunction).toThrow(TypeError);
    });

    test("should throw TypeError due to non-null jsonData for 'GET' HTTP method", () => {
        function callFunction() {
            wrapFunction(
                "https://api.iextrading.com",
                {
                    method: "GET",
                    jsonData: "Non Empty"
                }
            );
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. The request method is 'GET' or 'HEAD' but the body is non-null or not undefined.");
    });

    test("should work with Basic auth", async () => {
        expect.assertions(2);
        
        const response = await mindsmine.Http.request(
            `http://httpbin.org/basic-auth/${username}/${password}`,
            {
                headers: {
                    "Authorization": "Basic " + window.btoa(`${username}:${password}`)
                }
            }
        );

        expect(response).not.toBeNull();
        expect(response.status).toBe(200);
    });

    test("should work for 'GET' HTTP method", async () => {
        expect.assertions(1);

        const response = await mindsmine.Http.request(`${BASE_URI}&types=quote&symbols=${stockSymbols.join(",")}`);

        expect(response).not.toBeNull();

        response.json().then(data => {
            for (let __stock in data) {
                if (data.hasOwnProperty(__stock)) {
                    expect(stockSymbols).toContain(data[__stock]["quote"]["symbol"]);
                }
            }
        });
    });

    test("should break with status code 400", async () => {
        expect.assertions(4);

        try {
            return await mindsmine.Http.request(`${BASE_URI}&types=quote&symbol=${stockSymbols.join(",")}`);
        } catch (response) {
            expect(response).not.toBeNull();
            expect(response.status).toBe(400);
        }
    });

    /*
    supportedMethods.forEach(method => {
        test(`should throw TypeError for '${method}' HTTP method`, () => {
            expect.assertions(2);
            return mindsmine.Http.request(
                "https//httpbin.org/anything",
                {
                    method
                }
            ).catch(response => {
                expect(response).not.toBeNull();
                expect(response.toString()).toMatch("TypeError");
            });
        });
    });

    supportedMethods.forEach(method => {
        const test_code = 215;

        test(`should work for '${method}' HTTP method`, () => {
            expect.assertions(2);
            return mindsmine.Http.request(
                `http://httpbin.org/status/${test_code}`,
                {
                    method
                }
            ).then(response => {
                expect(response).not.toBeNull();
                expect(response.status).toBe(test_code);
            });
        });
    });

    test("should work for 'POST' HTTP method with JSON data", () => {
        const testJSONObject = {
            param1: "something",
            param2: "something else"
        };

        expect.assertions(2);

        return mindsmine.Http.request(
            "http://httpbin.org/anything",
            {
                method: "POST",
                jsonData: testJSONObject
            }
        ).then(response => {
            expect(response).not.toBeNull();

            response.json().then(data => {
                expect(data["json"]).toEqual(expect.objectContaining(testJSONObject));
            });
        });
    });
    //*/
});
