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

import fs from "fs";
import path from "path";

const jsdocConfJSON = {
    opts: {
        destination: `docs/${process.env.npm_package_version}`,
        encoding: "utf8"
    },
    plugins: [
        "plugins/markdown"
    ],
    source: {
        include: [
            "README.md",
            "build/source/concatenated/index.js"
        ]
    },
    templates: {
        default: {
            includeDate: false,
            outputSourceFiles: false,
            useLongnameInNav: true,
            layoutFile: "local.layout.tmpl"
        },
        cleverLinks: true,
        monospaceLinks: true
    }
};

fs.writeFileSync(
    path.resolve(process.cwd(), "build", "jsdoc.conf.json"),
    JSON.stringify(jsdocConfJSON),
    "utf8"
);
