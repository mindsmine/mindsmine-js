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

const fs = require("fs");
const path = require("path");

const rmdir = function(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(dirName => {
            const currPath = path.join(dirPath, dirName);

            if (fs.lstatSync(currPath).isDirectory()) {
                rmdir(currPath);
            } else {
                fs.unlinkSync(currPath);
            }
        });

        fs.rmdirSync(dirPath);
    }
};

if (process.argv.length > 2) {
    for (let j = 2; j < process.argv.length; j++) {
        rmdir(process.argv[j]);
    }
}
