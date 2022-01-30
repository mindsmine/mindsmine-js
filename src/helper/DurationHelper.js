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
 * A collection of useful static methods to deal with duration.
 * 
 * Duration is the amount of elapsed time between two events.
 * 
 * @since 4.5.0
 * 
 */
mindsmine.Duration = class {

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Basic Constants

    /**
     * Number of milliseconds in a second.
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get MILLISECONDS_IN_SECOND() {
        return 1000;
    }

    /**
     * Number of seconds in a minute.
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get SECONDS_IN_MINUTE() {
        return 60;
    }

    /**
     * Number of minutes in an hour.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.3
     *
     */
    static get MINUTES_IN_HOUR() {
        return 60;
    }

    /**
     * Number of hours in a day.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.3
     *
     */
    static get HOURS_IN_DAY() {
        return 24;
    }

    /**
     * Number of days in a week.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.3
     *
     */
    static get DAYS_IN_WEEK() {
        return 7;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Utility Functions

    /**
     * Supported units
     *
     * @since 4.5.3
     *
     */
    static #SUPPORTED_UNITS = {
        ms: "ms",
        millisecond: "ms",
        milliseconds: "ms",
        s: "s",
        second: "s",
        seconds: "s",
        m: "m",
        minute: "m",
        minutes: "m",
        h: "h",
        hour: "h",
        hours: "h",
        d: "d",
        day: "d",
        days: "d",
        w: "w",
        week: "w",
        weeks: "w",
        M: "M",
        month: "M",
        months: "M",
        y: "y",
        year: "y",
        years: "y"
    };

    /**
     * Checks if the unit is supported.
     *
     * @param {String} unit To verify
     *
     * @returns {Boolean}
     *
     * @since 4.5.3
     * 
     */
    static #isSupportedUnit(unit) {
        if (mindsmine.String.isEmpty(unit)) {
            throw new TypeError("Fatal Error. 'unit'. @ERROR_PERMITTED_STRING@");
        }

        return this.#SUPPORTED_UNITS.hasOwnProperty(unit);
    }

    /**
     * Normalises the unit for usage in the class.
     *
     * @param {String} unit To be normalised
     *
     * @returns {String}
     *
     * @since 4.5.3
     * 
     */
    static #normaliseUnit(unit) {
        if (!this.#isSupportedUnit(unit)) {
            throw new RangeError(`Fatal Error. 'unit'. Allowed values are ${Object.keys(this.#SUPPORTED_UNITS)}.`);
        }

        return this.#SUPPORTED_UNITS[unit];
    }
    
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Milliseconds

    /**
     * Convenience function to return the number of milliseconds in a given unit.
     *
     * @param {String} unit
     *
     * @returns {Number}
     *
     * @since 4.5.3
     *
     */
    static #getMillisecondsInAUnit(unit = "ms") {
        if (mindsmine.String.isEmpty(unit)) {
            return 1;
        }

        switch (this.#normaliseUnit(unit)) {
            case "ms":
                return 1;
            
            case "s":
                return this.MILLISECONDS_IN_SECOND;
            
            case "m":
                return this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE;
            
            case "h":
                return this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE * this.MINUTES_IN_HOUR;
            
            case "d":
                return this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE * this.MINUTES_IN_HOUR * this.HOURS_IN_DAY;
            
            case "w":
                return this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE * this.MINUTES_IN_HOUR * this.HOURS_IN_DAY * this.DAYS_IN_WEEK;
            
            case "M":
                return this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE * this.MINUTES_IN_HOUR * this.HOURS_IN_DAY * 30;
            
            case "y":
                return this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE * this.MINUTES_IN_HOUR * this.HOURS_IN_DAY * 365;
    
            default:
                throw new RangeError(`Fatal Error. 'unit'. Unsupported '${unit}'.`);
        }
    }

    /**
     * Number of milliseconds in a minute.
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get MILLISECONDS_IN_MINUTE() {
        return this.#getMillisecondsInAUnit("m");
    }

    /**
     * Number of milliseconds in an hour.
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get MILLISECONDS_IN_HOUR() {
        return this.#getMillisecondsInAUnit("h");
    }

    /**
     * Number of milliseconds in a day.
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get MILLISECONDS_IN_DAY() {
        return this.#getMillisecondsInAUnit("d");
    }

    /**
     * Number of milliseconds in a week.
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get MILLISECONDS_IN_WEEK() {
        return this.#getMillisecondsInAUnit("w");
    }

    /**
     * Number of milliseconds in a month (30 days).
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get MILLISECONDS_IN_MONTH() {
        return this.#getMillisecondsInAUnit("M");
    }

    /**
     * Number of milliseconds in a non leap year.
     * 
     * @constant
     * 
     * @returns {Number}
     * 
     * @since 4.5.0
     * 
     */
    static get MILLISECONDS_IN_YEAR() {
        return this.#getMillisecondsInAUnit("y");
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Seconds

    /**
     * Number of seconds in an hour.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.0
     *
     */
    static get SECONDS_IN_HOUR() {
        return this.SECONDS_IN_MINUTE * this.MINUTES_IN_HOUR;
    }

    /**
     * Number of seconds in a day.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.0
     *
     */
    static get SECONDS_IN_DAY() {
        return this.SECONDS_IN_HOUR * this.HOURS_IN_DAY;
    }

    /**
     * Number of seconds in a week.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.0
     *
     */
    static get SECONDS_IN_WEEK() {
        return this.SECONDS_IN_DAY * this.DAYS_IN_WEEK;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Minutes

    /**
     * Number of minutes in a day.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.3
     *
     */
    static get MINUTES_IN_DAY() {
        return this.MINUTES_IN_HOUR * this.HOURS_IN_DAY;
    }

    /**
     * Number of minutes in a week.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.3
     *
     */
    static get MINUTES_IN_WEEK() {
        return this.MINUTES_IN_DAY * this.DAYS_IN_WEEK;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Hours

    /**
     * Number of hours in a week.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.5.3
     *
     */
    static get HOURS_IN_WEEK() {
        return this.HOURS_IN_DAY * this.DAYS_IN_WEEK;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * 
     * @param {Number} years 
     * @param {Number} months 
     * @param {Number} days 
     * @param {Number} hours 
     * @param {Number} minutes 
     * @param {Number} seconds 
     * @param {Number} milliseconds 
     * 
     * @private
     * 
     * @since 4.5.0
     * 
     */
    static #createDurationObject(years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        const _do = {
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            milliseconds
        };

        let _dmArr = [];

        if (_do.years > 0) {
            _dmArr.push(`${_do.years} year${(_do.years > 1) ? "s" : ""}`);
        }

        if (_do.months > 0) {
            _dmArr.push(`${_do.months} month${(_do.months > 1) ? "s" : ""}`);
        }

        if (_do.days > 0) {
            _dmArr.push(`${_do.days} day${(_do.days > 1) ? "s" : ""}`);
        }

        if (_do.hours > 0) {
            _dmArr.push(`${_do.hours} hour${(_do.hours > 1) ? "s" : ""}`);
        }

        if (_do.minutes > 0) {
            _dmArr.push(`${_do.minutes} minute${(_do.minutes > 1) ? "s" : ""}`);
        }

        if (_do.seconds > 0) {
            _dmArr.push(`${_do.seconds} second${(_do.seconds > 1) ? "s" : ""}`);
        }

        return {
            firstDateIsAfter: false,
            durationRawObject: _do,
            durationString: _dmArr.join(" ")
        };
    }

    /**
     * Humanises the duration, approximately. This is <strong>not</strong> an accurate representation.
     *
     * Note: This function assumes a year of 365 days and a month of 30 days.
     *
     * @param {Number} duration to be humanised
     * @param {String} [unit="ms"] the unit level of the duration to be humanised
     *
     * @returns {Object} Returns an object with <code>durationObject</code> and string representation.
     *
     * @throws {TypeError} for invalid arguments
     * @throws {RangeError} for invalid unit string
     *
     * @since 4.5.0
     *
     */
    static humanize(duration, unit = "ms") {
        const parent = this;

        if (!mindsmine.Number.isNumber(duration)) {
            throw new TypeError("Fatal Error. 'duration'. @ERROR_PERMITTED_NUMBER@");
        }

        if (duration <= 0) {
            throw new RangeError("Fatal Error. 'duration'. Duration should be a non-zero positive number.");
        }

        if (!parent.#isSupportedUnit(unit)) {
            throw new RangeError(`Fatal Error. 'unit'. Unsupported '${unit}' argument`);
        }

        switch (parent.#normaliseUnit(unit)) {
            case "d":
                if (duration === 31) {
                    return parent.#createDurationObject(0, 1);
                }

                if (duration === 366) {
                    return parent.#createDurationObject(1);
                }

                break;
            
            case "w":
                if (duration === 52) {
                    return parent.#createDurationObject(1);
                }

                break;
            
            case "M":
                if (duration === 12) {
                    return parent.#createDurationObject(1);
                }

                break;
        }

        let durationInMS = duration * parent.#getMillisecondsInAUnit(unit);

        let _diffYears = Math.floor(durationInMS / parent.MILLISECONDS_IN_YEAR);
        durationInMS %= parent.MILLISECONDS_IN_YEAR;

        let _diffMonths = Math.floor(durationInMS / parent.MILLISECONDS_IN_MONTH);
        durationInMS %= parent.MILLISECONDS_IN_MONTH;

        let _diffDays = Math.floor(durationInMS / parent.MILLISECONDS_IN_DAY);
        durationInMS %= parent.MILLISECONDS_IN_DAY;

        let _diffHours = Math.floor(durationInMS / parent.MILLISECONDS_IN_HOUR);
        durationInMS %= parent.MILLISECONDS_IN_HOUR;

        let _diffMinutes = Math.floor(durationInMS / parent.MILLISECONDS_IN_MINUTE);
        durationInMS %= parent.MILLISECONDS_IN_MINUTE;

        let _diffSeconds = Math.floor(durationInMS / parent.MILLISECONDS_IN_SECOND);
        durationInMS %= parent.MILLISECONDS_IN_SECOND;

        let _diffMilliseconds = durationInMS;

        return parent.#createDurationObject(
            _diffYears,
            _diffMonths,
            _diffDays,
            _diffHours,
            _diffMinutes,
            _diffSeconds,
            _diffMilliseconds
        );
    }

    /**
     * 
     * @param {Date} dateObj1 
     * @param {Date} dateObj2 
     */
    static preciseDiff(dateObj1, dateObj2) {
        const parent = this;

        let firstDateIsAfter = false;

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        if (!mindsmine.Date.isDate(dateObj1)) {
            throw new TypeError("Fatal Error. 'dateObj1'. @ERROR_PERMITTED_DATE@");
        }

        if (!mindsmine.Date.isDate(dateObj2)) {
            throw new TypeError("Fatal Error. 'dateObj2'. @ERROR_PERMITTED_DATE@");
        }

        // Matching the timezone offset for both dates
        dateObj1.setMinutes(dateObj1.getMinutes() - (dateObj2.getTimezoneOffset() - dateObj1.getTimezoneOffset()));

        if (dateObj1.valueOf() === dateObj2.valueOf()) {
            return parent.#createDurationObject();
        }

        if (dateObj1 > dateObj2) {
            [dateObj1, dateObj2] = [dateObj2, dateObj1];
            firstDateIsAfter = true;
        }

        let _diffYears = dateObj2.getFullYear() - dateObj1.getFullYear();
        let _diffMonths = dateObj2.getMonth() - dateObj1.getMonth();
        let _diffDays = dateObj2.getDate() - dateObj1.getDate();
        let _diffHours = dateObj2.getHours() - dateObj1.getHours();
        let _diffMinutes = dateObj2.getMinutes() - dateObj1.getMinutes();
        let _diffSeconds = dateObj2.getSeconds() - dateObj1.getSeconds();

        if (_diffSeconds < 0) {
            _diffSeconds += 60;
            _diffMinutes--;
        }

        if (_diffMinutes < 0) {
            _diffMinutes += 60;
            _diffHours--;
        }

        if (_diffHours < 0) {
            _diffHours += 24;
            _diffDays--;
        }

        if (_diffDays < 0) {
            const _currentMonth = new Date(dateObj2.getFullYear(), dateObj2.getMonth());

            const daysInLastFullMonth = new Date(_currentMonth.getFullYear(), _currentMonth.getMonth(), 0).getDate();

            if (daysInLastFullMonth < dateObj1.getDate()) {
                _diffDays = daysInLastFullMonth + _diffDays + (dateObj1.getDate() - daysInLastFullMonth);
            } else {
                _diffDays = daysInLastFullMonth + _diffDays;
            }

            _diffMonths--;
        }

        if (_diffMonths < 0) {
            _diffMonths += 12;
            _diffYears--;
        }

        const _durationObject = parent.#createDurationObject(_diffYears, _diffMonths, _diffDays, _diffHours, _diffMinutes, _diffSeconds);

        _durationObject.firstDateIsAfter = firstDateIsAfter;

        return _durationObject;
    }
};
