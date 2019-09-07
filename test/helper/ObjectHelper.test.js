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

test("mindsmine.Object.getKey should retrieve the key from the value", () => {
    let obj1 = { "key1" : "value1", "key2" : "value2"};

    expect(mindsmine.Object.getKey(obj1, "value1")).toEqual("key1");
    expect(mindsmine.Object.getKey(obj1, "value2")).toEqual("key2");
    expect(mindsmine.Object.getKey(obj1, "value3")).toBeNull();
});

describe("mindsmine.Object.isPrimitive", () => {
    NOT_PRIMITIVE_OBJECTS.forEach(obj => {
        test(`should test that '${obj}' is NOT Primitive`, () => {
            expect(mindsmine.Object.isPrimitive(obj)).toBeFalsy();
        });
    });

    PRIMITIVE_OBJECTS.forEach(obj => {
        test(`should test that '${obj}' is Primitive`, () => {
            expect(mindsmine.Object.isPrimitive(obj)).toBeTruthy();
        });
    });
});

test("mindsmine.Object.isEmpty should check for empty objects", () => {
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

test("mindsmine.Object.getNullSafe should get null safe objects", () => {
    let obj1 = { "key1" : "value1", "key2" : "value2"},
        obj2 = null;

    expect(mindsmine.Object.getNullSafe(obj1)).toEqual(expect.objectContaining(obj1));
    expect(mindsmine.Object.getNullSafe(obj2)).toEqual({});
});
