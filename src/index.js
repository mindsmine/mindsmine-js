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
if(!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

/*
 * In case it doesn't exist already.
 *
 */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;

        return this.substr(position, searchString.length) === searchString;
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        let subjectString = this.toString();

        if (
            typeof position !== 'number' ||
            !isFinite(position) ||
            Math.floor(position) !== position ||
            position > subjectString.length
        ) {
            position = subjectString.length;
        }

        position -= searchString.length;

        let lastIndex = subjectString.lastIndexOf(searchString, position);

        return lastIndex !== -1 && lastIndex === position;
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';

        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

/*
 * In case it doesn't exist already
 *
 */
if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        'use strict';

        if (this == null) {
            throw new TypeError(`can't convert ${this} to object`);
        }

        let str = '' + this;

        count = +count;

        if (count != count) {
            count = 0;
        }

        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }

        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }

        count = Math.floor(count);

        if (str.length == 0 || count == 0) {
            return '';
        }

        // Ensuring count is a 31-bit integer allows us to heavily optimize the main part. But anyway, most current
        // (August 2014) browsers can't handle strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }

        let rpt = '';

        for (;;) {
            if ((count & 1) == 1) {
                rpt += str;
            }

            count >>>= 1;

            if (count == 0) {
                break;
            }

            str += str;
        }

        // Could we try:
        // return Array(count + 1).join(this);
        return rpt;
    }
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
if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
        module.exports = mindsmine;
    }

    exports.mindsmine = mindsmine;
} else {
    let base = typeof window === 'object' && window.window === window && window || this || {};

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
