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
 * A collection of useful static methods to deal with JavaScript arrays.
 *
 * @since 1.0.0
 *
 */
mindsmine.Array = class {
    /**
     * Returns a non-null array, even if the object being passed is a null array.
     *
     * If the passed-in object is a non-null array, then it is returned as-is.
     *
     * Example usage:
     *
     *      var arr1 = [1, 2, 3, 4];
     *      var arr2 = null;
     *
     *      var arr3 = mindsmine.Array.getNullSafe(arr1);
     *
     *      var arr4 = mindsmine.Array.getNullSafe(arr2);
     *
     *      // arr3 now contains the array: [1, 2, 3, 4]
     *      // arr4 now contains the array: []
     *
     * @param {Array} arr The array to safeguard against <code>null</code>.
     *
     * @returns {Array} If arr is <code>null</code> then <code>[]</code> (empty array).
     *
     * @since 1.0.0
     *
     */
    static getNullSafe(arr) {
        return (Array.isArray(arr)) ? arr : [];
    }
};
