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

import BuildProperties from "./helper/GeneralHelper";
import Console from "./helper/ConsoleHelper";
import FileSystem from "./helper/FileSystemHelper";

Console.newline();
Console.began(__filename);

FileSystem.mkdir(BuildProperties.path.TEST.CONCATENATED.ROOT);
Console.info("Created necessary folder(s)");

FileSystem.copy(
    BuildProperties.path.ROOT.TEST,
    BuildProperties.path.TEST.CODE.ROOT
);
Console.info("Copied test code into build folder");

FileSystem.concat(
    BuildProperties.path.TEST.CODE.HELPER,
    BuildProperties.path.TEST.CONCATENATED.HELPER,
    FileSystem.Filter.JS
);
Console.info("Concatenated all helper files");

FileSystem.copy(
    BuildProperties.path.TEST.CODE.INDEX_FILE,
    BuildProperties.path.TEST.CONCATENATED.INDEX_FILE
);
Console.info("Copied index file to concat folder");

FileSystem.replace(
    BuildProperties.path.TEST.CONCATENATED.INDEX_FILE,
    BuildProperties.replaceToken.HELPER_CODE,
    fs.readFileSync(
        BuildProperties.path.TEST.CONCATENATED.HELPER,
        "utf8"
    )
);

BuildProperties.replaceArray.forEach(arr => {
    FileSystem.replace(
        BuildProperties.path.TEST.CONCATENATED.INDEX_FILE,
        arr[0],
        arr[1]
    );

    BuildProperties.path.TEST.CODE.HTML_FILES.forEach(htmlFile => {
        FileSystem.replace(
            htmlFile,
            arr[0],
            arr[1]
        );
    });
});
Console.info("Replaced all tokens with respective values in index file");

Console.ended(__filename);
