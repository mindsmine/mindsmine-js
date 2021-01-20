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

test("mindsmine.Duration.SECONDS_IN_MINUTE should be 60", () => {
    expect(mindsmine.Duration.SECONDS_IN_MINUTE).toEqual(60);
});

test("mindsmine.Duration.SECONDS_IN_HOUR should be 3,600", () => {
    expect(mindsmine.Duration.SECONDS_IN_HOUR).toEqual(3600);
});

test("mindsmine.Duration.SECONDS_IN_DAY should be 86,400", () => {
    expect(mindsmine.Duration.SECONDS_IN_DAY).toEqual(86400);
});

test("mindsmine.Duration.SECONDS_IN_WEEK should be 604,800", () => {
    expect(mindsmine.Duration.SECONDS_IN_WEEK).toEqual(604800);
});

test("mindsmine.Duration.MILLISECONDS_IN_SECOND should be 1,000", () => {
    expect(mindsmine.Duration.MILLISECONDS_IN_SECOND).toEqual(1000);
});

test("mindsmine.Duration.MILLISECONDS_IN_MINUTE should be 60,000", () => {
    expect(mindsmine.Duration.MILLISECONDS_IN_MINUTE).toEqual(60000);
});

test("mindsmine.Duration.MILLISECONDS_IN_HOUR should be 3,600,000", () => {
    expect(mindsmine.Duration.MILLISECONDS_IN_HOUR).toEqual(3600000);
});

test("mindsmine.Duration.MILLISECONDS_IN_DAY should be 86,400,000", () => {
    expect(mindsmine.Duration.MILLISECONDS_IN_DAY).toEqual(86400000);
});

test("mindsmine.Duration.MILLISECONDS_IN_WEEK should be 604,800,000", () => {
    expect(mindsmine.Duration.MILLISECONDS_IN_WEEK).toEqual(604800000);
});

test("mindsmine.Duration.MILLISECONDS_IN_MONTH should be 2,592,000,000", () => {
    expect(mindsmine.Duration.MILLISECONDS_IN_MONTH).toEqual(2592000000);
});

test("mindsmine.Duration.MILLISECONDS_IN_YEAR should be 31,536,000,000", () => {
    expect(mindsmine.Duration.MILLISECONDS_IN_YEAR).toEqual(31536000000);
});

describe("mindsmine.Duration.humanize", () => {
    [
        [
            "null duration",
            null,
            null,
            "Fatal Error. 'duration'. @ERROR_PERMITTED_NUMBER@"
        ],
        [
            "invalid duration",
            "hello",
            null,
            "Fatal Error. 'duration'. @ERROR_PERMITTED_NUMBER@"
        ],
        [
            "null unit",
            100,
            null,
            "Fatal Error. 'unit'. @ERROR_PERMITTED_STRING@"
        ]
    ].forEach(arr => {
        test(`should throw TypeError due to ${arr[0]}`, () => {
            function callFunction() {
                mindsmine.Duration.humanize(arr[1], arr[2]);
            }

            expect(callFunction).toThrow(TypeError);
            expect(callFunction).toThrow(arr[3]);
        });
    });

    [
        [
            "zero duration",
            0,
            "day"
        ],
        [
            "negative duration",
            -100,
            "day"
        ]
    ].forEach(arr => {
        test(`should throw RangeError due to ${arr[0]}`, () => {
            function callFunction() {
                mindsmine.Duration.humanize(arr[1], arr[2]);
            }

            expect(callFunction).toThrow(RangeError);
            expect(callFunction).toThrow("Fatal Error. 'duration'. Duration should be a non-zero positive number.");
        });
    });

    test("should throw RangeError due to unsupported unit", () => {
        function callFunction() {
            mindsmine.Duration.humanize(100, "hello");
        }
        expect(callFunction).toThrow(RangeError);
        expect(callFunction).toThrow("Fatal Error. 'unit'. Unsupported 'hello' argument");
    });

    [
        [
            "2 years",
            730,
            "days"
        ],
        [
            "2 years 9 months",
            1000,
            "days"
        ],
        [
            "1 year",
            12,
            "months"
        ],
        [
            "1 year",
            52,
            "weeks"
        ],
        [
            "1 month",
            31,
            "day"
        ],
        [
            "1 year",
            365,
            "days"
        ],
        [
            "1 year",
            366,
            "days"
        ],
        [
            "7 days",
            604800,
            "second"
        ]
    ].forEach(arr => {
        test(`should return '${arr[0]}' for '${arr[1]} ${arr[2]}'`, () => {
            expect(mindsmine.Duration.humanize(arr[1], arr[2]).durationString).toEqual(arr[0]);
        });
    });

    [
        [
            "1 second",
            1000
        ],
        [
            "8 years 8 months 4 days 23 hours",
            273452400000
        ]
    ].forEach(arr => {
        test(`should return '${arr[0]}' for '${arr[1]}'`, () => {
            expect(mindsmine.Duration.humanize(arr[1]).durationString).toEqual(arr[0]);
        });
    });

    test("should return the object", () => {
        const humanisedDuration = mindsmine.Duration.humanize(273452400000, "ms");

        expect(humanisedDuration.durationRawObject.years).toEqual(8);
        expect(humanisedDuration.durationRawObject.months).toEqual(8);
        expect(humanisedDuration.durationRawObject.days).toEqual(4);
        expect(humanisedDuration.durationRawObject.hours).toEqual(23);
    });
});
