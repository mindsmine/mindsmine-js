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

describe("mindsmine.Date.isDate", () => {
    NOT_DATES.forEach(date => {
        test(`should test that '${date}' is NOT a date`, () => {
            expect(mindsmine.Date.isDate(date)).toBeFalsy();
        });
    });

    DATES.forEach(date => {
        test(`should test that '${date}' is a date`, () => {
            expect(mindsmine.Date.isDate(date)).toBeTruthy();
        });
    });
});
