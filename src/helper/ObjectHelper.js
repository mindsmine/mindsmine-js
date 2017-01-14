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
 * A collection of useful static methods to deal with JavaScript objects.
 *
 * @since 1.0.0
 *
 */
mindsmine.Object = class {
    /**
     * Freezes the given object making it immutable. This operation is by default shallow and does not affect objects
     * referenced by the given object.
     *
     * @param {Object} obj The object to freeze.
     * @param {Boolean} [deep=false] Pass <code>true</code> to freeze sub-objects recursively.
     *
     * @return {Object} The given object <code>obj</code>.
     *
     * @since 1.0.0
     *
     */
    static freeze(obj, deep) {
        let self = this;

        if (Object.freeze) {
            if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
                Object.freeze(obj);

                if (deep) {
                    for (let name in obj) {
                        if (obj.hasOwnProperty(name)) {
                            self.freeze(obj[name], deep);
                        }
                    }
                }
            }
        }

        return obj;
    }

    /**
     * Returns the first matching key corresponding to the given value.
     *
     * Example usage:
     *
     *      var obj1 = { "key1" : "value1", "key2" : "value2"};
     *
     *      var val1 = "value2";
     *
     *      var key = mindsmine.Object.getKey(obj1, val1);
     *
     *      // key now contains the object: "key2"
     *
     * @param {Object} obj The object from which to retrieve the key.
     *
     * @param {Object} value The value to find.
     *
     * @return {Object|null} First matching key. If no matching value is found, <code>null</code> is returned.
     *
     * @since 1.0.0
     *
     */
    static getKey(obj, value) {
        if (obj && typeof obj === "object") {
            for (let __prop in obj) {
                if (obj.hasOwnProperty(__prop) && obj[__prop] === value) {
                    return __prop;
                }
            }
        }

        return null;
    }

    /**
     * Copies the raw JSON object by value (instead of copy by reference).
     *
     * **NOTE**: Works on raw JSON objects alone.
     *
     * @param {Object} rawJSON To be copied by value.
     *
     * @return {Object} Newly copied by value object.
     *
     * @since 1.0.0
     *
     */
    static copyRawJSON(rawJSON) {
        if (rawJSON == null || typeof rawJSON !== "object") {
            return rawJSON;
        }

        return JSON.parse(JSON.stringify(rawJSON));
    }

    /**
     * Returns <code>true</code> if the passed value is a JavaScript primitive object - a string, number or boolean.
     *
     * @param {Object} value The value to test.
     *
     * @return {Boolean}
     *
     * @since 1.0.0
     *
     */
    static isPrimitive(value) {
        let type = typeof value;

        return type === 'string' || type === 'number' || type === 'boolean';
    }

    /**
     * Returns a non-null object, even if the object being passed is a null object.
     *
     * If the passed-in object is a non-null object, then it is returned as-is.
     *
     * Example usage:
     *
     *      var obj1 = { "key1" : "value1", "key2" : "value2"};
     *      var obj2 = null;
     *
     *      var obj3 = mindsmine.Object.getNullSafe(obj1);
     *
     *      var obj4 = mindsmine.Object.getNullSafe(obj2);
     *
     *      // obj3 now contains the object: { "key1" : "value1", "key2" : "value2"}
     *      // obj4 now contains the object: {}
     *
     * @param {Object} obj The object to safeguard against <code>null</code>.
     *
     * @return {Object} If obj is <code>null</code> then <code>{}</code> (empty object).
     *
     * @since 1.0.0
     *
     */
    static getNullSafe(obj) {
        if (obj && typeof obj === "object") {
            return obj;
        }

        return {};
    }
};
