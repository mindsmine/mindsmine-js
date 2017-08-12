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

import FileSystemHelper from "./helper/FileSystemHelper";
import buildProperties from "./helper/GeneralHelper";

FileSystemHelper.mkdir(buildProperties.folder.SOURCE.CONCATENATED);
FileSystemHelper.mkdir(buildProperties.folder.TEST.CONCATENATED);
FileSystemHelper.mkdir(buildProperties.folder.ROOT.DIST);

FileSystemHelper.copy(buildProperties.folder.ROOT.SRC, buildProperties.folder.SOURCE.CODE);
FileSystemHelper.copy(buildProperties.folder.ROOT.TEST, buildProperties.folder.TEST.CODE);

FileSystemHelper.copy(
    path.resolve(__dirname, "..", "..", "scripts", "helper", "jsdoc.conf.json"),
    path.resolve(buildProperties.folder.ROOT.BUILD, "scripts", "helper", "jsdoc.conf.json")
);

FileSystemHelper.concat(
    buildProperties.folder.SOURCE.CODE_HELPER_FILE,
    buildProperties.folder.SOURCE.CONCATENATED_HELPER_FILE,
    ".js"
);

FileSystemHelper.copy(buildProperties.folder.SOURCE.CODE_FILE, buildProperties.folder.SOURCE.CONCATENATED_FILE);

FileSystemHelper.replace(
    buildProperties.folder.SOURCE.CONCATENATED_FILE,
    "//_CONCATENATED_HELPER_CODE",
    fs.readFileSync(buildProperties.folder.SOURCE.CONCATENATED_HELPER_FILE, "utf8")
);

FileSystemHelper.concat(
    buildProperties.folder.TEST.CODE_HELPER_FILE,
    buildProperties.folder.TEST.CONCATENATED_HELPER_FILE,
    ".js"
);

FileSystemHelper.copy(buildProperties.folder.TEST.CODE_FILE, buildProperties.folder.TEST.CONCATENATED_FILE);

FileSystemHelper.replace(
    buildProperties.folder.TEST.CONCATENATED_FILE,
    "//_CONCATENATED_HELPER_CODE",
    fs.readFileSync(buildProperties.folder.TEST.CONCATENATED_HELPER_FILE, "utf8")
);

buildProperties.replaceArray.forEach(arr => {
    // TODO Find a better way out
    FileSystemHelper.replace(
        path.resolve(buildProperties.folder.ROOT.BUILD, "scripts", "helper", "jsdoc.conf.json"),
        arr[0],
        arr[1]
    );

    FileSystemHelper.replace(
        buildProperties.folder.SOURCE.CONCATENATED_FILE,
        arr[0],
        arr[1]
    );

    // TODO Find a better way out
    FileSystemHelper.replace(
        buildProperties.folder.TEST.CODE,
        arr[0],
        arr[1]
    );

    FileSystemHelper.replace(
        buildProperties.folder.TEST.CONCATENATED_FILE,
        arr[0],
        arr[1]
    );
});
