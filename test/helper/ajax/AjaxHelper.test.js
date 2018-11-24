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

const
    testJSONObject = {
        param1: "something",
        param2: "something else"
    },
    expected = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],
    code = 215,
    username = "username",
    password = "password",
    symbols = [
        "AAPL",
        "ALBO"
    ];

test("mindsmine.Ajax.DEFAULT_TIMEOUT should be fixed to two minutes", () => {
    expect(mindsmine.Ajax.DEFAULT_TIMEOUT).toEqual(120000);
});

test("mindsmine.Ajax.DEFAULT_ASYNC should be true", () => {
    expect(mindsmine.Ajax.DEFAULT_ASYNC).toBeTruthy();
});

test("mindsmine.Ajax.ALLOWED_METHODS should match the expected array of HTTP methods", () => {
    expect(mindsmine.Ajax.ALLOWED_METHODS).toEqual(expect.arrayContaining(expected));
});

describe("mindsmine.Ajax.request method", () => {
    test("basic auth must work", () => {
        expect.assertions(2);

        return mindsmine.Ajax.request(
            "GET",
            `http://httpbin.org/basic-auth/${username}/${password}`,
            {
                headers: {
                    "Authorization": "Basic " + window.btoa(`${username}:${password}`)
                }
            }
        ).then(response => {
            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
        });
    });

    test("GET JSON must work", () => {
        expect.assertions(symbols.length + 1);

        return mindsmine.Ajax.request(
            "GET",
            `https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${symbols.join(",")}`
        ).then(response => {
            expect(response).not.toBeNull();

            let __responseJSON = JSON.parse(response.responseText);

            for (let __stock in __responseJSON) {
                if (__responseJSON.hasOwnProperty(__stock)) {
                    expect(symbols).toContain(__responseJSON[__stock]["quote"]["symbol"]);
                }
            }
        });
    });

    test("GET must break with status code 400", () => {
        expect.assertions(2);

        return mindsmine.Ajax.request(
            "GET",
            `https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbol=${symbols.join(",")}`
        ).catch(response => {
            expect(response).not.toBeNull();
            expect(response.status).toBe(400);
        });
    });

    expected.forEach(method => {
        test(`${method} must break with TypeError`, () => {
            expect.assertions(2);

            return mindsmine.Ajax.request(
                method,
                `https//api.iextrading.com/1.0/stock/market/batch?types=quote&symbol=${symbols.join(",")}`
            ).catch(response => {
                expect(response).not.toBeNull();
                expect(response.toString()).toMatch("TypeError");
            });
        });
    });

    expected.forEach(method => {
        test(`${method} must work`, () => {
            expect.assertions(2);

            return mindsmine.Ajax.request(
                method,
                `http://httpbin.org/status/${code}`
            ).then(response => {
                expect(response).not.toBeNull();
                expect(response.status).toBe(code);
            });
        });
    });

    test("POST JSON must work", () => {
        expect.assertions(2);

        return mindsmine.Ajax.request(
            "POST",
            "http://httpbin.org/anything",
            {
                jsonData: testJSONObject
            }
        ).then(response => {
            expect(response).not.toBeNull();

            let __responseJSON = JSON.parse(response.responseText);

            expect(__responseJSON["json"]).toEqual(expect.objectContaining(testJSONObject));
        });
    });
});
