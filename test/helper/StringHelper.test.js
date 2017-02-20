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
    test("should format the string", () => {
        let str1 = "Hello";
        let str2 = "World";

        expect(mindsmine.String.format("Let us combine {0} and {1} together.", str1, str2))
            .toBe("Let us combine Hello and World together.");
    });
});

const decodedStr = '<a target="_blank" href="http://www.google.com"><span>Hello World</span></a>';
const encodedStr = '&lt;a target=&quot;_blank&quot; href=&quot;http://www.google.com&quot;&gt;&lt;span&gt;Hello World&lt;/span&gt;&lt;/a&gt;';

describe("htmlEncode", () => {
    test("should encode the HTML content", () => {
        expect(mindsmine.String.htmlEncode(decodedStr)).toBe(encodedStr);
    });
});

describe("htmlDecode", () => {
    test("should decode the HTML content", () => {
        expect(mindsmine.String.htmlDecode(encodedStr)).toBe(decodedStr);
    });
});

describe("isEmpty", () => {
    test("should check for string emptiness", () => {
        expect(mindsmine.String.isEmpty(null)).toBe(true);
        expect(mindsmine.String.isEmpty(undefined)).toBe(true);
        expect(mindsmine.String.isEmpty(123)).toBe(true);
        expect(mindsmine.String.isEmpty("")).toBe(true);
        expect(mindsmine.String.isEmpty("Some String")).toBe(false);
    });
});

describe("urlAppend", () => {
    test("should append to the URL", () => {
        const url = "http://www.google.com",
            urlQ = `${url}?param1=value1`,
            query = "param2=value2";

        expect(mindsmine.String.urlAppend(url, query)).toBe("http://www.google.com?param2=value2");
        expect(mindsmine.String.urlAppend(urlQ, query)).toBe("http://www.google.com?param1=value1&param2=value2");
    });
});

describe("getNullSafe", () => {
    test("should get null safe strings", () => {
        expect(mindsmine.String.getNullSafe("Hello")).toBe("Hello");
        expect(mindsmine.String.getNullSafe(null)).toBe("");
    });
});

describe("areEqual", () => {
    test("should test string equality, leniently", () => {
        expect(mindsmine.String.areEqual(null, null, true)).toBe(true);
        expect(mindsmine.String.areEqual(null, "", true)).toBe(true);
        expect(mindsmine.String.areEqual("", null, true)).toBe(true);
        expect(mindsmine.String.areEqual("", "", true)).toBe(true);
        expect(mindsmine.String.areEqual("   ", "", true)).toBe(true);
        expect(mindsmine.String.areEqual(" abc", "abc ", true)).toBe(true);
        expect(mindsmine.String.areEqual("", "abc", true)).toBe(false);
        expect(mindsmine.String.areEqual("ab c", "abc", true)).toBe(false);
        expect(mindsmine.String.areEqual("ABC", "abc", true)).toBe(true);
        expect(mindsmine.String.areEqual("abc", "abc", true)).toBe(true);
    });

    test("should test string equality, strictly", () => {
        expect(mindsmine.String.areEqual(null, null, false)).toBe(false);
        expect(mindsmine.String.areEqual(null, "", false)).toBe(false);
        expect(mindsmine.String.areEqual("", null, false)).toBe(false);
        expect(mindsmine.String.areEqual("", "", false)).toBe(true);
        expect(mindsmine.String.areEqual("   ", "", false)).toBe(false);
        expect(mindsmine.String.areEqual(" abc", "abc ", false)).toBe(false);
        expect(mindsmine.String.areEqual("", "abc", false)).toBe(false);
        expect(mindsmine.String.areEqual("ab c", "abc", false)).toBe(false);
        expect(mindsmine.String.areEqual("ABC", "abc", false)).toBe(false);
        expect(mindsmine.String.areEqual("abc", "abc", false)).toBe(true);
    });

    test("should test string equality, default", () => {
        expect(mindsmine.String.areEqual(null, null)).toBe(true);
        expect(mindsmine.String.areEqual(null, "")).toBe(true);
        expect(mindsmine.String.areEqual("", null)).toBe(true);
        expect(mindsmine.String.areEqual("", "")).toBe(true);
        expect(mindsmine.String.areEqual("   ", "")).toBe(true);
        expect(mindsmine.String.areEqual(" abc", "abc ")).toBe(true);
        expect(mindsmine.String.areEqual("", "abc")).toBe(false);
        expect(mindsmine.String.areEqual("ab c", "abc")).toBe(false);
        expect(mindsmine.String.areEqual("ABC", "abc")).toBe(true);
        expect(mindsmine.String.areEqual("abc", "abc")).toBe(true);
    });
});

describe("isPalindrome", () => {
    test("should perform palindrome test, leniently", () => {
        expect(mindsmine.String.isPalindrome(null, true)).toBe(true);
        expect(mindsmine.String.isPalindrome("", true)).toBe(true);
        expect(mindsmine.String.isPalindrome("   ", true)).toBe(true);
        expect(mindsmine.String.isPalindrome(" aba", true)).toBe(true);
        expect(mindsmine.String.isPalindrome("aba", true)).toBe(true);
        expect(mindsmine.String.isPalindrome("mAdAm", true)).toBe(true);
        expect(mindsmine.String.isPalindrome("madAm", true)).toBe(true);
        expect(mindsmine.String.isPalindrome("madam", true)).toBe(true);
        expect(mindsmine.String.isPalindrome("Madam", true)).toBe(true);
        expect(mindsmine.String.isPalindrome("hello", true)).toBe(false);
    });

    test("should perform palindrome test, strictly", () => {
        expect(mindsmine.String.isPalindrome(null, false)).toBe(false);
        expect(mindsmine.String.isPalindrome("", false)).toBe(true);
        expect(mindsmine.String.isPalindrome("   ", false)).toBe(true);
        expect(mindsmine.String.isPalindrome(" aba", false)).toBe(false);
        expect(mindsmine.String.isPalindrome("aba", false)).toBe(true);
        expect(mindsmine.String.isPalindrome("mAdAm", false)).toBe(true);
        expect(mindsmine.String.isPalindrome("madAm", false)).toBe(false);
        expect(mindsmine.String.isPalindrome("madam", false)).toBe(true);
        expect(mindsmine.String.isPalindrome("Madam", false)).toBe(false);
        expect(mindsmine.String.isPalindrome("hello", false)).toBe(false);
    });

    test("should perform palindrome test, default", () => {
        expect(mindsmine.String.isPalindrome(null)).toBe(true);
        expect(mindsmine.String.isPalindrome("")).toBe(true);
        expect(mindsmine.String.isPalindrome("   ")).toBe(true);
        expect(mindsmine.String.isPalindrome(" aba")).toBe(true);
        expect(mindsmine.String.isPalindrome("aba")).toBe(true);
        expect(mindsmine.String.isPalindrome("mAdAm")).toBe(true);
        expect(mindsmine.String.isPalindrome("madAm")).toBe(true);
        expect(mindsmine.String.isPalindrome("madam")).toBe(true);
        expect(mindsmine.String.isPalindrome("Madam")).toBe(true);
        expect(mindsmine.String.isPalindrome("hello")).toBe(false);
    });
});
