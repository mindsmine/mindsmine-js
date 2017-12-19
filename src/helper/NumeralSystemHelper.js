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
    static convert(value, from, to) {
        return parseInt(value, from).toString(to);
    }
    static convertDecimalToHexadecimal(integer) {
        return this.convert(integer, 10, 16);
    }

    static convertDecimalToBinary(integer) {
        return this.convert(integer, 10, 2);
    }

    static convertDecimalToOctal(integer) {
        return this.convert(integer, 10, 8);
    }

    static convertBinaryToHexadecimal(binaryStr) {
        return this.convert(binaryStr, 2, 16);
    }

    static convertBinaryToOctal(binaryStr) {
        return this.convert(binaryStr, 2, 8);
    }

    static convertBinaryToDecimal(binaryStr) {
        return this.convert(binaryStr, 2, 10);
    }

    static convertHexadecimalToBinary(hexStr) {
        return this.convert(hexStr, 16, 2);
    }

    static convertHexadecimalToOctal(hexStr) {
        return this.convert(hexStr, 16, 8);
    }

    static convertHexadecimalToDecimal(hexStr) {
        return this.convert(hexStr, 16, 10);
    }

    static convertOctalToBinary(octalStr) {
        return this.convert(octalStr, 8, 2);
    }

    static convertOctalToHexadecimal(octalStr) {
        return this.convert(octalStr, 8, 16);
    }

    static convertOctalToDecimal(octalStr) {
        return this.convert(octalStr, 8, 10);
    }
};
