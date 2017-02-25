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
 * @since 1.0.0
 *
 */
mindsmine.Number = class {
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
     * @returns {Number} If num is <code>null</code> then {@link @MDN_JS_URI@/Number/NEGATIVE_INFINITY|Number.NEGATIVE_INFINITY}.
     *
     * @since 1.0.0
     *
     */
    static getNullSafe(num) {
        if (num != null && typeof num === "number") {
            return num;
        }

        return Number.NEGATIVE_INFINITY;
    }

    /**
     * Returns an array of pseudorandom int values between the specified lower bound (inclusive) and the specified upper
     * bound (exclusive).
     *
     * @see {@link @MDN_JS_URI@/Math/random|Math.random()}
     * @see {@link @MDN_JS_URI@/Set|Set}
     * @see {@link @MDN_JS_URI@/Array/from|Array.from()}
     *
     * @param {Number} lowerBound the least value returned
     * @param {Number} upperBound the upper bound (exclusive)
     * @param {Number} arraySize the number of unique random numbers expected
     *
     * @returns {Array} an array of pseudorandom integer values between the lower bound (inclusive) and the upper bound
     * (exclusive).
     *
     * @throws {TypeError} if any of the arguments are not numbers
     *
     * @throws {Error} if any of the arguments are negative integers
     *
     * @throws {Error} if lower bound is greater than or equal to upper bound
     *
     * @since 2.1.0
     *
     */
    static getUniqueRandomNumbers(lowerBound, upperBound, arraySize) {
        if (
            lowerBound == null || typeof lowerBound !== "number" ||
            upperBound == null || typeof upperBound !== "number" ||
            arraySize == null || typeof arraySize !== "number"
        ) {
            throw new TypeError("@ERROR_PERMITTED_NUMBER@");
        }

        if (lowerBound < 0 || upperBound < 0 || arraySize < 0) {
            throw new Error("Negative number is not allowed as an argument.");
        }

        if (lowerBound >= upperBound) {
            throw new Error("Lower Bound cannot be larger than Upper Bound.");
        }

        if (arraySize > upperBound || arraySize > (upperBound - lowerBound)) {
            throw new Error("Not enough unique numbers available for the array size.");
        }

        let set = new Set();

        while (set.size < arraySize) {
            let num = Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;

            set.add(num);
        }

        return Array.from(set);
    }

    /**
     * Returns the number of digits in the passed in number
     *
     * @param {Number} num for which to count the number of digits in
     *
     * @returns {Number} number of digits
     *
     * @since 2.1.0
     *
     */
    static getNumOfDigits(num) {
        if (num == null || typeof num !== "number") {
            throw new TypeError("@ERROR_PERMITTED_NUMBER@");
        }

        if (num == 0) {
            return 1;
        }

        return Math.floor(Math.log10(Math.abs(num))) + 1;
    }
};
