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

describe("mindsmine.Duration constants", () => {
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
    
    test("mindsmine.Duration.MINUTES_IN_HOUR should be 60", () => {
        expect(mindsmine.Duration.MINUTES_IN_HOUR).toEqual(60);
    });
    
    test("mindsmine.Duration.MINUTES_IN_DAY should be 1,440", () => {
        expect(mindsmine.Duration.MINUTES_IN_DAY).toEqual(1440);
    });
    
    test("mindsmine.Duration.MINUTES_IN_WEEK should be 10,080", () => {
        expect(mindsmine.Duration.MINUTES_IN_WEEK).toEqual(10080);
    });
    
    test("mindsmine.Duration.HOURS_IN_DAY should be 24", () => {
        expect(mindsmine.Duration.HOURS_IN_DAY).toEqual(24);
    });
    
    test("mindsmine.Duration.HOURS_IN_WEEK should be 168", () => {
        expect(mindsmine.Duration.HOURS_IN_WEEK).toEqual(168);
    });
    
    test("mindsmine.Duration.DAYS_IN_WEEK should be 7", () => {
        expect(mindsmine.Duration.DAYS_IN_WEEK).toEqual(7);
    });
    
    test("mindsmine.Duration.MONTHS_IN_YEAR should be 12", () => {
        expect(mindsmine.Duration.MONTHS_IN_YEAR).toEqual(12);
    });
});

describe("mindsmine.Duration.humanreadable", () => {
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
                mindsmine.Duration.humanreadable(arr[1], arr[2]);
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
                mindsmine.Duration.humanreadable(arr[1], arr[2]);
            }

            expect(callFunction).toThrow(RangeError);
            expect(callFunction).toThrow("Fatal Error. 'duration'. Duration should be a non-zero positive number.");
        });
    });

    test("should throw RangeError due to unsupported unit", () => {
        function callFunction() {
            mindsmine.Duration.humanreadable(100, "hello");
        }
        expect(callFunction).toThrow(RangeError);
        expect(callFunction).toThrow("Fatal Error. 'unit'. Unsupported 'hello' argument");
    });

    [
        [
            "2 years",
            730,
            "d"
        ],
        [
            "2 years",
            730,
            "day"
        ],
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
            "M"
        ],
        [
            "1 year",
            12,
            "month"
        ],
        [
            "1 year",
            12,
            "months"
        ],
        [
            "1 year",
            52,
            "w"
        ],
        [
            "1 year",
            52,
            "week"
        ],
        [
            "1 year",
            52,
            "weeks"
        ],
        [
            "1 second",
            1,
            "s"
        ],
        [
            "1 minute",
            1,
            "m"
        ],
        [
            "1 hour",
            1,
            "h"
        ],
        [
            "1 day",
            1,
            "d"
        ],
        [
            "7 days",
            1,
            "w"
        ],
        [
            "1 month",
            1,
            "M"
        ],
        [
            "1 year",
            1,
            "y"
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
            "14 days",
            2,
            "w"
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
            expect(mindsmine.Duration.humanreadable(arr[1], arr[2]).displayString).toEqual(arr[0]);
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
            expect(mindsmine.Duration.humanreadable(arr[1]).displayString).toEqual(arr[0]);
        });
    });

    test("should return the object", () => {
        const _durationHolder = mindsmine.Duration.humanreadable(273452400000, "ms").jsonNotation;

        expect(_durationHolder.years).toEqual(8);
        expect(_durationHolder.months).toEqual(8);
        expect(_durationHolder.days).toEqual(4);
        expect(_durationHolder.hours).toEqual(23);
    });
});

describe("mindsmine.Duration.preciseDiff", () => {
    test("should throw TypeError due to null start date", () => {
        function callFunction() {
            mindsmine.Duration.preciseDiff(null, new Date());
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'startDate'. @ERROR_PERMITTED_DATE@");
    });

    test("should throw TypeError due to null end date", () => {
        function callFunction() {
            mindsmine.Duration.preciseDiff(new Date(), null);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'endDate'. @ERROR_PERMITTED_DATE@");
    });

    test("should return first date is later", () => {
        const d1 = new Date();
        const d2 = new Date(2021, 0, 20);

        expect(mindsmine.Duration.preciseDiff(d1, d2).startAfterEnd).toBeTruthy();
    });

    test("should return not be first date is later", () => {
        const d1 = new Date(2021, 0, 20);
        const d2 = new Date();

        expect(mindsmine.Duration.preciseDiff(d1, d2).startAfterEnd).toBeFalsy();
    });

    test("should return precise difference", () => {
        const expectedResult = "11 years 7 months 26 days";

        const d1 = new Date(2008, 6, 12); // 07/12/2008
        const d2 = new Date(2020, 2, 7);  // 03/07/2020

        expect(mindsmine.Duration.preciseDiff(d1, d2).displayString).toEqual(expectedResult);
    });
});

describe("mindsmine.Duration.crudeDiff", () => {
    test("should throw TypeError due to null start date", () => {
        function callFunction() {
            mindsmine.Duration.crudeDiff(null, new Date());
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'startDate'. @ERROR_PERMITTED_DATE@");
    });

    test("should throw TypeError due to null end date", () => {
        function callFunction() {
            mindsmine.Duration.crudeDiff(new Date(), null);
        }

        expect(callFunction).toThrow(TypeError);
        expect(callFunction).toThrow("Fatal Error. 'endDate'. @ERROR_PERMITTED_DATE@");
    });

    test("should return first date is later", () => {
        const d1 = new Date();
        const d2 = new Date(2021, 0, 20);

        expect(mindsmine.Duration.crudeDiff(d1, d2).startAfterEnd).toBeTruthy();
    });

    test("should return not be first date is later", () => {
        const d1 = new Date(2021, 0, 20);
        const d2 = new Date();

        expect(mindsmine.Duration.crudeDiff(d1, d2).startAfterEnd).toBeFalsy();
    });

    /*
    test("should return precise difference", () => {
        const expectedResult = "11 years 7 months 26 days";

        const d1 = new Date(2008, 6, 12); // 07/12/2008
        const d2 = new Date(2020, 2, 7);  // 03/07/2020

        expect(mindsmine.Duration.crudeDiff(d1, d2).displayString).toEqual(expectedResult);
    });
    //*/
});
