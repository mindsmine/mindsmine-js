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

describe("isFunction", () => {
    it("should test that the object is a Function", () => {
        expect(mindsmine.Function.isFunction(null)).toBeFalsy();
        expect(mindsmine.Function.isFunction(undefined)).toBeFalsy();
        expect(mindsmine.Function.isFunction(NaN)).toBeFalsy();
        expect(mindsmine.Function.isFunction(100)).toBeFalsy();
        expect(mindsmine.Function.isFunction("")).toBeFalsy();
        expect(mindsmine.Function.isFunction("hello")).toBeFalsy();
        expect(mindsmine.Function.isFunction(true)).toBeFalsy();
        expect(mindsmine.Function.isFunction(function() {})).toBeTruthy();
        expect(mindsmine.Function.isFunction({})).toBeFalsy();
    });
});
