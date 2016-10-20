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

const NOW = new Date(),
    TIMESTAMP = NOW.toISOString().replace(/[-:]/g, "").replace(/T/g, ".").replace(/.[0-9]+Z/g, ""),
    ATTR_DELETE = [
        "repository",
        "engine-strict",
        "engines",
        "scripts",
        "devDependencies"
    ],
    FOLDER = {
        SRC: "src",
        TEST: "test",
        BUILD: "build",
        DIST: "dist",
        DOCS: "docs"
    },
    PACKAGE_JSON = (function () {
        delete require.cache[require.resolve("./package.json")];

        let _packageJSON = require("./package.json");

        ATTR_DELETE.forEach((attr) => {
            delete _packageJSON[attr];
        });

        return _packageJSON;
    })();

export function handleError(sourceTask, sourceStep) {
    return function (err) {
        console.error(`Error during the '${sourceStep}' step under the '${sourceTask} task'.`, err.toString());
    }
}

export default {
    outputFile: `${PACKAGE_JSON.name}-${PACKAGE_JSON.version}.min.js`,
    folder: FOLDER,
    replaceArray: [
        [
            "@BUILD_TIMESTAMP@",
            TIMESTAMP
        ],
        [
            "@BUILD_YEAR@",
            NOW.getFullYear()
        ],
        [
            "@COMPANY_LINK@",
            PACKAGE_JSON.homepage
        ],
        [
            "@PRODUCT_NAME@",
            PACKAGE_JSON.name
        ],
        [
            "@PRODUCT_VERSION@",
            PACKAGE_JSON.version
        ],
        [
            "@ERROR_PERMITTED_ARRAY@",
            "Only non-empty array(s) are allowed as arguments."
        ],
        [
            "@ERROR_PERMITTED_BOOLEAN@",
            "Only non-empty boolean value(s) are allowed as arguments."
        ],
        [
            "@ERROR_PERMITTED_FUNCTION@",
            "Only non-empty function(s) are allowed as arguments."
        ],
        [
            "@ERROR_PERMITTED_NUMBER@",
            "Only non-empty number(s) are allowed as arguments."
        ],
        [
            "@ERROR_PERMITTED_OBJECT@",
            "Only valid object(s) are allowed as arguments."
        ],
        [
            "@ERROR_PERMITTED_STRING@",
            "Only non-empty string(s) are allowed as arguments."
        ]
    ]
}