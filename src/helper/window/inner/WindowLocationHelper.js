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
 * A collection of useful static methods to deal with JavaScript window.location object.
 *
 * @singleton
 *
 * @since 1.0
 *
 */
mindsmine.Window.Location = (function () {

    var __queryParams = {},
        __hashParams = {};

    if (window.location.search) {
        var queryParamPairs = window.location.search.substr(1).split("&");

        for (var i = 0; i < queryParamPairs.length; i++) {
            var queryPair = queryParamPairs[i].split("=");

            //
            // TODO Handle for multiple values for same parameter (hasOwnProperty)
            //
            __queryParams[queryPair[0]] = queryPair[1];
        }
    }

    if (window.location.hash) {
        var hashParamPairs = window.location.hash.substr(1).split("&");

        for (var j = 0; j < hashParamPairs.length; j++) {
            var hashPair = hashParamPairs[j].split("=");

            //
            // TODO Handle for multiple values for same parameter (hasOwnProperty)
            //
            if (hashPair.length == 1) {
                __hashParams[hashPair[0]] = true;
            } else {
                __hashParams[hashPair[0]] = hashPair[1];
            }
        }
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    return {

        /**
         * Retrieves the value of the query parameter.
         *
         * @param {String} queryParam The query parameter (case-sensitive) string whose value is to be retrieved.
         *
         * @returns {String/null} Returns <code>null</code> if unavailable.
         *
         * @throws {TypeError} If invalid argument
         *
         * @since 1.0
         *
         */
        getQueryParameter: function (queryParam) {
            if (mindsmine.String.isEmpty(queryParam)) {
                throw new TypeError("@ERROR_PERMITTED_STRING@");
            }

            if (__queryParams && __queryParams.hasOwnProperty(queryParam)) {
                return __queryParams[queryParam];
            }

            return null;
        },

        /**
         * Retrieves the value of the hash parameter.
         *
         * @param {String} hashParam The hash parameter (case-sensitive) string whose value is to be retrieved.
         *
         * @returns {String/null} Returns <code>null</code> if unavailable.
         *
         * @throws {TypeError} If invalid argument
         *
         * @since 1.0
         *
         */
        getHashParameter: function (hashParam) {
            if (mindsmine.String.isEmpty(hashParam)) {
                throw new TypeError("@ERROR_PERMITTED_STRING@");
            }

            if (__hashParams && __hashParams.hasOwnProperty(hashParam)) {
                return __hashParams[hashParam];
            }

            return null;
        }
    };
})();
