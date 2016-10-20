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
 * A collection of useful static methods to deal with JavaScript numbers.
 *
 * @singleton
 *
 * @since 1.0
 *
 */
mindsmine.Number = (function () {

    return {
        /**
         * Returns a non-null number, even if the object being passed is a null number.
         *
         * If the passed-in object is a non-null number, then it is returned as-is.
         *
         * Example usage:
         *
         *      var num1 = 10;
         *      var num2 = null;
         *
         *      var num3 = mindsmine.Number.getNullSafe(num1);
         *
         *      var num4 = mindsmine.Number.getNullSafe(num2);
         *
         *      // num3 now contains the number: 10
         *      // num4 now contains the number: -Infinity
         *
         * @param {Number} num The number to safeguard against <code>null</code>.
         *
         * @returns {Number} If num is <code>null</code> then {@link Number#NEGATIVE_INFINITY}.
         *
         * @since 1.0
         *
         */
        getNullSafe: function (num) {
            if (num != null && typeof num === "number") {
                return num;
            }

            return Number.NEGATIVE_INFINITY;
        }
    };
})();