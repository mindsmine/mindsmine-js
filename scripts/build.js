"use strict";

import fs from "fs";

import FileSystemHelper from "./helper/FileSystemHelper";
import buildProperties, {handleError} from "./build.properties";

FileSystemHelper.mkdir(buildProperties.folder.SOURCE.CONCATENATED);
FileSystemHelper.mkdir(buildProperties.folder.SOURCE.TRANSPILED);
FileSystemHelper.mkdir(buildProperties.folder.TEST.CONCATENATED);

FileSystemHelper.copy(buildProperties.folder.ROOT.SRC, buildProperties.folder.SOURCE.CODE);
FileSystemHelper.copy(buildProperties.folder.ROOT.TEST, buildProperties.folder.TEST.CODE);

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
    FileSystemHelper.replace(
        buildProperties.folder.SOURCE.CONCATENATED_FILE,
        arr[0],
        arr[1]
    );

    FileSystemHelper.replace(
        buildProperties.folder.TEST.CONCATENATED_FILE,
        arr[0],
        arr[1]
    );
});
