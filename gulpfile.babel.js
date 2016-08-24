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
import JSDuck from "jsduck";
import replace from "gulp-replace";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import runSequence from "run-sequence";

import mindsmineConfig, {getPackageJSON, handleError} from "./mindsmine.config";

const PACKAGE_JSON = getPackageJSON(),
    NOW = new Date(),
    TIMESTAMP = NOW.toISOString().replace(/[-:]/g, "").replace(/T/g, ".").replace(/.[0-9]+Z/g, ""),
    PATHS = {
    SRC: "src",
    TEST: "test",
    BUILD: "build",
    DIST: "dist",
    DOCS: "docs"
},
    BUILD = {
    SOURCE: {
        CODE: `${PATHS.BUILD}/source/code`,
        COMPILED: `${PATHS.BUILD}/source/compiled`
    },
    TEST: {
        CODE: `${PATHS.BUILD}/test/code`,
        COMPILED: `${PATHS.BUILD}/test/compiled`
    }
};

gulp.task("clean-unwanted", () => {
    let _paths = del.sync([PATHS.BUILD]);

    console.info("Deleting unwanted files\n", _paths.join("\n"));

    return _paths;
});

gulp.task("clean", ["clean-unwanted"], () => {
    let _paths = [];

    _paths.push(del.sync([PATHS.DIST]));
    _paths.push(del.sync([PATHS.DOCS]));

    console.info("Cleaning\n", _paths.join("\n"));

    return _paths;
});

gulp.task("generate-sources", ["clean"], () => {
    return gulp.src(
        [
            `${PATHS.SRC}/**/*`
        ],
        {
            base: PATHS.SRC
        }
    )
        .pipe(replace("@BUILD_TIMESTAMP@", TIMESTAMP))
        .pipe(replace("@BUILD_YEAR@", NOW.getFullYear()))
        .pipe(replace("@COMPANY_LINK@", PACKAGE_JSON.homepage))
        .pipe(replace("@PRODUCT_NAME@", PACKAGE_JSON.name))
        .pipe(replace("@PRODUCT_VERSION@", PACKAGE_JSON.version))
        .pipe(replace(mindsmineConfig.replaceMap.ARRAY.token, mindsmineConfig.replaceMap.ARRAY.value))
        .pipe(replace(mindsmineConfig.replaceMap.BOOLEAN.token, mindsmineConfig.replaceMap.BOOLEAN.value))
        .pipe(replace(mindsmineConfig.replaceMap.FUNCTION.token, mindsmineConfig.replaceMap.FUNCTION.value))
        .pipe(replace(mindsmineConfig.replaceMap.NUMBER.token, mindsmineConfig.replaceMap.NUMBER.value))
        .pipe(replace(mindsmineConfig.replaceMap.OBJECT.token, mindsmineConfig.replaceMap.OBJECT.value))
        .pipe(replace(mindsmineConfig.replaceMap.STRING.token, mindsmineConfig.replaceMap.STRING.value))
        .pipe(gulp.dest(BUILD.SOURCE.CODE));
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
        .on("error", handleError("concat-files:gulp.src"))
        .pipe(concat("helper.js"))
        .on("error", handleError("concat-files:concat"))
        .pipe(gulp.dest(BUILD.SOURCE.COMPILED))
        .on("error", handleError("concat-files:gulp.dest"));
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
        .pipe(replace("//_CONCATENATED_HELPER_CODE", _helperCode))
        .pipe(gulp.dest(BUILD.SOURCE.COMPILED));
});

gulp.task("uglify", ["update-files"], () => {
    return gulp.src(
        [
            `${BUILD.SOURCE.COMPILED}/index.js`
        ],
        {
            base: BUILD.SOURCE.COMPILED
        }
    )
        .pipe(rename(`${PACKAGE_JSON.name}-${PACKAGE_JSON.version}.min.js`))
        .pipe(uglify({
            preserveComments: function (_node, _comment) {
                return (_comment.value.indexOf("! ") !== -1);
            }
        }))
        .pipe(gulp.dest(PATHS.DIST));
});

gulp.task("documentation", ["update-files"], () => {

    let _jsDuck = new JSDuck(
        [
            "--title",
            `${PACKAGE_JSON.name} - API Documentation`,
            "--footer",
            `Generated on {DATE} by {JSDUCK} {VERSION}. Copyright &#169; ${NOW.getFullYear()} ${PACKAGE_JSON.homepage}. All Rights Reserved.`,
            "--no-source",
            true,
            "--builtin-classes", true,
            "--warnings",
            [
                "-sing_static"
            ],
            "--categories",
            "./jsduck.categories.json",
            "--output",
            PATHS.DOCS
        ],
        "./3rdparty/jsduck-5.3.4.exe"
    );

    _jsDuck.doc([`${BUILD.SOURCE.COMPILED}/index.js`]);
});

gulp.task("package", () => {
    runSequence(["uglify", "documentation"], "clean-unwanted");
});
