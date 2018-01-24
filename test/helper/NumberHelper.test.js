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

describe("isNumber", () => {
    test("should test that the object is a Number", () => {
        expect(mindsmine.Number.isNumber(null)).toBeFalsy();
        expect(mindsmine.Number.isNumber(undefined)).toBeFalsy();
        expect(mindsmine.Number.isNumber(NaN)).toBeFalsy();
        expect(mindsmine.Number.isNumber(100)).toBeTruthy();
        expect(mindsmine.Number.isNumber("")).toBeFalsy();
        expect(mindsmine.Number.isNumber("hello")).toBeFalsy();
        expect(mindsmine.Number.isNumber(true)).toBeFalsy();
        expect(mindsmine.Number.isNumber(function() {})).toBeFalsy();
        expect(mindsmine.Number.isNumber([])).toBeFalsy();
        expect(mindsmine.Number.isNumber({})).toBeFalsy();
    });
});

describe("getNullSafe", () => {
    test("should get null safe numbers", () => {
        expect(mindsmine.Number.getNullSafe(null)).toBe(Number.NEGATIVE_INFINITY);
        expect(mindsmine.Number.getNullSafe(undefined)).toBe(Number.NEGATIVE_INFINITY);
        expect(mindsmine.Number.getNullSafe(NaN)).toBe(Number.NEGATIVE_INFINITY);
        expect(mindsmine.Number.getNullSafe(100)).toBe(100);
        expect(mindsmine.Number.getNullSafe("")).toBe(Number.NEGATIVE_INFINITY);
        expect(mindsmine.Number.getNullSafe("hello")).toBe(Number.NEGATIVE_INFINITY);
        expect(mindsmine.Number.getNullSafe(true)).toBe(Number.NEGATIVE_INFINITY);
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

describe("isPerfectSquare", () => {
    test("should test that the number is a Perfect Square", () => {
        expect(mindsmine.Number.isPerfectSquare(0)).toBeTruthy();
        expect(mindsmine.Number.isPerfectSquare(1)).toBeTruthy();
        expect(mindsmine.Number.isPerfectSquare(81)).toBeTruthy();
        expect(mindsmine.Number.isPerfectSquare(100)).toBeTruthy();

        expect(mindsmine.Number.isPerfectSquare(5)).toBeFalsy();
        expect(mindsmine.Number.isPerfectSquare(101)).toBeFalsy();
        expect(mindsmine.Number.isPerfectSquare(250)).toBeFalsy();
    });
});

describe("getUniqueRandomNumbers", () => {
    const lowerBound = 10;
    const upperBound = 81;
    const arraySize = 12;

    test("should throw TypeError due to null", () => {
        function callFunction() {
            mindsmine.Number.getUniqueRandomNumbers(null, null, null);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("@ERROR_PERMITTED_NUMBER@");
    });

    test("should throw TypeError due to non-Number", () => {
        function callFunction() {
            mindsmine.Number.getUniqueRandomNumbers("a", upperBound, arraySize);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("@ERROR_PERMITTED_NUMBER@");
    });

    test("should throw Error due to negative 'lowerBound'", () => {
        function callFunction() {
            mindsmine.Number.getUniqueRandomNumbers(-1, upperBound, arraySize);
        }

        expect(callFunction).toThrow(Error);
        expect(callFunction).toThrow("Negative number is not allowed as an argument.");
    });

    test("should throw Error due to negative 'upperBound'", () => {
        function callFunction() {
            mindsmine.Number.getUniqueRandomNumbers(lowerBound, -1, arraySize);
        }

        expect(callFunction).toThrow(Error);
        expect(callFunction).toThrow("Negative number is not allowed as an argument.");
    });

    test("should throw Error due to negative 'arraySize'", () => {
        function callFunction() {
            mindsmine.Number.getUniqueRandomNumbers(lowerBound, upperBound, -1);
        }

        expect(callFunction).toThrow(Error);
        expect(callFunction).toThrow("Negative number is not allowed as an argument.");
    });

    test("should throw Error due to 'lowerBound' larger than 'upperBound'", () => {
        function callFunction() {
            mindsmine.Number.getUniqueRandomNumbers(upperBound, lowerBound, arraySize);
        }

        expect(callFunction).toThrow(Error);
        expect(callFunction).toThrow("Lower Bound cannot be larger than Upper Bound.");
    });

    test("should throw Error due to not enough unique numbers", () => {
        function callFunction() {
            mindsmine.Number.getUniqueRandomNumbers(lowerBound, arraySize, upperBound);
        }

        expect(callFunction).toThrow(Error);
        expect(callFunction).toThrow("Not enough unique numbers available for the array size.");
    });

    test("should produce unique random integers", () => {
        function areUniqueValues(arr) {
            let set = new Set();

            for (let i = 0; i < arr.length; i++) {
                if (set.has(arr[i])) {
                    return false;
                }

                set.add(arr[i]);
            }

            return true;
        }

        let arr1 = mindsmine.Number.getUniqueRandomNumbers(0, upperBound, arraySize);
        let arr2 = mindsmine.Number.getUniqueRandomNumbers(lowerBound, upperBound, arraySize);

        expect(areUniqueValues(arr1)).toBeTruthy();
        expect(areUniqueValues(arr2)).toBeTruthy();
    });
});
