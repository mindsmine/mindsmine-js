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

"use strict";

import path from "path";

const NOW = new Date(),
    TIMESTAMP = NOW.toISOString().replace(/[-:]/g, "").replace(/T/g, ".").replace(/.[0-9]+Z/g, ""),
    OUTPUT_FILE = `${process.env.npm_package_name}-${process.env.npm_package_version}.min.js`;

const __ROOT = process.cwd();

const ROOT = {
    BUILD: path.resolve(__ROOT, "build"),
    DIST: path.resolve(__ROOT, "dist"),
    DOCS: path.resolve(__ROOT, "docs"),
    SCRIPTS: path.resolve(__ROOT, "scripts"),
    SRC: path.resolve(__ROOT, "src"),
    TEST: path.resolve(__ROOT, "test")
};

class folderRouters {
    constructor(rootFolder, codeHelperName, concatenatedHelperName, codeIndexFileName, concatenatedIndexFileName) {
        class innerClass {
            constructor(rootFolder, rootInnerFolder, helperName, indexFileName) {
                this.ROOT = path.resolve(ROOT.BUILD, rootFolder, rootInnerFolder);
                this.HELPER = path.resolve(this.ROOT, helperName);
                this.INDEX_FILE = path.resolve(this.ROOT, indexFileName);
            }
        }

        this.CODE = new innerClass(rootFolder, "code", codeHelperName, codeIndexFileName);
        this.CONCATENATED = new innerClass(rootFolder, "concatenated", concatenatedHelperName, concatenatedIndexFileName);
    }
}

export default {
    minifiedFilename: path.resolve(ROOT.DIST, OUTPUT_FILE),
    folder: {
        ROOT: ROOT,
        SOURCE: new folderRouters("source", "helper", "helper.js", "index.js", "index.js"),
        TEST: new folderRouters("test", "helper", "helper.test.js", "index.test.js", "final.test.js")
    },
    replaceToken: {
        HELPER_CODE: "//_CONCATENATED_HELPER_CODE"
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
            "@WIKI_URI@",
            "https://en.wikipedia.org/wiki"
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
