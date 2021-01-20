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
        return this.SECONDS_IN_MINUTE * 60;
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
        return this.SECONDS_IN_HOUR * 24;
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
        return this.SECONDS_IN_DAY * 7;
    }

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
        return this.SECONDS_IN_MINUTE * this.MILLISECONDS_IN_SECOND;
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
        return this.SECONDS_IN_HOUR * this.MILLISECONDS_IN_SECOND;
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
        return this.SECONDS_IN_DAY * this.MILLISECONDS_IN_SECOND;
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
        return this.SECONDS_IN_WEEK * this.MILLISECONDS_IN_SECOND;
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
        return this.MILLISECONDS_IN_DAY * 30;
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
        return this.MILLISECONDS_IN_DAY * 365;
    }
    
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
    static _createDurationObject(years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        let _firstDateIsAfter = false;

        const _do = {
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds
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

        const _ds = _dmArr.join(" ");

        return {
            firstDateIsAfter: _firstDateIsAfter,
            durationRawObject: _do,
            durationString: _ds
        };
    }

    /**
     * Humanises the duration.
     * 
     * @param {Number} duration to be humanised.
     * @param {String} [unit="ms"] the unit level at which to humanise the duration.
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

        /**
         * Converts the user provided unit into its normal form.
         * 
         * @param {String} enteredUnit Provided by the user
         * 
         * @returns {String}
         * 
         * @private
         * 
         * @since 4.5.0
         * 
         */
        function _normaliseUnit(enteredUnit) {
            const SHORT_UNIT_NAME = {
                ms: "millisecond",
                s: "second",
                m: "minute",
                h: "hour",
                d: "day",
                w: "week",
                M: "month",
                y: "year"
            };

            return SHORT_UNIT_NAME[enteredUnit] || mindsmine.String.getNullSafe(enteredUnit).toLowerCase().replace(/s$/, "");
        }

        /**
         * Returns the milliseconds in the normalised unit.
         * 
         * @param {String} normalisedUnit Normalised unit
         * 
         * @returns {Number|null}
         * 
         * @private
         * 
         * @since 4.5.0
         * 
         */
        function _convertUnitToMilliseconds(normalisedUnit) {
            const MILLISECONDS_IN_UNIT = {
                millisecond: 1,
                second: parent.MILLISECONDS_IN_SECOND,
                minute: parent.MILLISECONDS_IN_MINUTE,
                hour: parent.MILLISECONDS_IN_HOUR,
                day: parent.MILLISECONDS_IN_DAY,
                week: parent.MILLISECONDS_IN_WEEK,
                month: parent.MILLISECONDS_IN_MONTH,
                year: parent.MILLISECONDS_IN_YEAR
            };

            return MILLISECONDS_IN_UNIT[normalisedUnit];
        }

        /**
         * Handles the special case and returns the duration in milliseconds.
         * 
         * @param {Number} duration to be humanised.
         * @param {String} normalisedUnit Normalised unit
         * 
         * @returns {Number}
         * 
         * @private
         * 
         * @since 4.5.0
         * 
         */
        function _handleSpecialCase(duration, normalisedUnit) {
            if (duration === 12 && mindsmine.String.areEqual(normalisedUnit, "month")) {
                return parent.MILLISECONDS_IN_YEAR;
            }

            if (duration === 52 && mindsmine.String.areEqual(normalisedUnit, "week")) {
                return parent.MILLISECONDS_IN_YEAR;
            }

            if (duration === 366 && mindsmine.String.areEqual(normalisedUnit, "day")) {
                return parent.MILLISECONDS_IN_YEAR;
            }

            if (duration === 31 && mindsmine.String.areEqual(normalisedUnit, "day")) {
                return parent.MILLISECONDS_IN_MONTH;
            }

            return duration * _convertUnitToMilliseconds(normalisedUnit);
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        if (!mindsmine.Number.isNumber(duration)) {
            throw new TypeError("Fatal Error. 'duration'. @ERROR_PERMITTED_NUMBER@");
        }

        if (duration <= 0) {
            throw new RangeError("Fatal Error. 'duration'. Duration should be a non-zero positive number.");
        }

        if (mindsmine.String.isEmpty(unit)) {
            throw new TypeError("Fatal Error. 'unit'. @ERROR_PERMITTED_STRING@");
        }

        const normalisedUnit = _normaliseUnit(unit);

        const msInUnit = _convertUnitToMilliseconds(normalisedUnit);

        if (!mindsmine.Number.isNumber(msInUnit)) {
            throw new RangeError(`Fatal Error. 'unit'. Unsupported '${unit}' argument`);
        }

        let durationInMS = _handleSpecialCase(duration, normalisedUnit);

        let _diffYears = Math.floor(durationInMS / parent.MILLISECONDS_IN_YEAR);
        durationInMS %= parent.MILLISECONDS_IN_YEAR;

        let _diffMonths = Math.floor(durationInMS / parent.MILLISECONDS_IN_MONTH);
        durationInMS %= parent.MILLISECONDS_IN_MONTH;

        let _diffDates = Math.floor(durationInMS / parent.MILLISECONDS_IN_DAY);
        durationInMS %= parent.MILLISECONDS_IN_DAY;

        let _diffHours = Math.floor(durationInMS / parent.MILLISECONDS_IN_HOUR);
        durationInMS %= parent.MILLISECONDS_IN_HOUR;

        let _diffMinutes = Math.floor(durationInMS / parent.MILLISECONDS_IN_MINUTE);
        durationInMS %= parent.MILLISECONDS_IN_MINUTE;

        let _diffSeconds = Math.floor(durationInMS / parent.MILLISECONDS_IN_SECOND);
        durationInMS %= parent.MILLISECONDS_IN_SECOND;

        let _diffMilliseconds = durationInMS;

        return parent._createDurationObject(
            _diffYears,
            _diffMonths,
            _diffDates,
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
            return parent._createDurationObject();
        }

        if (dateObj1 > dateObj2) {
            [dateObj1, dateObj2] = [dateObj2, dateObj1];
            firstDateIsAfter = true;
        }

        let _diffYears = dateObj2.getFullYear() - dateObj1.getFullYear();
        let _diffMonths = dateObj2.getMonth() - dateObj1.getMonth();
        let _diffDates = dateObj2.getDate() - dateObj1.getDate();
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
            _diffDates--;
        }

        if (_diffDates < 0) {
            const _currentMonth = new Date(dateObj2.getFullYear(), dateObj2.getMonth());

            const daysInLastFullMonth = new Date(_currentMonth.getFullYear(), _currentMonth.getMonth(), 0).getDate();

            if (daysInLastFullMonth < dateObj1.getDate()) {
                _diffDates = daysInLastFullMonth + _diffDates + (dateObj1.getDate() - daysInLastFullMonth);
            } else {
                _diffDates = daysInLastFullMonth + _diffDates;
            }

            _diffMonths--;
        }

        if (_diffMonths < 0) {
            _diffMonths += 12;
            _diffYears--;
        }

        const _durationObject = parent._createDurationObject(_diffYears, _diffMonths, _diffDates, _diffHours, _diffMinutes, _diffSeconds);

        _durationObject.firstDateIsAfter = firstDateIsAfter;

        return _durationObject;
    }
};
