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
 * A collection of useful static methods to deal with JavaScript strings.
 *
 * @since 1.0.0
 *
 */
mindsmine.String = class {
    /**
     * Allows you to define a tokenised string and pass an arbitrary number of arguments to replace the tokens. Each
     * token must be unique, and must increment in the format <code>{0}</code>, <code>{1}</code>, etc.
     *
     * Example usage:
     *
     *      var str1 = "Hello";
     *      var str2 = "World";
     *
     *      var str3 = mindsmine.String.format("Let us combine {0} and {1} together.", str1, str2);
     *
     *      // str3 now contains the string: "Let us combine Hello and World together."
     *
     * @param {String} string The tokenised string to be formatted.
     * @param {...String} values The values to replace tokens <code>{0}</code>, <code>{1}</code>, etc. in order.
     *
     * @returns {String} The formatted string
     *
     * @since 1.0.0
     *
     */
    static format(format) {
        let args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    }

    /**
     * Convert certain characters (&, <, >, ' and ") to their HTML character equivalents for literal display in web
     * pages.
     *
     * @param {String} str The string to encode.
     *
     * @returns {String} The encoded text.
     *
     * @since 1.0.0
     *
     */
    static htmlEncode(str) {
        if (str != null && typeof str === "string") {
            let __firstParse = document.createElement("a").appendChild(document.createTextNode(str)).parentNode.innerHTML;

            return __firstParse.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        }

        return str;
    }

    /**
     * Convert certain characters (&, <, >, ' and ") from their HTML character equivalents.
     *
     * @param {String} str The string to decode.
     *
     * @returns {String} The decoded text.
     *
     * @since 1.0.0
     *
     */
    static htmlDecode(str) {
        if (str != null && typeof str === "string") {
            let __parser = document.createElement("a");
            __parser.innerHTML = str;

            return __parser.textContent;
        }

        return str;
    }

    /**
     * Returns <code>true</code> if the passed value is an empty string, false otherwise.
     *
     * The value is deemed to be an empty string if it is either:
     * <ul>
     *     <li><code>null</code></li>
     *     <li><code>undefined</code></li>
     *     <li>not a string</li>
     *     <li>a zero-length string</li>
     * </ul>
     *
     *
     * @param {Object} str The value to test.
     *
     * @returns {Boolean}
     *
     * @since 1.0.0
     *
     */
    static isEmpty(str) {
        return (str == null) || (typeof str !== "string") || (str.trim() === "");
    }

    /**
     * Appends content to the query string of a URL, handling logic for whether to place a question mark or ampersand.
     *
     * @param {String} url The URL to append to.
     * @param {String} query The content to append to the URL.
     *
     * @returns {String} The resulting URL
     *
     * @since 1.0.0
     *
     */
    static urlAppend(url, query) {
        if (!mindsmine.String.isEmpty(query)) {
            //
            // TODO Tokenise the URL and then apply the logic
            //
            return url + (url.indexOf("?") === -1 ? "?" : "&") + query;
        }

        return url;
    }

    /**
     * Returns a non-null string, even if the object being passed is a null string.
     *
     * If the passed-in object is a non-null string, then it is returned as-is.
     *
     * Example usage:
     *
     *      var str1 = "Hello";
     *      var str2 = null;
     *
     *      var str3 = mindsmine.String.getNullSafe(str1);
     *
     *      var str4 = mindsmine.String.getNullSafe(str2);
     *
     *      // str3 now contains the string: "Hello"
     *      // str4 now contains the string: ""
     *
     * @param {String} str The string to safeguard against <code>null</code>.
     *
     * @returns {String} If str is <code>null</code> then <code>""</code> (empty string).
     *
     * @since 1.0.0
     *
     */
    static getNullSafe(str) {
        if (str != null && typeof str === "string") {
            return str;
        }

        return "";
    }
};
