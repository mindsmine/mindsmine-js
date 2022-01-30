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

const _durationHolderTest = new mindsmine.DurationHolder(8, 8, 23, 23);

describe("mindsmine.DurationHolder", () => {
    test("should return 8 for years", () => {
        expect(_durationHolderTest.years).toEqual(8);
    });

    test("should return 8 for months", () => {
        expect(_durationHolderTest.months).toEqual(8);
    });

    test("should return 23 for days", () => {
        expect(_durationHolderTest.days).toEqual(23);
    });

    test("should return 23 for hours", () => {
        expect(_durationHolderTest.hours).toEqual(23);
    });

    test("should return 0 for minutes", () => {
        expect(_durationHolderTest.minutes).toEqual(0);
    });

    test("should return 0 for seconds", () => {
        expect(_durationHolderTest.seconds).toEqual(0);
    });

    test("should return 0 for milliseconds", () => {
        expect(_durationHolderTest.milliseconds).toEqual(0);
    });

    test("should return false for startAfterEnd by default", () => {
        expect(_durationHolderTest.startAfterEnd).toBeFalsy();
    });

    test("should return true for startAfterEnd", () => {
        _durationHolderTest.startAfterEnd = true;

        expect(_durationHolderTest.startAfterEnd).toBeTruthy();
    });
});
