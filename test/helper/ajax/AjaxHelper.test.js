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

describe("DEFAULT_TIMEOUT", () => {
    it("should be fixed to two minutes", () => {
        expect(mindsmine.Ajax.DEFAULT_TIMEOUT).toEqual(120000);
    });
});

describe("DEFAULT_ASYNC", () => {
    it("should be true", () => {
        expect(mindsmine.Ajax.DEFAULT_ASYNC).toBeTruthy();
    });
});

describe("DEFAULT_WITH_CREDENTIALS", () => {
    it("should be false", () => {
        expect(mindsmine.Ajax.DEFAULT_WITH_CREDENTIALS).toBeFalsy();
    });
});

describe("DEFAULT_SCOPE", () => {
    it("should be window", () => {
        expect(mindsmine.Ajax.DEFAULT_SCOPE).toEqual(window);
    });
});

describe("ALLOWED_METHODS", () => {
    const expected = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];

    it("should match the expected array of HTTP methods", () => {
        expect(mindsmine.Ajax.ALLOWED_METHODS).toEqual(expect.arrayContaining(expected));
    });
});
