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
 * A collection of useful static methods to deal with JavaScript booleans.
 *
 * @since 1.0.0
 *
 */
mindsmine.Boolean = class {
    /**
     * Returns a non-null boolean, even if the object being passed is a null boolean.
     *
     * If the passed-in object is a non-null boolean, then it is returned as-is.
     *
     * Example usage:
     *
     *      var bool1 = true;
     *      var bool2 = null;
     *
     *      var bool3 = mindsmine.Boolean.getNullSafe(bool1);
     *
     *      var bool4 = mindsmine.Boolean.getNullSafe(bool2);
     *
     *      // bool3 now contains the boolean: true
     *      // bool4 now contains the boolean: false
     *
     * @param {Boolean} bool The boolean to safeguard against <code>null</code>.
     *
     * @returns {Boolean} If bool is <code>null</code> then <code>false</code>.
     *
     * @since 1.0.0
     *
     */
    static getNullSafe(bool) {
        if (bool != null && typeof bool === "boolean") {
            return bool;
        }

        return false;
    }
};
