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

describe("format", () => {
    it("should format the string", () => {
        let str1 = "Hello";
        let str2 = "World";

        expect(mindsmine.String.format("Let us combine {0} and {1} together.", str1, str2))
            .toBe("Let us combine Hello and World together.");
    });
});

const decodedStr = '<a target="_blank" href="http://www.google.com"><span>Hello World</span></a>';
const encodedStr = '&lt;a target=&quot;_blank&quot; href=&quot;http://www.google.com&quot;&gt;&lt;span&gt;Hello World&lt;/span&gt;&lt;/a&gt;';

describe("htmlEncode", () => {
    it("should encode the HTML content", () => {
        expect(mindsmine.String.htmlEncode(decodedStr)).toBe(encodedStr);
    });
});

describe("htmlDecode", () => {
    it("should decode the HTML content", () => {
        expect(mindsmine.String.htmlDecode(encodedStr)).toBe(decodedStr);
    });
});

describe("isEmpty", () => {
    it("should check for string emptiness", () => {
        expect(mindsmine.String.isEmpty(null)).toBe(true);
        expect(mindsmine.String.isEmpty(undefined)).toBe(true);
        expect(mindsmine.String.isEmpty(123)).toBe(true);
        expect(mindsmine.String.isEmpty("")).toBe(true);
        expect(mindsmine.String.isEmpty("Some String")).toBe(false);
    });
});

describe("urlAppend", () => {
    it("should append to the URL", () => {
        const url = "http://www.google.com",
            urlQ = `${url}?param1=value1`,
            query = "param2=value2";

        expect(mindsmine.String.urlAppend(url, query)).toBe("http://www.google.com?param2=value2");
        expect(mindsmine.String.urlAppend(urlQ, query)).toBe("http://www.google.com?param1=value1&param2=value2");
    });
});

describe("getNullSafe", () => {
    it("should get null safe strings", () => {
        expect(mindsmine.String.getNullSafe("Hello")).toBe("Hello");
        expect(mindsmine.String.getNullSafe(null)).toBe("");
    });
});
