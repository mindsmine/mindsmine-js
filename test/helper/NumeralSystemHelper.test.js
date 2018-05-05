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

const integer = 10;
const decimalStr = "10";
const hexStr = "A";
const octStr = "12";
const binaryStr = "1010";

test("convertDecimalToHexadecimal should convert decimal to hexadecimal", () => {
    expect(mindsmine.NumeralSystem.convertDecimalToHexadecimal(integer)).toMatch(new RegExp(hexStr, "i"));
});

test("convertDecimalToBinary should convert decimal to binary", () => {
    expect(mindsmine.NumeralSystem.convertDecimalToBinary(integer)).toBe(binaryStr);
});

test("convertDecimalToOctal should convert decimal to octal", () => {
    expect(mindsmine.NumeralSystem.convertDecimalToOctal(integer)).toBe(octStr);
});

test("convertBinaryToHexadecimal should convert binary to hexadecimal", () => {
    expect(mindsmine.NumeralSystem.convertBinaryToHexadecimal(binaryStr)).toMatch(new RegExp(hexStr, "i"));
});

test("convertBinaryToOctal should convert binary to octal", () => {
    expect(mindsmine.NumeralSystem.convertBinaryToOctal(binaryStr)).toBe(octStr);
});

test("convertBinaryToDecimal should convert binary to decimal", () => {
    expect(mindsmine.NumeralSystem.convertBinaryToDecimal(binaryStr)).toBe(decimalStr);
});

test("convertHexadecimalToBinary should convert hexadecimal to binary", () => {
    expect(mindsmine.NumeralSystem.convertHexadecimalToBinary(hexStr)).toBe(binaryStr);
});

test("convertHexadecimalToOctal should convert hexadecimal to octal", () => {
    expect(mindsmine.NumeralSystem.convertHexadecimalToOctal(hexStr)).toBe(octStr);
});

test("convertHexadecimalToDecimal should convert hexadecimal to decimal", () => {
    expect(mindsmine.NumeralSystem.convertHexadecimalToDecimal(hexStr)).toBe(decimalStr);
});

test("convertOctalToBinary should convert octal to binary", () => {
    expect(mindsmine.NumeralSystem.convertOctalToBinary(octStr)).toBe(binaryStr);
});

test("convertOctalToHexadecimal should convert octal to hexadecimal", () => {
    expect(mindsmine.NumeralSystem.convertOctalToHexadecimal(octStr)).toMatch(new RegExp(hexStr, "i"));
});

test("convertOctalToDecimal should convert octal to decimal", () => {
    expect(mindsmine.NumeralSystem.convertOctalToDecimal(octStr)).toBe(decimalStr);
});
