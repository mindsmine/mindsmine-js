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

        return this.getNullSafe(format).replace(
            /{(\d+)}/g,
            (match, number) => {
                return typeof args[number] !== "undefined" ? args[number] : match;
            }
        );
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
        if (!this.isEmpty(str)) {
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
        if (!this.isEmpty(str)) {
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
     *     <li><code>NaN</code></li>
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
     * @deprecated since 3.2.0, use <code>mindsmine.URL.appendQuery(url, param, value)</code> instead. Will be removed
     * in next major release.
     *
     * @see {@link mindsmine.URL.isValidURL}
     *
     */
    static urlAppend(url, query) {
        if (!this.isEmpty(query)) {
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
     *      mindsmine.String.getNullSafe(null)       //  ""
     *      mindsmine.String.getNullSafe(undefined)  //  ""
     *      mindsmine.String.getNullSafe(NaN)        //  ""
     *      mindsmine.String.getNullSafe(100)        //  ""
     *      mindsmine.String.getNullSafe("")         //  ""
     *      mindsmine.String.getNullSafe("hello")    //  hello
     *      mindsmine.String.getNullSafe(true)       //  ""
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

    /**
     * Returns <code>true</code> if the passed values are equal, <code>false</code> otherwise.
     *
     * <ul>
     *     <li>
     *         When the lenient flag is unset or is set to <code>true</code>, the comparison will ignore the case and
     *         trim the strings before comparing; the two strings are considered equal if,
     *         <ul>
     *             <li>Both strings are empty, as defined by {@link mindsmine.String.isEmpty}.</li>
     *             <li>
     *                 Trimmed versions of both strings, as defined by {@link @MDN_JS_URI@/String/Trim|String.prototype.trim()},
     *                 are equal.
     *             </li>
     *         </ul>
     *     </li>
     *     <li>
     *         When the lenient flag is set to <code>false</code>, the two strings are considered equal if,
     *         <ul>
     *             <li>Both strings are not null</li>
     *             <li>Both strings represent the same sequence of characters</li>
     *         </ul>
     *     </li>
     * </ul>
     *
     * Example usage:
     * 
     *      mindsmine.String.areEqual(null, null, true)       //  true
     *      mindsmine.String.areEqual(null, "", true)         //  true
     *      mindsmine.String.areEqual("", null, true)         //  true
     *      mindsmine.String.areEqual("", "", true)           //  true
     *      mindsmine.String.areEqual("   ", "", true)        //  true
     *      mindsmine.String.areEqual(" abc", "abc ", true)   //  true
     *      mindsmine.String.areEqual("", "abc", true)        //  false
     *      mindsmine.String.areEqual("ab c", "abc", true)    //  false
     *      mindsmine.String.areEqual("ABC", "abc", true)     //  true
     *      mindsmine.String.areEqual("abc", "abc", true)     //  true
     *
     *      mindsmine.String.areEqual(null, null)             //  true
     *      mindsmine.String.areEqual(null, "")               //  true
     *      mindsmine.String.areEqual("", null)               //  true
     *      mindsmine.String.areEqual("", "")                 //  true
     *      mindsmine.String.areEqual("   ", "")              //  true
     *      mindsmine.String.areEqual(" abc", "abc ")         //  true
     *      mindsmine.String.areEqual("", "abc")              //  false
     *      mindsmine.String.areEqual("ab c", "abc")          //  false
     *      mindsmine.String.areEqual("ABC", "abc")           //  true
     *      mindsmine.String.areEqual("abc", "abc")           //  true
     *
     *      mindsmine.String.areEqual(null, null, false)      //  false
     *      mindsmine.String.areEqual(null, "", false)        //  false
     *      mindsmine.String.areEqual("", null, false)        //  false
     *      mindsmine.String.areEqual("", "", false)          //  true
     *      mindsmine.String.areEqual("   ", "", false)       //  false
     *      mindsmine.String.areEqual(" abc", "abc ", false)  //  false
     *      mindsmine.String.areEqual("", "abc", false)       //  false
     *      mindsmine.String.areEqual("ab c", "abc", false)   //  false
     *      mindsmine.String.areEqual("ABC", "abc", false)    //  false
     *      mindsmine.String.areEqual("abc", "abc", false)    //  true
     *
     * @param {String} str1 to compare
     * @param {String} str2 to compare
     * @param {Boolean} [lenient=true] whether to be lenient or not
     *
     * @returns {Boolean} whether two strings are equal
     *
     * @since 2.1.0
     */
    static areEqual(str1, str2, lenient = true) {
        if (lenient) {
            return  this.isEmpty(str1) &&
                    this.isEmpty(str2) ||
                    !(this.isEmpty(str1) || this.isEmpty(str2)) &&
                    str1.trim().search(new RegExp(str2.trim(), "i")) > -1;
        }

        return str1 != null && str1 === str2;
    }

    /**
     * Returns <code>true</code> if the passed string is a palindrome, <code>false</code> otherwise.
     * 
     * A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward,
     * such as madam or kayak.
     * 
     * Convenience method equivalent to <code>mindsmine.String.areEqual(string, string.reverse, flag)</code>
     * 
     * Example usage:
     *
     *      mindsmine.String.isPalindrome(null, true)      //  true
     *      mindsmine.String.isPalindrome("", true)        //  true
     *      mindsmine.String.isPalindrome("   ", true)     //  true
     *      mindsmine.String.isPalindrome(" aba", true)    //  true
     *      mindsmine.String.isPalindrome("aba", true)     //  true
     *      mindsmine.String.isPalindrome("mAdAm", true)   //  true
     *      mindsmine.String.isPalindrome("madAm", true)   //  true
     *      mindsmine.String.isPalindrome("madam", true)   //  true
     *      mindsmine.String.isPalindrome("Madam", true)   //  true
     *      mindsmine.String.isPalindrome("hello", true)   //  false
     *
     *      mindsmine.String.isPalindrome(null)            //  true
     *      mindsmine.String.isPalindrome("")              //  true
     *      mindsmine.String.isPalindrome("   ")           //  true
     *      mindsmine.String.isPalindrome(" aba")          //  true
     *      mindsmine.String.isPalindrome("aba")           //  true
     *      mindsmine.String.isPalindrome("mAdAm")         //  true
     *      mindsmine.String.isPalindrome("madAm")         //  true
     *      mindsmine.String.isPalindrome("madam")         //  true
     *      mindsmine.String.isPalindrome("Madam")         //  true
     *      mindsmine.String.isPalindrome("hello")         //  false
     *
     *      mindsmine.String.isPalindrome(null, false)     //  false
     *      mindsmine.String.isPalindrome("", false)       //  true
     *      mindsmine.String.isPalindrome("   ", false)    //  true
     *      mindsmine.String.isPalindrome(" aba", false)   //  false
     *      mindsmine.String.isPalindrome("aba", false)    //  true
     *      mindsmine.String.isPalindrome("mAdAm", false)  //  true
     *      mindsmine.String.isPalindrome("madAm", false)  //  false
     *      mindsmine.String.isPalindrome("madam", false)  //  true
     *      mindsmine.String.isPalindrome("Madam", false)  //  false
     *      mindsmine.String.isPalindrome("hello", false)  //  false
     *
     * @see {@link mindsmine.String.areEqual}
     * @see {@link @WIKI_URI@/Palindrome|Palindrome (Wikipedia)}
     *
     * @param {String} str to check
     * @param {Boolean} [lenient=true] whether to be lenient or not
     * 
     * @returns {Boolean} if the string is a Palindrome
     * 
     * @since 2.1.0
     */
    static isPalindrome(str, lenient = true) {
        return this.areEqual(str, this.getNullSafe(str).split("").reverse().join(""), lenient);
    }
};
