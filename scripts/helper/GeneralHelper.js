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
    OUTPUT_FILE = `${process.env.npm_package_name}-${process.env.npm_package_version}.min.js`,

    __ROOT = process.cwd(),

    ROOT = {
        BUILD: path.resolve(__ROOT, "build"),
        DIST: path.resolve(__ROOT, "dist"),
        DOCS: path.resolve(__ROOT, "docs"),
        SRC: path.resolve(__ROOT, "src"),
        TEST: path.resolve(__ROOT, "test")
    },
    MDN_DOCS_URI = "https://developer.mozilla.org/en-US/docs",
    MDN_WEB_URI = `${MDN_DOCS_URI}/Web`;

class folderRouters {
    constructor(rootFolder, concatenatedHelperName, concatenatedHolderName, codeIndexFileName, concatenatedIndexFileName) {
        class innerClass {
            constructor(rootFolder, rootInnerFolder, helperName, holderName, indexFileName) {
                this.ROOT = path.resolve(ROOT.BUILD, rootFolder, rootInnerFolder);
                this.HELPER = path.resolve(this.ROOT, helperName);
                this.HOLDER = path.resolve(this.ROOT, holderName);
                this.INDEX_FILE = path.resolve(this.ROOT, indexFileName);
                this.POLYFILL_FILE = path.resolve(this.ROOT, "polyfill.js");
            }
        }

        this.CODE = new innerClass(rootFolder, "code", "helper", "holder", codeIndexFileName);
        this.CONCATENATED = new innerClass(rootFolder, "concatenated", concatenatedHelperName, concatenatedHolderName, concatenatedIndexFileName);
    }
}

export default {
    minifiedFilename: path.resolve(ROOT.DIST, OUTPUT_FILE),
    folder: {
        ROOT: ROOT,
        SOURCE: new folderRouters("source", "helper.js", "holder.js", "index.js", "index.js"),
        TEST: new folderRouters("test", "helper.test.js", "holder.test.js", "index.test.js", "final.test.js")
    },
    replaceToken: {
        POLYFILL_CODE: "//_POLYFILL_CODE",
        HOLDER_CODE: "//_CONCATENATED_HOLDER_CODE",
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
            "@MDN_GLOSSARY_URI@",
            `${MDN_DOCS_URI}/Glossary`
        ],
        [
            "@MDN_WEB_URI@",
            MDN_WEB_URI
        ],
        [
            "@MDN_API_URI@",
            `${MDN_WEB_URI}/API`
        ],
        [
            "@MDN_JS_URI@",
            `${MDN_WEB_URI}/JavaScript/Reference/Global_Objects`
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
