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

test("mindsmine.Number.isNumber should test that the object is a Number", () => {
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

describe("mindsmine.Number.getNullSafe", () => {
    [
        null,
        undefined,
        NaN,
        "",
        "hello",
        true
    ].forEach(num => {
        test(`should get 'Number.NEGATIVE_INFINITY' for '${num}'`, () => {
            expect(mindsmine.Number.getNullSafe(num)).toBe(Number.NEGATIVE_INFINITY);
        });
    });

    [
        100,
        -2500
    ].forEach(num => {
        test(`should get same number for '${num}'`, () => {
            expect(mindsmine.Number.getNullSafe(num)).toBe(num);
        });
    });
});

describe("mindsmine.Number.getNumOfDigits", () => {
    [
        [
            "null",
            null
        ],
        [
            "non-Number",
            "a"
        ]
    ].forEach(arr => {
        test(`should throw TypeError due to ${arr[0]}`, () => {
            function callFunction() {
                mindsmine.Number.getNumOfDigits(arr[1]);
            }

            expect(callFunction).toThrow(TypeError);
            expect(callFunction).toThrow("@ERROR_PERMITTED_NUMBER@");
        });
    });

    [
        [
            0,
            1
        ],
        [
            2,
            1
        ],
        [
            10,
            2
        ],
        [
            -12,
            2
        ],
        [
            123456,
            6
        ],
        [
            1234567890123456,
            16
        ]
    ].forEach(arr => {
        test(`should count number of digits for '${arr[0]}' to be '${arr[1]}'`, () => {
            expect(mindsmine.Number.getNumOfDigits(arr[0])).toBe(arr[1]);
        });
    });
});

describe("mindsmine.Number.isPerfectSquare", () => {
    [
        0,
        1,
        81,
        100,
        144
    ].forEach(num => {
        test(`should test that '${num}' is a perfect square`, () => {
            expect(mindsmine.Number.isPerfectSquare(num)).toBeTruthy();
        });
    });

    [
        5,
        NaN,
        null,
        101,
        1551
    ].forEach(num => {
        test(`should test that '${num}' is NOT a perfect square`, () => {
            expect(mindsmine.Number.isPerfectSquare(num)).toBeFalsy();
        });
    });
});

describe("mindsmine.Number.getUniqueRandomNumbers", () => {
    const lowerBound = 10;
    const upperBound = 81;
    const arraySize = 12;

    [
        [
            "null",
            null,
            null,
            null,
            TypeError,
            "@ERROR_PERMITTED_NUMBER@"
        ],
        [
            "non-Number",
            "a",
            upperBound,
            arraySize,
            TypeError,
            "@ERROR_PERMITTED_NUMBER@"
        ],
        [
            "negative 'lowerBound'",
            -1,
            upperBound,
            arraySize,
            Error,
            "Negative number is not allowed as an argument."
        ],
        [
            "negative 'upperBound'",
            lowerBound,
            -1,
            arraySize,
            Error,
            "Negative number is not allowed as an argument."
        ],
        [
            "negative 'arraySize'",
            lowerBound, upperBound, -1,
            Error,
            "Negative number is not allowed as an argument."
        ],
        [
            "'lowerBound' larger than 'upperBound'",
            upperBound, lowerBound, arraySize,
            Error,
            "Lower Bound cannot be larger than Upper Bound."
        ],
        [
            "not enough unique numbers",
            lowerBound, arraySize, upperBound,
            Error,
            "Not enough unique numbers available for the array size."
        ]
    ].forEach(arr => {
        test(`should throw ${arr[4].name} due to ${arr[0]}`, () => {
            function callFunction() {
                mindsmine.Number.getUniqueRandomNumbers(arr[1], arr[2], arr[3]);
            }

            expect(callFunction).toThrow(arr[4]);
            expect(callFunction).toThrow(arr[5]);
        });
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
