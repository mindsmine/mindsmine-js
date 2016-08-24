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

const ATTR_DELETE = [
    "repository",
    "engine-strict",
    "engines",
    "scripts",
    "devDependencies"
];

export function getPackageJSON() {
    delete require.cache[require.resolve("./package.json")];

    let _packageJSON = require("./package.json");

    ATTR_DELETE.forEach((attr) => {
        delete _packageJSON[attr];
    });

    return _packageJSON;
}

export function handleError(source) {
    return function (err) {
        console.error(`Error generated during '${source}' step.`, err.toString());
    }
}

export default {
    replaceMap: {
        ARRAY: {
            token: "@ERROR_PERMITTED_ARRAY@",
            value: "Only non-empty array(s) are allowed as arguments."
        },
        BOOLEAN: {
            token: "@ERROR_PERMITTED_BOOLEAN@",
            value: "Only non-empty boolean value(s) are allowed as arguments."
        },
        FUNCTION: {
            token: "@ERROR_PERMITTED_FUNCTION@",
            value: "Only non-empty function(s) are allowed as arguments."
        },
        NUMBER: {
            token: "@ERROR_PERMITTED_NUMBER@",
            value: "Only non-empty number(s) are allowed as arguments."
        },
        OBJECT: {
            token: "@ERROR_PERMITTED_OBJECT@",
            value: "Only valid object(s) are allowed as arguments."
        },
        STRING: {
            token: "@ERROR_PERMITTED_STRING@",
            value: "Only non-empty string(s) are allowed as arguments."
        }
    }
}
