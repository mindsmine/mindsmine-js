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

import del from "del";
import fs from "fs";
import gulp from "gulp";
import concat from "gulp-concat";
import replace from "gulp-replace";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import runSequence from "run-sequence";

import buildProperties, {handleError} from "./build.properties";

const BUILD = {
    SOURCE: {
        CODE: `${buildProperties.folder.BUILD}/source/code`,
        COMPILED: `${buildProperties.folder.BUILD}/source/compiled`
    },
    TEST: {
        CODE: `${buildProperties.folder.BUILD}/test/code`,
        COMPILED: `${buildProperties.folder.BUILD}/test/compiled`
    }
};

gulp.task("clean-unwanted", () => {
    let _paths = del.sync([buildProperties.folder.BUILD]);

    console.info("Deleting unwanted files\n", _paths.join("\n"));

    return _paths;
});

gulp.task("clean", ["clean-unwanted"], () => {
    let _paths = [];

    _paths.push(del.sync([buildProperties.folder.DIST]));
    _paths.push(del.sync([buildProperties.folder.DOCS]));

    console.info("Cleaning\n", _paths.join("\n"));

    return _paths;
});

gulp.task("generate-sources", ["clean"], () => {
    let _task = gulp.src(
        [
            `${buildProperties.folder.SRC}/**/*`
        ],
        {
            base: buildProperties.folder.SRC
        }
    ).on("error", handleError("generate-sources", "gulp.src"));

    buildProperties.replaceArray.forEach((arr) => {
        _task = _task.pipe(replace(arr[0], arr[1])).on("error", handleError("generate-sources", "replace"));
    });

    return _task.pipe(gulp.dest(BUILD.SOURCE.CODE)).on("error", handleError("generate-sources", "gulp.dest"));
});

gulp.task("concat-files", ["generate-sources"], () => {
    return gulp.src(
        [
            `${BUILD.SOURCE.CODE}/helper/**/*`
        ],
        {
            base: BUILD.SOURCE.CODE
        }
    )
        .on("error", handleError("concat-files", "gulp.src"))
        .pipe(concat("helper.js"))
        .on("error", handleError("concat-files", "concat"))
        .pipe(gulp.dest(BUILD.SOURCE.COMPILED))
        .on("error", handleError("concat-files", "gulp.dest"));
});

gulp.task("update-files", ["concat-files"], () => {
    let _helperCode = fs.readFileSync(`${BUILD.SOURCE.COMPILED}/helper.js`);

    return gulp.src(
        [
            `${BUILD.SOURCE.CODE}/index.js`
        ],
        {
            base: BUILD.SOURCE.CODE
        }
    )
        .on("error", handleError("update-files", "gulp.src"))
        .pipe(replace("//_CONCATENATED_HELPER_CODE", _helperCode))
        .on("error", handleError("update-files", "replace"))
        .pipe(gulp.dest(BUILD.SOURCE.COMPILED))
        .on("error", handleError("update-files", "gulp.dest"));
});

gulp.task("test", ["update-files"], () => {
    console.info("[ INFO ] Tests are not yet implemented. This is a placeholder.");
});

gulp.task("uglify", ["test"], () => {
    return gulp.src(
        [
            `${BUILD.SOURCE.COMPILED}/index.js`
        ],
        {
            base: BUILD.SOURCE.COMPILED
        }
    )
        .on("error", handleError("uglify", "gulp.src"))
        .pipe(rename(buildProperties.outputFile))
        .on("error", handleError("uglify", "rename"))
        .pipe(uglify({
            preserveComments: function (_node, _comment) {
                return (_comment.value.indexOf("! ") !== -1);
            }
        }))
        .on("error", handleError("uglify", "uglify"))
        .pipe(gulp.dest(buildProperties.folder.DIST))
        .on("error", handleError("uglify", "gulp.dest"));
});

gulp.task("documentation", ["update-files"], () => {

    // Do nothing for now

});

gulp.task("package", () => {
    runSequence("uglify", "clean-unwanted");
});
