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
 * @namespace mindsmine.URL
 *
 * @since 3.5.0
 *
 */
mindsmine.URL = class {
    /**
     * Returns <code>true</code> if the passed string is a valid URL, <code>false</code> otherwise.
     *
     * Example Usage:
     * ```javascript
     *      mindsmine.URL.isValidURL("http://userid@example.com")       //  true
     *      mindsmine.URL.isValidURL("www.example.com/main.html")       //  false
     * ```
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
     * Appends a specified key/value pair as a new search parameter.
     * 
     * If the same key is appended multiple times it will appear in the parameter string multiple times for each value.
     *
     * @see {@link @MDN_API_URI@/URLSearchParams/append|URLSearchParams append}
     *
     * @param {String} url The URL to append to.
     * @param {String} name The name of the parameter to append.
     * @param {Object} value The value of the parameter to append.
     *
     * @returns {String} The resulting URL
     *
     * @throws {TypeError} for Invalid URL or empty arguments
     *
     * @since 3.5.0
     *
     */
    static appendQuery(url, name, value = {}) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        if (mindsmine.String.isEmpty(name)) {
            throw new TypeError("Fatal Error. 'name'. @ERROR_PERMITTED_STRING@");
        }

        const _url = new URL(url);

        _url.searchParams.append(name, value);

        return _url.href;
    }

    /**
     * Returns an object containing the names of the search parameters as properties and values of the search parameters
     * as the property values.
     *
     * If the same parameter name exists multiple times, only the last parameter value will be returned.
     *
     * @see {@link @MDN_API_URI@/URL/search|URL search}
     * @see {@link @MDN_API_URI@/URLSearchParams/forEach|URLSearchParams forEach}
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

        const _url = new URL(url);

        if (!mindsmine.String.isEmpty(_url.search)) {
            const __queryParams = {};

            _url.searchParams.forEach((value, key) => {
                __queryParams[key] = value;
            });

            return __queryParams;
        }

        return null;
    }

    /**
     * Retrieves the first value associated to the given search parameter.
     *
     * @see {@link @MDN_API_URI@/URLSearchParams/get|URLSearchParams get}
     *
     * @param {String} url The URL to retrieve the search parameter from.
     * @param {String} name The name of the parameter to return.
     *
     * @returns {String|null} Returns the first value associated to the given search parameter.
     *
     * @throws {TypeError} for Invalid URL or empty arguments
     *
     * @since 3.6.5
     *
     */
    static getQueryParameter(url, name) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        if (mindsmine.String.isEmpty(name)) {
            throw new TypeError("Fatal Error. 'name'. @ERROR_PERMITTED_STRING@");
        }

        const _url = new URL(url);

        return _url.searchParams.get(name);
    }

    /**
     * Returns an object containing the names of the hash parameters as properties and values of the hash parameters
     * as the property values.
     *
     * If a hash parameter does not have an associated value, it is provided with a <code>true</code> value.
     *
     * If the same parameter name exists multiple times, only the last parameter value will be returned.
     *
     * @see {@link @MDN_API_URI@/URL/hash|URL hash}
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

        const _url = new URL(url);

        if (!mindsmine.String.isEmpty(_url.hash)) {
            const __hashParams = {};

            _url.hash.substring(1).split("&").forEach(p => {
                const pairs = p.split("=");

                if (pairs.length === 1) {
                    __hashParams[pairs[0]] = true;
                } else {
                    __hashParams[pairs[0]] = pairs[1];
                }
            });

            return __hashParams;
        }

        return null;
    }

    /**
     * Retrieves the value of the hash parameter.
     *
     * @see {@link @MDN_API_URI@/URL/hash|URL hash}
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
        if (mindsmine.String.isEmpty(hashParam)) {
            throw new TypeError("Fatal Error. 'hashParam'. @ERROR_PERMITTED_STRING@");
        }

        let __hashParams = this.getAllHashParameters(url);

        if (__hashParams && __hashParams.hasOwnProperty(hashParam)) {
            return __hashParams[hashParam];
        }

        return null;
    }
};
