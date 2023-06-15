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
    expect(mindsmine.productVersion).toBe("4.9.0");
});

//_MORE_CODE

//_CONCATENATED_HOLDER_CODE

//_CONCATENATED_HELPER_CODE
