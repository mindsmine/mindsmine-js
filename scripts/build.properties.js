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

const ROOT = {
    SRC: path.resolve(__dirname, "..", "..", "src"),
    TEST: path.resolve(__dirname, "..", "..", "test"),
    BUILD: path.resolve(__dirname, "..", "..", "build"),
    DIST: path.resolve(__dirname, "..", "..", "dist"),
    DOCS: path.resolve(__dirname, "..", "..", "docs")
}; 

export default {
    outputFile: OUTPUT_FILE,
    folder: {
        ROOT: ROOT,
        SOURCE: {
            CODE: path.resolve(ROOT.BUILD, "source", "code"),
            CODE_FILE: path.resolve(ROOT.BUILD, "source", "code", "index.js"),
            CODE_HELPER_FILE: path.resolve(ROOT.BUILD, "source", "code", "helper"),
            CONCATENATED: path.resolve(ROOT.BUILD, "source", "concatenated"),
            CONCATENATED_FILE: path.resolve(ROOT.BUILD, "source", "concatenated", "index.js"),
            CONCATENATED_HELPER_FILE: path.resolve(ROOT.BUILD, "source", "concatenated", "helper.js")
        },
        TEST: {
            CODE: path.resolve(ROOT.BUILD, "test", "code"),
            CODE_FILE: path.resolve(ROOT.BUILD, "test", "code", "index.test.js"),
            CODE_HELPER_FILE: path.resolve(ROOT.BUILD, "test", "code", "helper"),
            CONCATENATED: path.resolve(ROOT.BUILD, "test", "concatenated"),
            CONCATENATED_FILE: path.resolve(ROOT.BUILD, "test", "concatenated", "final.test.js"),
            CONCATENATED_HELPER_FILE: path.resolve(ROOT.BUILD, "test", "concatenated", "helper.test.js")
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
            "@JSDOC_DESTINATION_FOLDER@",
            `docs/mindsmine/js/${process.env.npm_package_version}`
        ],
        [
            "@JSDOC_README_FILE@",
            path.resolve(__dirname, "..", "..", "README.md")
        ],
        [
            "@JSDOC_INDEX_FILE@",
            "build/source/concatenated/index.js"
        ],
        [
            "@JSDOC_COPYRIGHT@",
            [
                "<div style='text-align: center;'>",
                `Copyright &#169; 2008, ${(new Date()).getFullYear()},`,
                "<strong><a target='_blank' href='http://www.shaiksphere.com'>Shaiksphere Inc</a></strong>.",
                "All rights reserved.",
                "</div>"
            ].join(" ")
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
