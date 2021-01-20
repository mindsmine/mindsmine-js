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
    expect(mindsmine.productVersion).toBe("4.5.0");
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

const DATES = [
    new Date(),
    new Date(1990, 1, 20)
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

const PRIMITIVE_OBJECTS = [
    ...NOT_OBJECTS,
    ...BOOLEANS,
    ...NUMBERS,
    ...STRINGS
];

const NOT_PRIMITIVE_OBJECTS = [
    ...ARRAYS,
    ...DATES,
    ...FUNCTIONS,
    ...OBJECTS
];

const NOT_EMPTY_OBJECTS = [
    ...PRIMITIVE_OBJECTS,
    ...ARRAYS,
    ...DATES,
    ...FUNCTIONS,
    {hello: "world"}
];

const NOT_ARRAYS = [
    ...PRIMITIVE_OBJECTS,
    ...DATES,
    ...FUNCTIONS,
    ...OBJECTS
];

const NOT_BOOLEANS = [
    ...NOT_OBJECTS,
    ...NOT_PRIMITIVE_OBJECTS,
    ...NUMBERS,
    ...STRINGS
];

const NOT_DATES = [
    ...PRIMITIVE_OBJECTS,
    ...ARRAYS,
    ...FUNCTIONS,
    ...OBJECTS
];

const NOT_FUNCTIONS = [
    ...PRIMITIVE_OBJECTS,
    ...ARRAYS,
    ...DATES,
    ...OBJECTS
];

const NOT_NUMBERS = [
    ...NOT_OBJECTS,
    ...NOT_PRIMITIVE_OBJECTS,
    ...BOOLEANS,
    ...STRINGS
];

const NOT_STRINGS = [
    ...NOT_OBJECTS,
    ...NOT_PRIMITIVE_OBJECTS,
    ...BOOLEANS,
    ...NUMBERS
];

test("To avoid eslint from crapping out", () => {
    expect(NOT_PRIMITIVE_OBJECTS).not.toBeNull();
    expect(NOT_EMPTY_OBJECTS).not.toBeNull();
    expect(NOT_ARRAYS).not.toBeNull();
    expect(NOT_BOOLEANS).not.toBeNull();
    expect(NOT_DATES).not.toBeNull();
    expect(NOT_FUNCTIONS).not.toBeNull();
    expect(NOT_NUMBERS).not.toBeNull();
    expect(NOT_STRINGS).not.toBeNull();
});

//_CONCATENATED_HELPER_CODE