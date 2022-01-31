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

import BuildProperties from "./helper/GeneralHelper.js";
import Console from "./helper/ConsoleHelper.js";
import FileSystem from "./helper/FileSystemHelper.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

Console.newline();
Console.began(__filename);

FileSystem.mkdir(BuildProperties.folder.ROOT.DIST);
FileSystem.mkdir(BuildProperties.folder.SOURCE.CONCATENATED.ROOT);
FileSystem.mkdir(BuildProperties.folder.TEST.CONCATENATED.ROOT);
Console.info("Created necessary folder(s)");

FileSystem.copy(
    BuildProperties.folder.ROOT.SRC,
    BuildProperties.folder.SOURCE.CODE.ROOT
);
Console.info("Source: Copied code into build folder");

FileSystem.copy(
    BuildProperties.folder.ROOT.TEST,
    BuildProperties.folder.TEST.CODE.ROOT
);
Console.info("Test: Copied code into build folder");

FileSystem.concat(
    BuildProperties.folder.SOURCE.CODE.HELPER,
    BuildProperties.folder.SOURCE.CONCATENATED.HELPER,
    FileSystem.Filter.JS
);
Console.info("Source: Concatenated all helper files");

FileSystem.concat(
    BuildProperties.folder.SOURCE.CODE.HOLDER,
    BuildProperties.folder.SOURCE.CONCATENATED.HOLDER,
    FileSystem.Filter.JS
);
Console.info("Source: Concatenated all holder files");

FileSystem.concat(
    BuildProperties.folder.TEST.CODE.HELPER,
    BuildProperties.folder.TEST.CONCATENATED.HELPER,
    FileSystem.Filter.JS
);
Console.info("Test: Concatenated all helper files");

FileSystem.concat(
    BuildProperties.folder.TEST.CODE.HOLDER,
    BuildProperties.folder.TEST.CONCATENATED.HOLDER,
    FileSystem.Filter.JS
);
Console.info("Test: Concatenated all holder files");

FileSystem.copy(
    BuildProperties.folder.SOURCE.CODE.INDEX_FILE,
    BuildProperties.folder.SOURCE.CONCATENATED.INDEX_FILE
);
Console.info("Source: Copied index file to concat folder");

FileSystem.copy(
    BuildProperties.folder.TEST.CODE.INDEX_FILE,
    BuildProperties.folder.TEST.CONCATENATED.INDEX_FILE
);
Console.info("Test: Copied index file to concat folder");

[
    [
        BuildProperties.replaceToken.MORE_CODE,
        BuildProperties.folder.SOURCE.CODE.MORE_FILE,
        "more"
    ],
    [
        BuildProperties.replaceToken.HELPER_CODE,
        BuildProperties.folder.SOURCE.CONCATENATED.HELPER,
        "helper"
    ],
    [
        BuildProperties.replaceToken.HOLDER_CODE,
        BuildProperties.folder.SOURCE.CONCATENATED.HOLDER,
        "holder"
    ]
].forEach(arr => {
    FileSystem.replace(
        BuildProperties.folder.SOURCE.CONCATENATED.INDEX_FILE,
        arr[0],
        fs.readFileSync(
            arr[1],
            "utf8"
        )
    );
    Console.info(`Source: Replaced '${arr[0]}' token with ${arr[2]} code`);
});

[
    [
        BuildProperties.replaceToken.MORE_CODE,
        BuildProperties.folder.TEST.CODE.MORE_FILE,
        "more"
    ],
    [
        BuildProperties.replaceToken.HELPER_CODE,
        BuildProperties.folder.TEST.CONCATENATED.HELPER,
        "helper"
    ],
    [
        BuildProperties.replaceToken.HOLDER_CODE,
        BuildProperties.folder.TEST.CONCATENATED.HOLDER,
        "holder"
    ]
].forEach(arr => {
    FileSystem.replace(
        BuildProperties.folder.TEST.CONCATENATED.INDEX_FILE,
        arr[0],
        fs.readFileSync(
            arr[1],
            "utf8"
        )
    );
    Console.info(`Test: Replaced '${arr[0]}' token with ${arr[2]} code`);
});

BuildProperties.replaceArray.forEach(arr => {
    FileSystem.replace(
        BuildProperties.folder.SOURCE.CONCATENATED.INDEX_FILE,
        arr[0],
        arr[1]
    );

    FileSystem.replace(
        BuildProperties.folder.TEST.CONCATENATED.INDEX_FILE,
        arr[0],
        arr[1]
    );
});
Console.info("Replaced all tokens with respective values in index file");

Console.ended(__filename);
