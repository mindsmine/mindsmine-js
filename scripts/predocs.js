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

import BuildProperties from "./helper/GeneralHelper";

const jsdocConfJSON = {
    opts: {
        destination: `docs/mindsmine/js/${process.env.npm_package_version}`,
        template: "./node_modules/ink-docstrap/template"
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
        navType: "inline",
        includeDate: false,
        collapseSymbols: true,
        theme: "flatly",
        cleverLinks: true,
        monospaceLinks: true,
        outputSourceFiles: false,
        syntaxTheme: "dark",
        systemName: process.env.npm_package_name,
        copyright: [
            "<div style='text-align: center;'>",
            `Copyright &#169; 2008, ${(new Date()).getFullYear()},`,
            "<strong><a target='_blank' href='http://www.shaiksphere.com'>Shaiksphere Inc</a></strong>.",
            "All rights reserved.",
            "</div>"
        ].join(" ")
    }
};

fs.writeFileSync(
    path.resolve(BuildProperties.path.ROOT.BUILD, "jsdoc.conf.json"),
    JSON.stringify(jsdocConfJSON),
    "utf8"
);
