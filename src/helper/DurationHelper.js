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
     * Humanises the duration.
     * 
     * @param {Number} duration to be humanised.
     * @param {String} [unit="ms"] the unit level at which to humanise the duration.
     * @param {Boolean} [asObject=false] whether to return as object or not.
     * 
     * @returns {Object|String|null} Returns <code>String</code> by default.
     * 
     * @throws {TypeError} for invalid arguments
     * @throws {RangeError} for invalid unit string
     * 
     * @since 4.5.0
     * 
     */
    static humanize(duration, unit = "ms", asObject = false) {
        const parent = this;

        asObject = mindsmine.Boolean.getNullSafe(asObject);

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

        let _do = {};

        _do.years = Math.floor(durationInMS / parent.MILLISECONDS_IN_YEAR);
        durationInMS %= parent.MILLISECONDS_IN_YEAR;

        _do.months = Math.floor(durationInMS / parent.MILLISECONDS_IN_MONTH);
        durationInMS %= parent.MILLISECONDS_IN_MONTH;

        _do.days = Math.floor(durationInMS / parent.MILLISECONDS_IN_DAY);
        durationInMS %= parent.MILLISECONDS_IN_DAY;

        _do.hours = Math.floor(durationInMS / parent.MILLISECONDS_IN_HOUR);
        durationInMS %= parent.MILLISECONDS_IN_HOUR;

        _do.minutes = Math.floor(durationInMS / parent.MILLISECONDS_IN_MINUTE);
        durationInMS %= parent.MILLISECONDS_IN_MINUTE;

        _do.seconds = Math.floor(durationInMS / parent.MILLISECONDS_IN_SECOND);
        durationInMS %= parent.MILLISECONDS_IN_SECOND;

        _do.milliseconds = durationInMS;

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

        if (asObject) {
            return _do;
        }

        return _dmArr.join(" ");
    }
};
