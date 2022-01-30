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
     * @since 4.6.0
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
     * @since 4.6.0
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
     * @since 4.6.0
     *
     */
    static get DAYS_IN_WEEK() {
        return 7;
    }

    /**
     * Number of months in a year.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 4.6.0
     *
     */
    static get MONTHS_IN_YEAR() {
        return 12;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Utility Functions

    /**
     * Supported units
     *
     * @since 4.6.0
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
     * @since 4.6.0
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
     * @since 4.6.0
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
     * @since 4.6.0
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
     * @since 4.6.0
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
     * @since 4.6.0
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
     * @since 4.6.0
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
     * Approximately converts the length of duration into a human readable string.
     *
     * Note: This is <strong>not</strong> an accurate representation. This function assumes a year of 365 days and a month of 30 days.
     *
     * @param {Number} duration to be converted into a human readable string
     * @param {String} [unit="ms"] the unit level of the duration to be converted
     * @param {Boolean} [json=false] whether to return JSON object instead of string
     *
     * @returns {String|Object} Human readable string for the duration, by default. JSON representation when flag is set.
     *
     * @throws {TypeError} for invalid arguments
     * @throws {RangeError} for invalid unit level
     *
     * @since 4.6.0
     *
     */
    static humanreadable(duration, unit = "ms", json = false) {
        const _humanise = this.humanize(duration, unit);

        if (json) {
            return _humanise.durationRawObject;
        }

        return _humanise.durationString;
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
     * @deprecated Use {@link mindsmine.Duration#humanreadable}
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
     * @param {Date} refDate 
     * @param {Number} change 
     *
     * @returns {Number}
     *
     * @since 4.6.0
     *
     */
    static #getPreciseDays(refDate, change) {
        let prevTime = refDate.getTime();

        refDate.setMonth(refDate.getMonth() + change);

        return Math.round((refDate.getTime() - prevTime) / this.MILLISECONDS_IN_DAY);
    }

    /**
     * 
     * @param {Date} startDate 
     * @param {Date} endDate 
     * @param {Boolean} json 
     *
     * @since 4.5.0
     *
     */
    static preciseDiff(startDate, endDate) {
        const parent = this;

        let _startIsAfterEnd = false;

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        if (!mindsmine.Date.isDate(startDate)) {
            throw new TypeError("Fatal Error. 'startDate'. @ERROR_PERMITTED_DATE@");
        }

        if (!mindsmine.Date.isDate(endDate)) {
            throw new TypeError("Fatal Error. 'endDate'. @ERROR_PERMITTED_DATE@");
        }

        if (startDate > endDate) {
            [startDate, endDate] = [endDate, startDate];
            _startIsAfterEnd = true;
        }

        const _dO = {};

        _dO.refDate = new Date(startDate.getFullYear(), startDate.getMonth(), 15, 12, 0, 0);

        _dO.years = endDate.getFullYear() - startDate.getFullYear();
        _dO.months = endDate.getMonth() - startDate.getMonth();
        _dO.days = endDate.getDate() - startDate.getDate();
        _dO.hours = endDate.getHours() - startDate.getHours();
        _dO.minutes = endDate.getMinutes() - startDate.getMinutes();
        _dO.seconds = endDate.getSeconds() - startDate.getSeconds();
        _dO.milliseconds = endDate.getMilliseconds() - startDate.getMilliseconds();

        let _multiplier;

        if (_dO.seconds < 0) {

            _multiplier = Math.ceil(-_dO.seconds / parent.SECONDS_IN_MINUTE);

            _dO.minutes -= _multiplier;
            _dO.seconds += _multiplier * parent.SECONDS_IN_MINUTE;

        } else if (_dO.seconds >= parent.SECONDS_IN_MINUTE) {

            _dO.minutes += Math.floor(_dO.seconds / parent.SECONDS_IN_MINUTE);
            _dO.seconds %= parent.SECONDS_IN_MINUTE;

        }

        if (_dO.minutes < 0) {

            _multiplier = Math.ceil(-_dO.minutes / parent.MINUTES_IN_HOUR);

            _dO.hours -= _multiplier;
            _dO.minutes += _multiplier * parent.MINUTES_IN_HOUR;

        } else if (_dO.minutes >= parent.MINUTES_IN_HOUR) {

            _dO.hours += Math.floor(_dO.minutes / parent.MINUTES_IN_HOUR);
            _dO.minutes %= parent.MINUTES_IN_HOUR;

        }

        if (_dO.hours < 0) {

            _multiplier = Math.ceil(-_dO.hours / parent.HOURS_IN_DAY);

            _dO.days -= _multiplier;
            _dO.hours += _multiplier * parent.HOURS_IN_DAY;

        } else if (_dO.hours >= parent.HOURS_IN_DAY) {

            _dO.days += Math.floor(_dO.hours / parent.HOURS_IN_DAY);
            _dO.hours %= parent.HOURS_IN_DAY;
        }

        while (_dO.days < 0) {
            _dO.months--;
            _dO.days += parent.#getPreciseDays(_dO.refDate, 1);
        }

        if (_dO.months < 0) {

            _multiplier = Math.ceil(-_dO.months / parent.MONTHS_IN_YEAR);

            _dO.years -= _multiplier;
            _dO.months += _multiplier * parent.MONTHS_IN_YEAR;

        } else if (_dO.months >= parent.MONTHS_IN_YEAR) {

            _dO.years += Math.floor(_dO.months / parent.MONTHS_IN_YEAR);
            _dO.months %= parent.MONTHS_IN_YEAR;

        }

        const _durationObject = parent.#createDurationObject(_dO.years, _dO.months, _dO.days, _dO.hours, _dO.minutes, _dO.seconds);

        _durationObject.firstDateIsAfter = _startIsAfterEnd;

        return _durationObject;
    }

    /**
     * 
     * @param {Date} startDate 
     * @param {Date} endDate 
     * @returns 
     */
    static simplePreciseDiff(startDate, endDate) {
        const parent = this;

        let _startIsAfterEnd = false;

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        if (!mindsmine.Date.isDate(startDate)) {
            throw new TypeError("Fatal Error. 'startDate'. @ERROR_PERMITTED_DATE@");
        }

        if (!mindsmine.Date.isDate(endDate)) {
            throw new TypeError("Fatal Error. 'endDate'. @ERROR_PERMITTED_DATE@");
        }

        if (startDate > endDate) {
            [startDate, endDate] = [endDate, startDate];
            _startIsAfterEnd = true;
        }

        const diff = new Date(endDate.getTime() - startDate.getTime());

        const _dO = {};

        _dO.years = diff.getUTCFullYear() - 1970;
        _dO.months = diff.getUTCMonth();
        _dO.days = diff.getUTCDate() - 1;
        _dO.hours = diff.getUTCHours();
        _dO.minutes = diff.getUTCMinutes();
        _dO.seconds = diff.getUTCSeconds();
        _dO.milliseconds = diff.getMilliseconds();

        const _durationObject = parent.#createDurationObject(_dO.years, _dO.months, _dO.days, _dO.hours, _dO.minutes, _dO.seconds);

        _durationObject.firstDateIsAfter = _startIsAfterEnd;

        return _durationObject;
    }
};
