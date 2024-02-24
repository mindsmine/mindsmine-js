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

class Copy {
    constructor(source, target) {
        this.originalSource = source;
        const sourceStats = fs.lstatSync(source);

        if (sourceStats.isDirectory()) {
            this.copyFolderSync(source, target);
        } else if (sourceStats.isFile()) {
            this.copyFileSync(source, target);
        }
    }

    copyFileSync(sourceFile, targetFile) {
        let targetFilepath = targetFile;

        if (fs.existsSync(targetFile)) {
            if (fs.lstatSync(targetFile).isDirectory()) {
                targetFilepath = path.join(targetFile, path.basename(sourceFile));
            }
        }

        fs.writeFileSync(targetFilepath, fs.readFileSync(sourceFile));
    }

    copyFolderSync(sourceFolder, targetFolder) {
        let files = [];

        let targetFolderPath = path.join(targetFolder, path.basename(sourceFolder));

        if (this.originalSource === sourceFolder) {
            targetFolderPath = targetFolder;
        }

        if (!fs.existsSync(targetFolderPath)) {
            fs.mkdirSync(targetFolderPath);
        }

        if (fs.lstatSync(sourceFolder).isDirectory()) {
            files = fs.readdirSync(sourceFolder);

            files.forEach(file => {
                let currentSource = path.join(sourceFolder, file);

                if (fs.lstatSync(currentSource).isDirectory()) {
                    this.copyFolderSync(currentSource, targetFolderPath);
                } else {
                    this.copyFileSync(currentSource, targetFolderPath);
                }
            });
        }
    }
}

export default class {
    static get Filter() {
        return {
            ES: ".es",
            ES6: ".es6",
            HTML: ".html",
            JS: ".js",
            JSON: ".json",
            JSX: ".jsx"
        };
    }

    static mkdir(folder) {
        const sep = path.sep;
        const initDir = path.isAbsolute(folder) ? sep : "";

        folder.split(sep).reduce(
            (parentDir, childDir) => {
                const curDir = path.resolve(parentDir, childDir);

                if (!fs.existsSync(curDir)) {
                    fs.mkdirSync(curDir);
                }

                return curDir;
            },
            initDir
        );
    }

    static copy(source, target) {
        new Copy(source, target);
    }

    static concat(source, targetFile, filter) {
        if (Array.isArray(source)) {
            source.forEach(file => {
                fs.appendFileSync(targetFile, fs.readFileSync(file));
            });

            return;
        }

        function concat(sourceFile) {
            const stats = fs.lstatSync(sourceFile);

            if (stats.isFile() && sourceFile.endsWith(filter)) {
                fs.appendFileSync(targetFile, fs.readFileSync(sourceFile));
            } else if (stats.isDirectory()) {
                fs.readdirSync(sourceFile).forEach(file => {
                    concat(path.join(sourceFile, file));
                });
            }
        }

        concat(source);
    }

    static replace(filepath, fromString, toString) {
        const parent = this;

        // All this purely to shut up the CodeQL Analysis which is just ridiculous
        const _ = {
            escapeRegExp: function (string) {
                const reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);

                return reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
            }
        };

        const fromPattern = new RegExp(_.escapeRegExp(fromString), "g");

        const filepathStats = fs.lstatSync(filepath);

        if (filepathStats.isFile()) {
            let fileContent = fs.readFileSync(filepath, "utf8");

            const newContent = fileContent.replace(fromPattern, toString);

            if (newContent !== fileContent) {
                fs.writeFileSync(filepath, newContent);
            }
        } else if (filepathStats.isDirectory()) {
            fs.readdirSync(filepath).forEach(file => {
                parent.replace(path.join(filepath, file), fromString, toString);
            });
        }
    }
}
