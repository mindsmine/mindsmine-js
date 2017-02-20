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

describe("getNullSafe", () => {
    test("should get null safe numbers", () => {
        expect(mindsmine.Number.getNullSafe(123)).toBe(123);
        expect(mindsmine.Number.getNullSafe(null)).toBe(Number.NEGATIVE_INFINITY);
    });
});

describe("getNumOfDigits", () => {
    test("should throw TypeError due to null", () => {
        function callFunction() {
            mindsmine.Number.getNumOfDigits(null);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("@ERROR_PERMITTED_NUMBER@");
    });

    test("should throw TypeError due to non-Number", () => {
        function callFunction() {
            mindsmine.Number.getNumOfDigits("a");
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("@ERROR_PERMITTED_NUMBER@");
    });

    test("should count number of digits", () => {
        expect(mindsmine.Number.getNumOfDigits(0)).toBe(1);
        expect(mindsmine.Number.getNumOfDigits(2)).toBe(1);
        expect(mindsmine.Number.getNumOfDigits(10)).toBe(2);
        expect(mindsmine.Number.getNumOfDigits(-10)).toBe(2);
    });
});
