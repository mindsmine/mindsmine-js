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
import { minify } from "terser";

import BuildProperties from "./helper/GeneralHelper.js";
import Console from "./helper/ConsoleHelper.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

Console.newline();
Console.began(__filename);

minify(
    fs.readFileSync(BuildProperties.folder.SOURCE.CONCATENATED.INDEX_FILE, "utf8"),
    {
        ecma: 2020,
        format: {
            comments: "/^!/"
        }
    }
).then(minifiedCode => {
    fs.writeFileSync(BuildProperties.minifiedFilename, minifiedCode.code);
}).catch(minifiedCode => {
    Console.error("Minifying the code FAILED");

    throw minifiedCode.error;
});

Console.info("Minifying the code COMPLETED");

Console.ended(__filename);
