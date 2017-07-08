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

const decodedStr = "<a target='_blank' href='http://www.google.com'><span>Hello World</span></a>";
const encodedStr = "&lt;a target=&#39;_blank&#39; href=&#39;http://www.google.com&#39;&gt;&lt;span&gt;Hello World&lt;/span&gt;&lt;/a&gt;";

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
        expect(mindsmine.String.isEmpty(null)).toBeTruthy();
        expect(mindsmine.String.isEmpty(undefined)).toBeTruthy();
        expect(mindsmine.String.isEmpty(NaN)).toBeTruthy();
        expect(mindsmine.String.isEmpty(123)).toBeTruthy();
        expect(mindsmine.String.isEmpty("")).toBeTruthy();
        expect(mindsmine.String.isEmpty("Some String")).toBeFalsy();
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
        expect(mindsmine.String.getNullSafe(null)).toBe("");
        expect(mindsmine.String.getNullSafe(undefined)).toBe("");
        expect(mindsmine.String.getNullSafe(NaN)).toBe("");
        expect(mindsmine.String.getNullSafe(100)).toBe("");
        expect(mindsmine.String.getNullSafe("")).toBe("");
        expect(mindsmine.String.getNullSafe("hello")).toBe("hello");
        expect(mindsmine.String.getNullSafe(true)).toBe("");
    });
});

describe("areEqual", () => {
    test("should test string equality, leniently", () => {
        expect(mindsmine.String.areEqual(null, null, true)).toBeTruthy();
        expect(mindsmine.String.areEqual(null, "", true)).toBeTruthy();
        expect(mindsmine.String.areEqual("", null, true)).toBeTruthy();
        expect(mindsmine.String.areEqual("", "", true)).toBeTruthy();
        expect(mindsmine.String.areEqual("   ", "", true)).toBeTruthy();
        expect(mindsmine.String.areEqual(" abc", "abc ", true)).toBeTruthy();
        expect(mindsmine.String.areEqual("", "abc", true)).toBeFalsy();
        expect(mindsmine.String.areEqual("ab c", "abc", true)).toBeFalsy();
        expect(mindsmine.String.areEqual("ABC", "abc", true)).toBeTruthy();
        expect(mindsmine.String.areEqual("abc", "abc", true)).toBeTruthy();
    });

    test("should test string equality, strictly", () => {
        expect(mindsmine.String.areEqual(null, null, false)).toBeFalsy();
        expect(mindsmine.String.areEqual(null, "", false)).toBeFalsy();
        expect(mindsmine.String.areEqual("", null, false)).toBeFalsy();
        expect(mindsmine.String.areEqual("", "", false)).toBeTruthy();
        expect(mindsmine.String.areEqual("   ", "", false)).toBeFalsy();
        expect(mindsmine.String.areEqual(" abc", "abc ", false)).toBeFalsy();
        expect(mindsmine.String.areEqual("", "abc", false)).toBeFalsy();
        expect(mindsmine.String.areEqual("ab c", "abc", false)).toBeFalsy();
        expect(mindsmine.String.areEqual("ABC", "abc", false)).toBeFalsy();
        expect(mindsmine.String.areEqual("abc", "abc", false)).toBeTruthy();
    });

    test("should test string equality, default", () => {
        expect(mindsmine.String.areEqual(null, null)).toBeTruthy();
        expect(mindsmine.String.areEqual(null, "")).toBeTruthy();
        expect(mindsmine.String.areEqual("", null)).toBeTruthy();
        expect(mindsmine.String.areEqual("", "")).toBeTruthy();
        expect(mindsmine.String.areEqual("   ", "")).toBeTruthy();
        expect(mindsmine.String.areEqual(" abc", "abc ")).toBeTruthy();
        expect(mindsmine.String.areEqual("", "abc")).toBeFalsy();
        expect(mindsmine.String.areEqual("ab c", "abc")).toBeFalsy();
        expect(mindsmine.String.areEqual("ABC", "abc")).toBeTruthy();
        expect(mindsmine.String.areEqual("abc", "abc")).toBeTruthy();
    });
});

describe("isPalindrome", () => {
    test("should perform palindrome test, leniently", () => {
        expect(mindsmine.String.isPalindrome(null, true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("   ", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome(" aba", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("aba", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("mAdAm", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("madAm", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("madam", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("Madam", true)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("hello", true)).toBeFalsy();
    });

    test("should perform palindrome test, strictly", () => {
        expect(mindsmine.String.isPalindrome(null, false)).toBeFalsy();
        expect(mindsmine.String.isPalindrome("", false)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("   ", false)).toBeTruthy();
        expect(mindsmine.String.isPalindrome(" aba", false)).toBeFalsy();
        expect(mindsmine.String.isPalindrome("aba", false)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("mAdAm", false)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("madAm", false)).toBeFalsy();
        expect(mindsmine.String.isPalindrome("madam", false)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("Madam", false)).toBeFalsy();
        expect(mindsmine.String.isPalindrome("hello", false)).toBeFalsy();
    });

    test("should perform palindrome test, default", () => {
        expect(mindsmine.String.isPalindrome(null)).toBeTruthy();
        expect(mindsmine.String.isPalindrome("")).toBeTruthy();
        expect(mindsmine.String.isPalindrome("   ")).toBeTruthy();
        expect(mindsmine.String.isPalindrome(" aba")).toBeTruthy();
        expect(mindsmine.String.isPalindrome("aba")).toBeTruthy();
        expect(mindsmine.String.isPalindrome("mAdAm")).toBeTruthy();
        expect(mindsmine.String.isPalindrome("madAm")).toBeTruthy();
        expect(mindsmine.String.isPalindrome("madam")).toBeTruthy();
        expect(mindsmine.String.isPalindrome("Madam")).toBeTruthy();
        expect(mindsmine.String.isPalindrome("hello")).toBeFalsy();
    });
});
