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

const mindsmine = require("../../../dist/@REQUIRE_FILE@");

test("mindsmine.productName should return product name", () => {
    expect(mindsmine.productName).toBe("mindsmine-js");
});

test("mindsmine.productVersion should return product version", () => {
    expect(mindsmine.productVersion).toBe("3.6.5");
});

const NOT_OBJECTS = [
    null,
    undefined,
    NaN
];

const ARRAYS = [
    [],
    [123],
    [123, 456]
];

const BOOLEANS = [
    true,
    false
];

const FUNCTIONS = [
    function() {}
];

const NUMBERS = [
    100,
    -2500
];

const OBJECTS = [
    {},
    {hello: "world"}
];

const STRINGS = [
    "Some String",
    "例子.测试"
];

const NOT_ARRAYS = [
    ...NOT_OBJECTS,
    ...BOOLEANS,
    ...FUNCTIONS,
    ...NUMBERS,
    ...OBJECTS,
    ...STRINGS
];

const NOT_BOOLEANS = [
    ...NOT_OBJECTS,
    ...ARRAYS,
    ...FUNCTIONS,
    ...NUMBERS,
    ...OBJECTS,
    ...STRINGS
];

const NOT_FUNCTIONS = [
    ...NOT_OBJECTS,
    ...ARRAYS,
    ...BOOLEANS,
    ...NUMBERS,
    ...OBJECTS,
    ...STRINGS
];

const NOT_NUMBERS = [
    ...NOT_OBJECTS,
    ...ARRAYS,
    ...BOOLEANS,
    ...FUNCTIONS,
    ...OBJECTS,
    ...STRINGS
];

const NOT_STRINGS = [
    ...NOT_OBJECTS,
    ...ARRAYS,
    ...BOOLEANS,
    ...FUNCTIONS,
    ...NUMBERS,
    ...OBJECTS
];

test("To avoid eslint from crapping out", () => {
    expect(NOT_OBJECTS).not.toBeNull();
    expect(ARRAYS).not.toBeNull();
    expect(BOOLEANS).not.toBeNull();
    expect(FUNCTIONS).not.toBeNull();
    expect(NUMBERS).not.toBeNull();
    expect(OBJECTS).not.toBeNull();
    expect(STRINGS).not.toBeNull();
    expect(NOT_ARRAYS).not.toBeNull();
    expect(NOT_BOOLEANS).not.toBeNull();
    expect(NOT_FUNCTIONS).not.toBeNull();
    expect(NOT_NUMBERS).not.toBeNull();
    expect(NOT_STRINGS).not.toBeNull();
});

//_CONCATENATED_HELPER_CODE