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
import UglifyJS from "uglify-es";

import BuildProperties from "./helper/GeneralHelper";
import Console from "./helper/ConsoleHelper";
import FileSystem from "./helper/FileSystemHelper";

FileSystem.mkdir(BuildProperties.path.ROOT.DIST);
FileSystem.mkdir(BuildProperties.path.SOURCE.CONCATENATED.ROOT);
Console.info("Created necessary folder(s)");

FileSystem.copy(
    BuildProperties.path.ROOT.SRC,
    BuildProperties.path.SOURCE.CODE.ROOT
);
Console.info("Copied source code into build folder");

FileSystem.concat(
    BuildProperties.path.SOURCE.CODE.HELPER,
    BuildProperties.path.SOURCE.CONCATENATED.HELPER,
    FileSystem.Filter.JS
);
Console.info("Concatenated all helper files");

FileSystem.copy(
    BuildProperties.path.SOURCE.CODE.INDEX_FILE,
    BuildProperties.path.SOURCE.CONCATENATED.INDEX_FILE
);
Console.info("Copied index file to concat folder");

FileSystem.replace(
    BuildProperties.path.SOURCE.CONCATENATED.INDEX_FILE,
    BuildProperties.replaceToken.HELPER_CODE,
    fs.readFileSync(
        BuildProperties.path.SOURCE.CONCATENATED.HELPER,
        "utf8"
    )
);

BuildProperties.replaceArray.forEach(arr => {
    FileSystem.replace(
        BuildProperties.path.SOURCE.CONCATENATED.INDEX_FILE,
        arr[0],
        arr[1]
    );
});
Console.info("Replaced all tokens with respective values in index file");

const minifiedCode = UglifyJS.minify(
    fs.readFileSync(BuildProperties.folder.SOURCE.CONCATENATED_FILE, "utf8"),
    {
        ecma: 6,
        output: {
            comments: "/^!/"
        }
    }
);

if (minifiedCode.error) {
    Console.error("Uglifying the code FAILED");

    throw minifiedCode.error;
}

fs.writeFileSync(BuildProperties.uglifiedFilename, minifiedCode.code);

Console.info("Uglifying the code COMPLETED");
