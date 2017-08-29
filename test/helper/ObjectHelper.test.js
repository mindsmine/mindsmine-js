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

describe("getKey", () => {
    it("should retrieve the key from the value", () => {
        let obj1 = { "key1" : "value1", "key2" : "value2"};

        expect(mindsmine.Object.getKey(obj1, "value1")).toBe("key1");
        expect(mindsmine.Object.getKey(obj1, "value2")).toBe("key2");
        expect(mindsmine.Object.getKey(obj1, "value3")).toBe(null);
    });
});

describe("isPrimitive", () => {
    it("should check for primitive data types", () => {
        expect(mindsmine.Object.isPrimitive(123)).toBeTruthy();
        expect(mindsmine.Object.isPrimitive("")).toBeTruthy();
        expect(mindsmine.Object.isPrimitive(false)).toBeTruthy();
        expect(mindsmine.Object.isPrimitive({})).toBeFalsy();
        expect(mindsmine.Object.isPrimitive([])).toBeFalsy();
        expect(mindsmine.Object.isPrimitive(null)).toBeFalsy();
    });
});

describe("isEmpty", () => {
    it("should check for empty objects", () => {
        expect(mindsmine.Object.isEmpty(null)).toBeFalsy();
        expect(mindsmine.Object.isEmpty(undefined)).toBeFalsy();
        expect(mindsmine.Object.isEmpty(NaN)).toBeFalsy();
        expect(mindsmine.Object.isEmpty(100)).toBeFalsy();
        expect(mindsmine.Object.isEmpty("")).toBeFalsy();
        expect(mindsmine.Object.isEmpty("hello")).toBeFalsy();
        expect(mindsmine.Object.isEmpty(true)).toBeFalsy();
        expect(mindsmine.Object.isEmpty(function() {})).toBeFalsy();
        expect(mindsmine.Object.isEmpty([])).toBeFalsy();
        expect(mindsmine.Object.isEmpty({})).toBeTruthy();
    });
});

describe("getNullSafe", () => {
    it("should get null safe objects", () => {
        let obj1 = { "key1" : "value1", "key2" : "value2"},
            obj2 = null;

        expect(mindsmine.Object.getNullSafe(obj1)).toEqual({ "key1" : "value1", "key2" : "value2"});
        expect(mindsmine.Object.getNullSafe(obj2)).toEqual({});
    });
});
