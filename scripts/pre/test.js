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

import BuildProperties from "../helper/GeneralHelper";
import Console from "../helper/ConsoleHelper";
import FileSystem from "../helper/FileSystemHelper";

Console.newline();
Console.began(__filename);

FileSystem.mkdir(BuildProperties.path.ROOT.DIST);
FileSystem.mkdir(BuildProperties.path.SOURCE.CONCATENATED.ROOT);
FileSystem.mkdir(BuildProperties.path.TEST.CONCATENATED.ROOT);
Console.info("Created necessary folder(s)");

FileSystem.copy(
    BuildProperties.path.ROOT.SRC,
    BuildProperties.path.SOURCE.CODE.ROOT
);
Console.info("Copied source code into build folder");

FileSystem.copy(
    BuildProperties.path.ROOT.TEST,
    BuildProperties.path.TEST.CODE.ROOT
);
Console.info("Copied test code into build folder");

FileSystem.concat(
    BuildProperties.path.SOURCE.CODE.HELPER,
    BuildProperties.path.SOURCE.CONCATENATED.HELPER,
    FileSystem.Filter.JS
);
Console.info("Concatenated all source helper files");

FileSystem.concat(
    BuildProperties.path.TEST.CODE.HELPER,
    BuildProperties.path.TEST.CONCATENATED.HELPER,
    FileSystem.Filter.JS
);
Console.info("Concatenated all test helper files");

FileSystem.copy(
    BuildProperties.path.SOURCE.CODE.INDEX_FILE,
    BuildProperties.path.SOURCE.CONCATENATED.INDEX_FILE
);
Console.info("Copied source index file to concat folder");

FileSystem.copy(
    BuildProperties.path.TEST.CODE.INDEX_FILE,
    BuildProperties.path.TEST.CONCATENATED.INDEX_FILE
);
Console.info("Copied test index file to concat folder");

FileSystem.replace(
    BuildProperties.path.SOURCE.CONCATENATED.INDEX_FILE,
    BuildProperties.replaceToken.HELPER_CODE,
    fs.readFileSync(
        BuildProperties.path.SOURCE.CONCATENATED.HELPER,
        "utf8"
    )
);

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
        BuildProperties.path.SOURCE.CONCATENATED.INDEX_FILE,
        arr[0],
        arr[1]
    );

    FileSystem.replace(
        BuildProperties.path.TEST.CONCATENATED.INDEX_FILE,
        arr[0],
        arr[1]
    );
});
Console.info("Replaced all tokens with respective values in index file");

Console.ended(__filename);
