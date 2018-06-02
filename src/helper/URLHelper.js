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
            let _url = new URL(url);
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
     * @since 3.5.0
     *
     */
    static appendQuery(url, param, value) {
        if (!this.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        if (mindsmine.String.isEmpty(param)) {
            throw new TypeError("Fatal Error. 'param'. @ERROR_PERMITTED_STRING@");
        }

        let _url = new URL(url);

        _url.searchParams.append(param, value);

        return _url.href;
    }
};
