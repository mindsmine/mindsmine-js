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
import UglifyJS from "uglify-es";

import buildProperties from "./build.properties";

const minifiedCode = UglifyJS.minify(
    fs.readFileSync(buildProperties.folder.SOURCE.CONCATENATED_FILE, "utf8"),
    {
        ecma: 6,
        output: {
            comments: "/^!/"
        }
    }
);

if (minifiedCode.error) {
    throw minifiedCode.error;
}

const finalOutputFile = path.resolve(buildProperties.folder.ROOT.DIST, buildProperties.outputFile);

fs.writeFileSync(finalOutputFile, minifiedCode.code);
