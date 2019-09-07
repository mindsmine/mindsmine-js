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
 * A collection of useful static methods to deal with JavaScript URLs.
 *
 * @since 3.5.0
 *
 */
mindsmine.URL = class {
    /**
     * Returns <code>true</code> if the passed string is a valid URL, <code>false</code> otherwise.
     *
     * Example Usage:
     *
     *      mindsmine.URL.isValidURL("http://userid@example.com")       //  true
     *      mindsmine.URL.isValidURL("www.example.com/main.html")       //  false
     *
     * @see {@link @MDN_API_URI@/URL|URL}
     *
     * @param {String} url to check
     *
     * @returns {Boolean} if the string is a valid URL
     *
     * @since 3.5.0
     *
     */
    static isValidURL(url) {
        if (mindsmine.String.isEmpty(url)) {
            return false;
        }

        try {
            new URL(url);
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * Appends content to the query string of a URL, handling logic for whether to place a question mark or ampersand.
     *
     * @see {@link @MDN_API_URI@/URL|URL}
     * @see {@link @MDN_API_URI@/URLSearchParams|URLSearchParams}
     *
     * @param {String} url The URL to append to.
     * @param {String} param The parameter key to append to the URL.
     * @param {Object} value The parameter value to append to the URL.
     *
     * @returns {String} The resulting URL
     *
     * @throws {TypeError} for Invalid URL or empty arguments
     *
     * @since 3.5.0
     *
     */
    static appendQuery(url, param, value = {}) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        if (mindsmine.String.isEmpty(param)) {
            throw new TypeError("Fatal Error. 'param'. @ERROR_PERMITTED_STRING@");
        }

        let _url = new URL(url);

        _url.searchParams.append(param, encodeURIComponent(value));

        return _url.href;
    }

    /**
     * Returns an object containing the names of the search parameters as properties and values of the search parameters
     * as the property values.
     *
     * @param {String} url The URL to retrieve the search parameters from.
     *
     * @returns {Object|null} Returns <code>null</code> if no search parameters exist.
     *
     * @throws {TypeError} for Invalid URL or empty arguments
     *
     * @since 3.6.5
     *
     */
    static getAllQueryParameters(url) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        let _url = new URL(url);

        if (!mindsmine.String.isEmpty(_url.search)) {
            let __queryParams = {};

            _url.search.substr(1).split("&").forEach(p => {
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
     * @param {String} url The URL to retrieve the search parameter from.
     * @param {String} queryParam The query parameter (case-sensitive) string whose value is to be retrieved.
     *
     * @returns {String|null} Returns <code>null</code> if unavailable.
     *
     * @throws {TypeError} for Invalid URL or empty arguments
     *
     * @since 3.6.5
     *
     */
    static getQueryParameter(url, queryParam) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        if (mindsmine.String.isEmpty(queryParam)) {
            throw new TypeError("Fatal Error. 'queryParam'. @ERROR_PERMITTED_STRING@");
        }

        let __queryParams = this.getAllQueryParameters(url);

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
     * @param {String} url The URL to retrieve the hash parameters from.
     *
     * @returns {Object|null} Returns <code>null</code> if no hash parameters exist.
     *
     * @throws {TypeError} for Invalid URL or empty arguments
     *
     * @since 3.6.5
     *
     */
    static getAllHashParameters(url) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        let _url = new URL(url);

        if (!mindsmine.String.isEmpty(_url.hash)) {
            let __hashParams = {};

            _url.hash.substr(1).split("&").forEach(p => {
                const pairs = p.split("=");

                if (pairs.length === 1) {
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
     * @param {String} url The URL to retrieve the hash parameter from.
     * @param {String} hashParam The hash parameter (case-sensitive) string whose value is to be retrieved.
     *
     * @returns {String|null} Returns <code>null</code> if unavailable.
     *
     * @throws {TypeError} for Invalid URL or empty arguments
     *
     * @since 3.6.5
     *
     */
    static getHashParameter(url, hashParam) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        if (mindsmine.String.isEmpty(hashParam)) {
            throw new TypeError("Fatal Error. 'hashParam'. @ERROR_PERMITTED_STRING@");
        }

        let __hashParams = this.getAllHashParameters();

        if (__hashParams && __hashParams.hasOwnProperty(hashParam)) {
            return __hashParams[hashParam];
        }

        return null;
    }
};
