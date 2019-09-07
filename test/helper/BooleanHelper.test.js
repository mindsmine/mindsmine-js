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

const NOT_BOOLEAN = [
    null,
    undefined,
    NaN,
    0,
    -2500,
    "",
    "true",
    function() {},
    [],
    {}
];

describe("mindsmine.Boolean.getNullSafe", () => {
    NOT_BOOLEAN.forEach(bool => {
        test(`should get 'false' for '${bool}'`, () => {
            expect(mindsmine.Boolean.getNullSafe(bool)).toBeFalsy();
        });
    });

    test("should get same value for 'true'", () => {
        expect(mindsmine.Boolean.getNullSafe(true)).toBeTruthy();
    });

    test("should get same value for 'false'", () => {
        expect(mindsmine.Boolean.getNullSafe(false)).toBeFalsy();
    });
});
