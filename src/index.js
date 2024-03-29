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

//_MORE_CODE

/**
 * The mindsmine namespace (global object) encapsulates classes, singletons, and utility methods provided
 * by @PRODUCT_NAME@ library.
 *
 * Common utility functions (such as extensions to native JavaScript objects) are provided as direct properties of the
 * mindsmine namespace.
 *
 * @namespace mindsmine
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
     * @memberof mindsmine
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
     * @memberof mindsmine
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
     * @memberof mindsmine
     *
     * @since 1.0.0
     *
     */
    static get productBuild() {
        return "@BUILD_TIMESTAMP@";
    }
}

//_CONCATENATED_HOLDER_CODE

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
