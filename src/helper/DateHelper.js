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
 * A collection of useful static methods to deal with JavaScript dates.
 *
 * @namespace mindsmine.Date
 *
 * @since 4.5.0
 *
 */
mindsmine.Date = class {
    /**
     * Returns <code>true</code> if object is a Date
     *
     * Example usage:
     * ```javascript
     *      mindsmine.Date.isDate(null)           //  false
     *      mindsmine.Date.isDate(undefined)      //  false
     *      mindsmine.Date.isDate(NaN)            //  false
     *      mindsmine.Date.isDate(100)            //  false
     *      mindsmine.Date.isDate("")             //  false
     *      mindsmine.Date.isDate("hello")        //  false
     *      mindsmine.Date.isDate(true)           //  false
     *      mindsmine.Date.isDate(function() {})  //  false
     *      mindsmine.Date.isDate([])             //  false
     *      mindsmine.Date.isDate({})             //  false
     *      mindsmine.Date.isDate(new Date())     //  true
     * ```
     *
     * @param {Object} obj The object to test
     *
     * @returns {Boolean} Whether or not the object is a Date
     *
     * @since 4.5.0
     *
     */
    static isDate(obj) {
        return (obj != null && typeof obj === "object" && obj instanceof Date);
    }
};
