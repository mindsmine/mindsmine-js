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

/*
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *                    * * * NOTICE * * *
 *                          ++++++
 *
 * CODE BELOW THIS LINE SHOULD NOT BE MODIFIED. THIS FILE IS A
 * BUILD TEMPLATE PURPOSEFULLY WRITTEN TO WORK WITH THE BUILD
 * PROCESS. ANY CHANGE TO THIS FILE ** WILL ** BREAK THE BUILD
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

/*! Copyright 2008-present Shaiksphere, Inc.  All rights reserved. @PRODUCT_NAME@ @PRODUCT_VERSION@ @BUILD_TIMESTAMP@ */

"use strict";

/*
 * In case it doesn't exist already.
 *
 */
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}

/*
 * In case it doesn't exist already.
 *
 */
if (!Array.from) {
    Array.from = (function () {
        let toStr = Object.prototype.toString;

        let isCallable = function (fn) {
            return typeof fn === "function" || toStr.call(fn) === "[object Function]";
        };

        let toInteger = function (value) {
            let number = Number(value);

            if (isNaN(number)) {
                return 0;
            }

            if (number === 0 || !isFinite(number)) {
                return number;
            }

            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };

        let maxSafeInteger = Math.pow(2, 53) - 1;

        let toLength = function (value) {
            let len = toInteger(value);

            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            let C = this;

            // 2. Let items be ToObject(arrayLike).
            let items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
            }

            // 4. If mapfn is undefined, then let mapping be false.
            let mapFn = arguments.length > 1 ? arguments[1] : void undefined;

            let T;

            if (typeof mapFn !== "undefined") {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError("Array.from: when provided, the second argument must be a function");
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            let len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            let A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            let k = 0;

            // 17. Repeat, while k < len… (also steps a - h)
            let kValue;

            while (k < len) {
                kValue = items[k];

                if (mapFn) {
                    A[k] = typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }

                k += 1;
            }

            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;

            // 20. Return A.
            return A;
        };
    }());
}

/*
 * In case it doesn't exist already.
 *
 */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, "startsWith", {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;

            return this.substring(pos, pos + search.length) === search;
        }
    });
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }

        return this.substring(this_len - search.length, this_len) === search;
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        "use strict";

        if (typeof start !== "number") {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        }

        return this.indexOf(search, start) !== -1;
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        "use strict";

        if (this == null) {
            throw new TypeError(`can"t convert ${this} to object`);
        }

        let str = "" + this;

        count = +count;

        if (count !== count) {
            count = 0;
        }

        if (count < 0) {
            throw new RangeError("repeat count must be non-negative");
        }

        if (count === Infinity) {
            throw new RangeError("repeat count must be less than infinity");
        }

        count = Math.floor(count);

        if (str.length === 0 || count === 0) {
            return "";
        }

        // Ensuring count is a 31-bit integer allows us to heavily optimize the main part. But anyway, most current
        // (August 2014) browsers can"t handle strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError("repeat count must not overflow maximum string size");
        }

        let maxCount = str.length * count;

        count = Math.floor(Math.log(count) / Math.log(2));

        while (count) {
            str += str;
            count--;
        }

        str += str.substring(0, maxCount - str.length);

        return str;
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== "undefined" ? padString : " ");

        if (this.length >= targetLength) {
            return String(this);
        }

        targetLength = targetLength - this.length;

        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }

        return padString.slice(0, targetLength) + String(this);
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== "undefined" ? padString : " "));

        if (this.length > targetLength) {
            return String(this);
        }

        targetLength = targetLength-this.length;

        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
        }

        return String(this) + padString.slice(0,targetLength);
    };
}

/**
 * The mindsmine namespace (global object) encapsulates classes, singletons, and utility methods provided
 * by @PRODUCT_NAME@ library.
 *
 * Common utility functions (such as extensions to native JavaScript objects) are provided as direct properties of the
 * mindsmine namespace.
 *
 * @since 1.0
 *
 */
class mindsmine {
    /**
     * Name of the product.
     *
     * @constant
     *
     * @returns {String} Name of the product.
     *
     * @since 1.0.0
     *
     */
    static get productName() {
        return "@PRODUCT_NAME@";
    }

    /**
     * Version of the product.
     *
     * @constant
     *
     * @returns {String} Version of the product.
     *
     * @since 1.0.0
     *
     */
    static get productVersion() {
        return "@PRODUCT_VERSION@";
    }

    /**
     * Build timestamp of the product.
     *
     * @constant
     *
     * @returns {String} Build timestamp of the product.
     *
     * @since 1.0.0
     *
     */
    static get productBuild() {
        return "@BUILD_TIMESTAMP@";
    }
}

//_CONCATENATED_HELPER_CODE

mindsmine = mindsmine.Object.freeze(mindsmine, true);

// Export the mindsmine object for NodeJS. For browser, add `mindsmine` as a global object
if (typeof exports !== "undefined" && !exports.nodeType) {
    if (typeof module !== "undefined" && !module.nodeType && module.exports) {
        module.exports = mindsmine;
    }

    exports.mindsmine = mindsmine;
} else {
    let base = typeof window === "object" && window.window === window && window || this || {};

    base.mindsmine = mindsmine;
}

/*
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *                    * * * NOTICE * * *
 *                          ++++++
 *
 * CODE ABOVE THIS LINE SHOULD NOT BE MODIFIED. THIS FILE IS A
 * BUILD TEMPLATE PURPOSEFULLY WRITTEN TO WORK WITH THE BUILD
 * PROCESS. ANY CHANGE TO THIS FILE ** WILL ** BREAK THE BUILD
 *
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
