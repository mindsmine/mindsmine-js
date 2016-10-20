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
        return this.replace(/^\s+|\s+$/g, '');
    };
}

/**
 * @class mindsmine
 *
 * The mindsmine namespace (global object) encapsulates classes, singletons, and utility methods provided
 * by @PRODUCT_NAME@ library.
 *
 * Common utility functions (such as extensions to native JavaScript objects) are provided as direct properties of the
 * mindsmine namespace.
 *
 * @singleton
 *
 * @since 1.0
 *
 */
var mindsmine = mindsmine || {};

/**
 * Name of the product.
 *
 * @property
 *
 * @readonly
 *
 * @since 1.0
 *
 */
mindsmine.productName = "@PRODUCT_NAME@";

/**
 * Version of the product.
 *
 * @property
 *
 * @readonly
 *
 * @since 1.0
 *
 */
mindsmine.productVersion = "@PRODUCT_VERSION@";

/**
 * Build timestamp of the product.
 *
 * @property
 *
 * @readonly
 *
 * @since 1.0
 *
 */
mindsmine.productBuild = "@BUILD_TIMESTAMP@";

//_CONCATENATED_HELPER_CODE

mindsmine = mindsmine.Object.freeze(mindsmine, true);

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