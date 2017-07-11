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
 * A collection of useful static methods to deal with JavaScript functions.
 *
 * @since 3.0.0
 *
 */
mindsmine.Function = class {
    /**
     * Returns <code>true</code> if object is a Function
     *
     * Example usage:
     *
     *      mindsmine.Function.isFunction(null)           //  false
     *      mindsmine.Function.isFunction(undefined)      //  false
     *      mindsmine.Function.isFunction(NaN)            //  false
     *      mindsmine.Function.isFunction(100)            //  false
     *      mindsmine.Function.isFunction("")             //  false
     *      mindsmine.Function.isFunction("hello")        //  false
     *      mindsmine.Function.isFunction(true)           //  false
     *      mindsmine.Function.isFunction(function() {})  //  true
     *
     * @param {Object} obj The object to test
     *
     * @returns {Boolean} Whether or not the object is a Function
     *
     * @since 3.0.0
     *
     */
    static isFunction(obj) {
        return (obj != null && typeof obj === "function" && typeof obj.nodeType !== "number");
    }
};
