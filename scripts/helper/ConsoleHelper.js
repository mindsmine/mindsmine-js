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

const COLORS = {
    OFF: "\x1b[0m",
    BLACK: "\x1b[30m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m"
};

export default class {
    static began(message) {
        console.log(`[ ${COLORS.CYAN}INFO${COLORS.OFF} ] BEGAN -`, message);
    }

    static debug(message) {
        console.log(`[ ${COLORS.YELLOW}DEBUG${COLORS.OFF} ]`, message);
    }

    static ended(message) {
        console.log(`[ ${COLORS.CYAN}INFO${COLORS.OFF} ] ENDED -`, message);
    }

    static error(message) {
        console.error(`[ ${COLORS.RED}ERROR${COLORS.OFF} ]`, message);
    }

    static info(message) {
        console.log(`[ ${COLORS.CYAN}INFO${COLORS.OFF} ]`, message);
    }

    static newline() {
        console.log("\n");
    }

    static success(message) {
        console.log(`[ ${COLORS.GREEN}SUCCESS${COLORS.OFF} ]`, message);
    }
}
