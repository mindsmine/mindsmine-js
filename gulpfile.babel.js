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

import gulp from "gulp";
import jsdoc3 from "gulp-jsdoc3";
import rename from "gulp-rename";
import uglify from "gulp-uglify";

import buildProperties, {handleError} from "./build.properties";
import jsdocConf from "./jsdoc.conf";

const BUILD = {
    SOURCE: {
        CODE: `${buildProperties.folder.BUILD}/source/code`,
        CONCATENATED: `${buildProperties.folder.BUILD}/source/concatenated`,
        TRANSPILED: `${buildProperties.folder.BUILD}/source/transpiled`
    },
    TEST: {
        CODE: `${buildProperties.folder.BUILD}/test/code`,
        CONCATENATED: `${buildProperties.folder.BUILD}/test/concatenated`
    }
};

// gulp.task(
//     "transpile-source-files",
//     () => {
//         return gulp.src(`${BUILD.SOURCE.CONCATENATED}/index.js`)
//             .on("error", handleError("transpile-source-files", "gulp.src"))
//             .pipe(babel({
//                 presets: [
//                     "es2015"
//                 ]
//             }))
//             .on("error", handleError("transpile-source-files", "babel"))
//             .pipe(gulp.dest(BUILD.SOURCE.TRANSPILED))
//             .on("error", handleError("transpile-source-files", "gulp.dest"));
//     }
// );

gulp.task(
    "uglify",
    // ["transpile-source-files"],
    () => {
        return gulp.src(`${BUILD.SOURCE.TRANSPILED}/index.js`)
            .on("error", handleError("uglify", "gulp.src"))
            .pipe(rename(buildProperties.outputFile))
            .on("error", handleError("uglify", "rename"))
            .pipe(uglify({
                output: {
                    comments: "/^!/"
                }
            }))
            .on("error", handleError("uglify", "uglify"))
            .pipe(gulp.dest(buildProperties.folder.DIST))
            .on("error", handleError("uglify", "gulp.dest"));
    }
);

gulp.task(
    "documentation",
    () => {
        return gulp.src(
            [
                "README.md",
                `${BUILD.SOURCE.CONCATENATED}/index.js`
            ]
        )
            .on("error", handleError("documentation", "gulp.src"))
            .pipe(jsdoc3(jsdocConf))
            .on("error", handleError("documentation", "jsdoc3"));
    }
);
