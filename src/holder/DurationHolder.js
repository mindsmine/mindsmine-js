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

/**
 * Class to hold the duration details
 *
 * @since 4.6.0
 *
 */
mindsmine.DurationHolder = class {
    #years;
    #months;
    #days;
    #hours;
    #minutes;
    #seconds;
    #milliseconds;
    #startAfterEnd;

    constructor(years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        this.#years = years;
        this.#months = months;
        this.#days = days;
        this.#hours = hours;
        this.#minutes = minutes;
        this.#seconds = seconds;
        this.#milliseconds = milliseconds;
    }
    
    /**
     * @param {Boolean} startAfterEnd
     */
    set startAfterEnd(startAfterEnd) {
        this.#startAfterEnd = startAfterEnd;
    }

    get startAfterEnd() {
        return this.#startAfterEnd;
    }

    get years() {
        return this.#years;
    }

    get months() {
        return this.#months;
    }

    get days() {
        return this.#days;
    }

    get hours() {
        return this.#hours;
    }

    get minutes() {
        return this.#minutes;
    }

    get seconds() {
        return this.#seconds;
    }

    get milliseconds() {
        return this.#milliseconds;
    }

    get displayString() {
        const _dmArr = [];

        if (this.#years > 0) {
            _dmArr.push(`${this.#years} year${(this.#years > 1) ? "s" : ""}`);
        }

        if (this.#months > 0) {
            _dmArr.push(`${this.#months} month${(this.#months > 1) ? "s" : ""}`);
        }

        if (this.#days > 0) {
            _dmArr.push(`${this.#days} day${(this.#days > 1) ? "s" : ""}`);
        }

        if (this.#hours > 0) {
            _dmArr.push(`${this.#hours} hour${(this.#hours > 1) ? "s" : ""}`);
        }

        if (this.#minutes > 0) {
            _dmArr.push(`${this.#minutes} minute${(this.#minutes > 1) ? "s" : ""}`);
        }

        if (this.#seconds > 0) {
            _dmArr.push(`${this.#seconds} second${(this.#seconds > 1) ? "s" : ""}`);
        }

        return _dmArr.join(" ");
    }
};
