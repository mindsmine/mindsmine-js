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

import path from "path";

const NOW = new Date(),
    TIMESTAMP = NOW.toISOString().replace(/[-:]/g, "").replace(/T/g, ".").replace(/.[0-9]+Z/g, ""),
    OUTPUT_FILE = `${process.env.npm_package_name}-${process.env.npm_package_version}.min.js`;

const __ROOT = path.resolve(__dirname, "..", "..", "..");

const ROOT = {
    BUILD: path.resolve(__ROOT, "build"),
    DIST: path.resolve(__ROOT, "dist"),
    DOCS: path.resolve(__ROOT, "docs"),
    SCRIPTS: path.resolve(__ROOT, "scripts"),
    SRC: path.resolve(__ROOT, "src"),
    TEST: path.resolve(__ROOT, "test")
};

const SOURCE_ROOT = path.resolve(ROOT.BUILD, "source");
const TEST_ROOT = path.resolve(ROOT.BUILD, "test");

const SOURCE_CODE_ROOT = path.resolve(SOURCE_ROOT, "code");
const TEST_CODE_ROOT = path.resolve(TEST_ROOT, "code");

const SOURCE_CONCATENATED_ROOT = path.resolve(SOURCE_ROOT, "concatenated");
const TEST_CONCATENATED_ROOT = path.resolve(TEST_ROOT, "concatenated");

export default {
    uglifiedFilename: path.resolve(ROOT.DIST, OUTPUT_FILE),
    path: {
        ROOT: ROOT
    },
    folder: {
        ROOT: ROOT,
        SOURCE: {
            CODE: SOURCE_CODE_ROOT,
            CODE_FILE: path.resolve(SOURCE_CODE_ROOT, "index.js"),
            CODE_HELPER_FILE: path.resolve(SOURCE_CODE_ROOT, "helper"),
            CONCATENATED: SOURCE_CONCATENATED_ROOT,
            CONCATENATED_FILE: path.resolve(SOURCE_CONCATENATED_ROOT, "index.js"),
            CONCATENATED_HELPER_FILE: path.resolve(SOURCE_CONCATENATED_ROOT, "helper.js")
        },
        TEST: {
            CODE: TEST_CODE_ROOT,
            CODE_FILE: path.resolve(TEST_CODE_ROOT, "index.test.js"),
            CODE_HELPER_FILE: path.resolve(TEST_CODE_ROOT, "helper"),
            CONCATENATED: TEST_CONCATENATED_ROOT,
            CONCATENATED_FILE: path.resolve(TEST_CONCATENATED_ROOT, "final.test.js"),
            CONCATENATED_HELPER_FILE: path.resolve(TEST_CONCATENATED_ROOT, "helper.test.js")
        }
    },
    replaceArray: [
        [
            "@REQUIRE_FILE@",
            OUTPUT_FILE
        ],
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
            process.env.npm_package_homepage
        ],
        [
            "@PRODUCT_NAME@",
            process.env.npm_package_name
        ],
        [
            "@PRODUCT_VERSION@",
            process.env.npm_package_version
        ],
        [
            "@MDN_API_URI@",
            "https://developer.mozilla.org/en-US/docs/Web/API"
        ],
        [
            "@MDN_JS_URI@",
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"
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
};
