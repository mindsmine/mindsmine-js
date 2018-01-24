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
 * A collection of useful static methods to deal with numeral system.
 *
 * A numeral system is a writing system for expressing numbers; that is, a mathematical notation for representing
 * numbers of a given set, using digits or other symbols in a consistent manner.
 *
 * @see {@link @WIKI_URI@/Numeral_system|Numeral System (Wikipedia)}
 *
 * @since 3.1.0
 *
 */
mindsmine.NumeralSystem = class {

    /**
     * Returns a string representation of the first argument in the radix specified by the third argument from the radix
     * specified by the second argument.
     *
     * For radixes above <code>10</code>, the letters of the alphabet indicate numerals greater than <code>9</code>. For
     * example, for hexadecimal numbers (base 16), <code>a</code> through <code>f</code> are used.
     *
     * If the third argument is not specified, the preferred radix is assumed to be 10.
     *
     * If the first argument is negative, the sign is preserved. This is the case even if the radix is <code>2</code>;
     * the string returned is the positive binary representation of the first argument preceded by a <code>-</code> sign,
     * not the two's complement of the first argument.
     *
     * If the first argument is not a whole number, the 'dot' sign is used to separate the decimal places.
     *
     * @param {Object} value to be converted to the desired system.
     * @param {Number} from the radix to which the string representation is in.
     * @param {Number} [to=10] the radix to use in the string representation.
     *
     * @returns {String} a string representation of the argument in the specified radix.
     *
     * @since 3.1.0
     *
     */
    static convert(value, from, to = 10) {
        return parseInt(value, from).toString(to);
    }

    /**
     * Returns a string representation of the decimal value in base 16.
     *
     * @param {Object} obj decimal value to be converted to a string.
     *
     * @returns {String} the string representation in hexadecimal (base 16).
     *
     * @since 3.1.0
     *
     */
    static convertDecimalToHexadecimal(obj) {
        return this.convert(obj, 10, 16);
    }

    /**
     * Returns a string representation of the decimal value in base 2.
     *
     * @param {Object} obj decimal value to be converted to a string.
     *
     * @returns {String} the string representation in binary (base 2).
     *
     * @since 3.1.0
     *
     */
    static convertDecimalToBinary(obj) {
        return this.convert(obj, 10, 2);
    }

    /**
     * Returns a string representation of the decimal value in base 8.
     *
     * @param {Object} obj decimal value to be converted to a string.
     *
     * @returns {String} the string representation in octal (base 8).
     *
     * @since 3.1.0
     *
     */
    static convertDecimalToOctal(obj) {
        return this.convert(obj, 10, 8);
    }

    /**
     * Returns a string representation of the binary value in base 16.
     *
     * @param {Object} obj binary value to be converted to a string.
     *
     * @returns {String} the string representation in hexadecimal (base 16).
     *
     * @since 3.1.0
     *
     */
    static convertBinaryToHexadecimal(obj) {
        return this.convert(obj, 2, 16);
    }

    /**
     * Returns a string representation of the binary value in base 8.
     *
     * @param {Object} obj binary value to be converted to a string.
     *
     * @returns {String} the string representation in octal (base 8).
     *
     * @since 3.1.0
     *
     */
    static convertBinaryToOctal(obj) {
        return this.convert(obj, 2, 8);
    }

    /**
     * Returns a string representation of the binary value in base 10.
     *
     * @param {Object} obj binary value to be converted to a string.
     *
     * @returns {String} the string representation in decimal (base 10).
     *
     * @since 3.1.0
     *
     */
    static convertBinaryToDecimal(obj) {
        return this.convert(obj, 2, 10);
    }

    /**
     * Returns a string representation of the hexadecimal value in base 2.
     *
     * @param {Object} obj hexadecimal value to be converted to a string.
     *
     * @returns {String} the string representation in binary (base 2).
     *
     * @since 3.1.0
     *
     */
    static convertHexadecimalToBinary(obj) {
        return this.convert(obj, 16, 2);
    }

    /**
     * Returns a string representation of the hexadecimal value in base 8.
     *
     * @param {Object} obj hexadecimal value to be converted to a string.
     *
     * @returns {String} the string representation in octal (base 8).
     *
     * @since 3.1.0
     *
     */
    static convertHexadecimalToOctal(obj) {
        return this.convert(obj, 16, 8);
    }

    /**
     * Returns a string representation of the hexadecimal value in base 10.
     *
     * @param {Object} obj hexadecimal value to be converted to a string.
     *
     * @returns {String} the string representation in decimal (base 10).
     *
     * @since 3.1.0
     *
     */
    static convertHexadecimalToDecimal(obj) {
        return this.convert(obj, 16, 10);
    }

    /**
     * Returns a string representation of the octal value in base 2.
     *
     * @param {Object} obj octal value to be converted to a string.
     *
     * @returns {String} the string representation in binary (base 2).
     *
     * @since 3.1.0
     *
     */
    static convertOctalToBinary(obj) {
        return this.convert(obj, 8, 2);
    }

    /**
     * Returns a string representation of the octal value in base 16.
     *
     * @param {Object} obj octal value to be converted to a string.
     *
     * @returns {String} the string representation in hexadecimal (base 16).
     *
     * @since 3.1.0
     *
     */
    static convertOctalToHexadecimal(obj) {
        return this.convert(obj, 8, 16);
    }

    /**
     * Returns a string representation of the octal value in base 10.
     *
     * @param {Object} obj octal value to be converted to a string.
     *
     * @returns {String} the string representation in decimal (base 10).
     *
     * @since 3.1.0
     *
     */
    static convertOctalToDecimal(obj) {
        return this.convert(obj, 8, 10);
    }
};
