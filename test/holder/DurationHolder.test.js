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

describe("mindsmine.DurationHolder", () => {
    const _durationHolderTest = new mindsmine.DurationHolder(8, 8, 23, 23),
        expectedString = "8 years 8 months 23 days 23 hours",
        expectedObj = {
            years: 8,
            months: 8,
            days: 23,
            hours: 23
        };

    test(`should return '${expectedString}' for displayString`, () => {
        expect(_durationHolderTest.displayString).toEqual(expectedString);
    });

    test("should return object for jsonNotation", () => {
        expect(_durationHolderTest.jsonNotation).toEqual(expect.objectContaining(expectedObj));
    });
});
