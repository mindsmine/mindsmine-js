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

describe("mindsmine.URL.isValidURL", () => {
    test("should pass for valid URLs", () => {
        [
            "https://api.iextrading.com",
            "https://api.iextrading.com/1.0/stock/market/batch",
            "https://api.iextrading.com/1.0/stock/market/batch?types=quote",
            "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=AAPL",
            "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=AAPL#",
            "https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=AAPL#tab1",
            "http://userid:password@example.com:8080",
            "http://userid:password@example.com:8080/",
            "http://userid@example.com",
            "http://userid@example.com/",
            "http://userid@example.com:8080",
            "http://userid@example.com:8080/",
            "http://userid:password@example.com",
            "http://userid:password@example.com/",
            "http://142.42.1.1/",
            "http://142.42.1.1:8080/",
            "http://➡.ws/䨹",
            "http://⌘.ws",
            "http://⌘.ws/	",
            "http://foo.com/blah_(wikipedia)#cite-1",
            "http://foo.com/blah_(wikipedia)_blah#cite-1",
            "http://foo.com/unicode_(✪)_in_parens",
            "http://foo.com/(something)?after=parens",
            "http://☺.damowmow.com/",
            "http://code.google.com/events/#&product=browser",
            "http://j.mp",
            "ftp://foo.bar/baz",
            "http://foo.bar/?q=Test%20URL-encoded%20stuff",
            "http://مثال.إختبار	",
            "http://例子.测试"
        ].forEach(url => {
            expect(mindsmine.URL.isValidURL(url)).toBeTruthy();
        });
    });

    test("should fail for invalid URLs", () => {
        [
            null,
            "",
            "http://",
            "http://?",
            "http://??",
            "http://??/",
            "http://#",
            "http://##",
            "http://##/",
            "//",
            "//a",
            "///a",
            "foo.com",
            "http:// shouldfail.com",
            ":// should fail",
            "/main.html",
            "www.example.com/main.html"
        ].forEach(url => {
            expect(mindsmine.URL.isValidURL(url)).toBeFalsy();
        });
    });
});

const url_plain = "http://www.google.com";
const url = "http://www.google.com?param1=value1&param2=value2#hash3=value3&hash4";

describe("mindsmine.URL.appendQuery", () => {
    [
        [
            "null URL",
            null,
            null,
            null,
            "Fatal Error. 'url'. Invalid URL."
        ],
        [
            "invalid URL",
            ":// should fail",
            null,
            null,
            "Fatal Error. 'url'. Invalid URL."
        ],
        [
            "empty parameter key",
            "http://www.google.com",
            null,
            null,
            "Fatal Error. 'param'. @ERROR_PERMITTED_STRING@"
        ]
    ].forEach(arr => {
        test(`should throw TypeError due to ${arr[0]}`, () => {
            function callFunction() {
                mindsmine.URL.appendQuery(arr[1], arr[2], arr[3]);
            }

            expect(callFunction).toThrow(TypeError);
            expect(callFunction).toThrow(arr[4]);
        });
    });

    [
        [
            url_plain,
            "http://www.google.com/?param2=value2"
        ],
        [
            `${url_plain}?param1=value1`,
            "http://www.google.com/?param1=value1&param2=value2"
        ],
        [
            `${url_plain}#hash1`,
            "http://www.google.com/?param2=value2#hash1"
        ],
        [
            `${url_plain}?param1=value1#hash1`,
            "http://www.google.com/?param1=value1&param2=value2#hash1"
        ]
    ].forEach(arr => {
        test(`should append query parameter to '${arr[0]}'`, () => {
            expect(mindsmine.URL.appendQuery(arr[0], "param2", "value2")).toBe(arr[1]);
        });
    });
});

describe("mindsmine.URL.getAllQueryParameters", () => {
    [
        [
            url_plain,
            null
        ],
        [
            url,
            {
                param1: "value1",
                param2: "value2"
            }
        ]
    ].forEach(arr => {
        test(`should retrieve all query parameters from ${arr[0]}`, () => {
            expect(mindsmine.URL.getAllQueryParameters(arr[0])).toEqual(arr[1]);
        });
    });

    test("should throw TypeError due to null URL", () => {
        function callFunction() {
            mindsmine.URL.getAllQueryParameters(null);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'url'. Invalid URL.");
    });
});

describe("mindsmine.URL.getQueryParameter", () => {
    [
        [
            "param1",
            "value1"
        ],
        [
            "param2",
            "value2"
        ],
        [
            "param3",
            null
        ]
    ].forEach(arr => {
        test(`should retrieve the value '${arr[1]}' for param '${arr[0]}'`, () => {
            expect(mindsmine.URL.getQueryParameter(url, arr[0])).toBe(arr[1]);
        });
    });

    [
        [
            "null URL",
            null,
            "null",
            "Fatal Error. 'url'. Invalid URL."
        ],
        [
            "empty parameter key",
            "http://www.google.com",
            null,
            "Fatal Error. 'queryParam'. @ERROR_PERMITTED_STRING@"
        ]
    ].forEach(arr => {
        test(`should throw TypeError due to ${arr[0]}`, () => {
            function callFunction() {
                mindsmine.URL.getQueryParameter(arr[1], arr[2]);
            }

            expect(callFunction).toThrow(TypeError);
            expect(callFunction).toThrow(arr[3]);
        });
    });
});

describe("mindsmine.URL.getAllHashParameters", () => {
    [
        [
            url_plain,
            null
        ],
        [
            url,
            {
                hash3: "value3",
                hash4: true
            }
        ]
    ].forEach(arr => {
        test(`should retrieve all hash parameters from ${arr[0]}`, () => {
            expect(mindsmine.URL.getAllHashParameters(arr[0])).toEqual(arr[1]);
        });
    });

    test("should throw TypeError due to null URL", () => {
        function callFunction() {
            mindsmine.URL.getAllHashParameters(null);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'url'. Invalid URL.");
    });
});

describe("mindsmine.URL.getHashParameter", () => {
    [
        [
            "hash3",
            "value3"
        ],
        [
            "hash4",
            true
        ],
        [
            "hash5",
            null
        ]
    ].forEach(arr => {
        test(`should retrieve the value '${arr[1]}' for param '${arr[0]}'`, () => {
            expect(mindsmine.URL.getHashParameter(url, arr[0])).toBe(arr[1]);
        });
    });

    [
        [
            "null URL",
            null,
            "null",
            "Fatal Error. 'url'. Invalid URL."
        ],
        [
            "empty parameter key",
            "http://www.google.com",
            null,
            "Fatal Error. 'hashParam'. @ERROR_PERMITTED_STRING@"
        ]
    ].forEach(arr => {
        test(`should throw TypeError due to ${arr[0]}`, () => {
            function callFunction() {
                mindsmine.URL.getHashParameter(arr[1], arr[2]);
            }

            expect(callFunction).toThrow(TypeError);
            expect(callFunction).toThrow(arr[3]);
        });
    });
});
