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
import gulp from "gulp";
import babel from "gulp-babel";
import concat from "gulp-concat";
import jest from "gulp-jest";
import jsdoc3 from "gulp-jsdoc3";
import replace from "gulp-replace";
import rename from "gulp-rename";
import uglify from "gulp-uglify";

import buildProperties, {handleError} from "./build.properties";

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

gulp.task(
    "generate-source-files",
    () => {
        let _task = gulp.src(`${buildProperties.folder.SRC}/**/*`)
            .on("error", handleError("generate-source-files", "gulp.src"));

        buildProperties.replaceArray.forEach((arr) => {
            _task = _task.pipe(replace(arr[0], arr[1])).on("error", handleError("generate-source-files", "replace"));
        });

        return _task.pipe(gulp.dest(BUILD.SOURCE.CODE)).on("error", handleError("generate-source-files", "gulp.dest"));
    }
);

gulp.task(
    "concat-source-files",
    ["generate-source-files"],
    () => {
        return gulp.src(`${BUILD.SOURCE.CODE}/helper/**/*`)
            .on("error", handleError("concat-source-files", "gulp.src"))
            .pipe(concat("helper.js"))
            .on("error", handleError("concat-source-files", "concat"))
            .pipe(gulp.dest(BUILD.SOURCE.CONCATENATED))
            .on("error", handleError("concat-source-files", "gulp.dest"));
    }
);

gulp.task(
    "update-source-files",
    ["concat-source-files"],
    () => {
        let _helperCode = fs.readFileSync(`${BUILD.SOURCE.CONCATENATED}/helper.js`);

        return gulp.src(`${BUILD.SOURCE.CODE}/index.js`)
            .on("error", handleError("update-source-files", "gulp.src"))
            .pipe(replace("//_CONCATENATED_HELPER_CODE", _helperCode))
            .on("error", handleError("update-source-files", "replace"))
            .pipe(gulp.dest(BUILD.SOURCE.CONCATENATED))
            .on("error", handleError("update-source-files", "gulp.dest"));
    }
);

gulp.task(
    "transpile-source-files",
    ["update-source-files"],
    () => {
        return gulp.src(`${BUILD.SOURCE.CONCATENATED}/index.js`)
            .on("error", handleError("transpile-source-files", "gulp.src"))
            .pipe(babel({
                presets: [
                    "es2015"
                ]
            }))
            .on("error", handleError("transpile-source-files", "babel"))
            .pipe(gulp.dest(BUILD.SOURCE.TRANSPILED))
            .on("error", handleError("transpile-source-files", "gulp.dest"));
    }
);

gulp.task(
    "uglify",
    ["transpile-source-files"],
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
    "generate-test-files",
    ["uglify"],
    () => {
        let _task = gulp.src(`${buildProperties.folder.TEST}/**/*`)
            .on("error", handleError("generate-test-files", "gulp.src"));

        buildProperties.replaceArray.forEach((arr) => {
            _task = _task.pipe(replace(arr[0], arr[1])).on("error", handleError("generate-test-files", "replace"));
        });

        return _task.pipe(gulp.dest(BUILD.TEST.CODE)).on("error", handleError("generate-test-files", "gulp.dest"));
    }
);

gulp.task(
    "concat-test-files",
    ["generate-test-files"],
    () => {
        return gulp.src(`${BUILD.TEST.CODE}/helper/**/*.js`)
            .on("error", handleError("concat-test-files", "gulp.src"))
            .pipe(concat("helper.js"))
            .on("error", handleError("concat-test-files", "concat"))
            .pipe(gulp.dest(BUILD.TEST.CONCATENATED))
            .on("error", handleError("concat-test-files", "gulp.dest"));
    }
);

gulp.task(
    "update-test-files",
    ["concat-test-files"],
    () => {
        let _helperCode = fs.readFileSync(`${BUILD.TEST.CONCATENATED}/helper.js`);

        return gulp.src(`${BUILD.TEST.CODE}/index.test.js`)
            .on("error", handleError("update-test-files", "gulp.src"))
            .pipe(replace("//_CONCATENATED_HELPER_CODE", _helperCode))
            .on("error", handleError("update-test-files", "replace"))
            .pipe(gulp.dest(BUILD.TEST.CONCATENATED))
            .on("error", handleError("update-test-files", "gulp.dest"));
    }
);

gulp.task(
    "test",
    ["update-test-files"],
    () => {
        return gulp.src(`${BUILD.TEST.CONCATENATED}`)
            .on("error", handleError("test", "gulp.src"))
            .pipe(jest())
            .on("error", handleError("test", "jest"));
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
            .pipe(jsdoc3({
                opts: {
                    destination: `${buildProperties.folder.DOCS}/mindsmine/js/${process.env.npm_package_version}`
                },
                plugins: [
                    "plugins/markdown"
                ],
                templates: {
                    navType: "inline",
                    includeDate: false,
                    collapseSymbols: true,
                    theme: "flatly",
                    cleverLinks: true,
                    outputSourceFiles: false,
                    syntaxTheme: "dark",
                    systemName: `${process.env.npm_package_name}`,
                    copyright:
                        `<div style="text-align: center;">
                            Copyright &#169; 2008, ${(new Date()).getFullYear()},
                            <strong><a target="_blank" href="http://www.shaiksphere.com">Shaiksphere Inc</a></strong>.
                            All rights reserved.
                        </div>`
                }
            }))
            .on("error", handleError("documentation", "jsdoc3"));
    }
);
