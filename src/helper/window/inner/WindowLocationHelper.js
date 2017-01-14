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
 * @since 1.0.0
 *
 */
mindsmine.Window.Location = class {

    /**
     * Returns an object containing the names of the search parameters as properties and values of the search parameters
     * as the property values.
     *
     * @returns {Object|null} Returns <code>null</code> if no search parameters exist.
     *
     * @since 2.0.0
     *
     */
    static getAllQueryParameters() {
        if (window.location.search) {
            let __queryParams = {};

            window.location.search.substr(1).split("&").forEach((p) => {
                const pairs = p.split("=");
                __queryParams[pairs[0]] = decodeURIComponent(pairs[1]);
            });

            return __queryParams;
        }

        return null;
    }

    /**
     * Retrieves the value of the query parameter.
     *
     * @param {String} queryParam The query parameter (case-sensitive) string whose value is to be retrieved.
     *
     * @returns {String|null} Returns <code>null</code> if unavailable.
     *
     * @throws {TypeError} If invalid argument
     *
     * @since 1.0.0
     *
     */
    static getQueryParameter(queryParam) {
        if (mindsmine.String.isEmpty(queryParam)) {
            throw new TypeError("@ERROR_PERMITTED_STRING@");
        }

        let __queryParams = this.getAllQueryParameters();

        if (__queryParams && __queryParams.hasOwnProperty(queryParam)) {
            return __queryParams[queryParam];
        }

        return null;
    }

    /**
     * Returns an object containing the names of the hash parameters as properties and values of the hash parameters
     * as the property values.
     *
     * If a hash parameter does not have an associated value, it is provided with a <code>true</code> value.
     *
     * @returns {Object|null} Returns <code>null</code> if no hash parameters exist.
     *
     * @since 2.0.0
     *
     */
    static getAllHashParameters() {
        if (window.location.hash) {
            let __hashParams = {};

            window.location.hash.substr(1).split("&").forEach((p) => {
                const pairs = p.split("=");
                if (pairs.length == 1) {
                    __hashParams[pairs[0]] = true;
                } else {
                    __hashParams[pairs[0]] = decodeURIComponent(pairs[1]);
                }
            });

            return __hashParams;
        }

        return null;
    }

    /**
     * Retrieves the value of the hash parameter.
     *
     * @param {String} hashParam The hash parameter (case-sensitive) string whose value is to be retrieved.
     *
     * @returns {String|null} Returns <code>null</code> if unavailable.
     *
     * @throws {TypeError} If invalid argument
     *
     * @since 1.0.0
     *
     */
    static getHashParameter(hashParam) {
        if (mindsmine.String.isEmpty(hashParam)) {
            throw new TypeError("@ERROR_PERMITTED_STRING@");
        }

        let __hashParams = this.getAllHashParameters();

        if (__hashParams && __hashParams.hasOwnProperty(hashParam)) {
            return __hashParams[hashParam];
        }

        return null;
    }
};
