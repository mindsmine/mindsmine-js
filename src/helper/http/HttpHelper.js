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
 * This class enhances the {@link @MDN_API_URI@/Fetch_API|Fetch API} by rejecting on HTTP error status, even for an HTTP <code>404</code>
 * or <code>500</code>.
 *
 * <u>Additional</u>: The {@link @MDN_API_URI@/Fetch_API|Fetch API} provides an interface for fetching resources (<em>including across
 * the network</em>). It will seem familiar to anyone who has used {@link @MDN_API_URI@/XMLHttpRequest|XMLHttpRequest}, but the new API
 * provides a more powerful and flexible feature set.
 *
 * <u>Problem with Fetch API</u>: The {@link @MDN_JS_URI@/Promise|Promise} returned from <code>fetch()</code> <strong>will not reject
 * on HTTP error status</strong> even if the response is an HTTP <code>404</code> or <code>500</code>. Instead, it will resolve normally
 * (with <code>ok</code> status set to <code>false</code>), and it will only reject on network failure or if anything prevented the
 * request from completing.
 *
 * @since 4.7.0
 *
 */
mindsmine.Http = class {
    /**
     * Provides an array of allowed HTTP methods.
     *
     * @constant
     *
     * @returns {String[]}
     *
     * @since 4.7.0
     *
     */
    static get #ALLOWED_METHODS() {
        return [
            "GET",
            "HEAD",
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
        ];
    }

    /**
     * Sends an HTTP request to a remote server and returns a Promise object.
     * 
     * The promise resolves to the {@link @MDN_API_URI@/Response|Response} object representing the response to the request.
     * 
     * This function enhances the global <code>{@link @MDN_API_URI@/fetch|fetch}</code> function by rejecting on HTTP error status, even
     * for an HTTP <code>404</code> or <code>500</code>.
     * 
     * <u>Problem with <code>fetch</code> function</u>: A <code>fetch()</code> promise only rejects when a network error is encountered
     * (which is usually when there is a permissions issue or similar). A <code>fetch()</code> promise does <em>not</em> reject on HTTP
     * errors (<code>404</code>, etc.). Instead, a <code>then()</code> handler must check the
     * <code>{@link @MDN_API_URI@/Response/ok|Response.ok}</code> and/or
     * <code>{@link @MDN_API_URI@/Response/status|Response.status}</code> properties.
     * 
     * Requests made by this method are by default asynchronous, and will return immediately. No data from the server will be available
     * to the statement immediately following this call.
     *
     * Example Usage:
     *
     *      mindsmine.Http.request(
     *           "valid URI",
     *           {
     *                headers: {
     *                     "Accept" : "some value",
     *                     "Content-Type" : "some value",
     *                     "Authorization" : "some value"
     *                }
     *           }
     *
     *      ).then((response) => {
     *
     *           console.log(`HTTP status code = ${response.status}`);
     *
     *           response.json().then(data => {
     *                console.log(data);
     *           });
     *
     *      }).catch((response) => {
     *
     *           console.log(`HTTP error code = ${response.status}`);
     *
     *      }).finally(() => {
     *
     *           console.log("This function is called regardless of success or failure.");
     *
     *      });
     *
     *
     * @param {String} url The URL to which to send the request.
     * 
     * @param {Object} [options] An object containing any custom settings to apply to the request. The possible options are:
     *
     * @param {String} [options.method="GET"] The request method to use. Supported values: <code>GET</code>, <code>HEAD</code>,
     * <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>.
     *
     * @param {Object} [options.headers] Any headers to add to the request, contained within an object literal with
     * {@link @MDN_JS_URI@/String|String} values. Note that {@link @MDN_GLOSSARY_URI@/Forbidden_header_name|some names are forbidden}.
     *
     * @param {Object} [options.jsonData] JSON data to add to the request body. Note that a request using the <code>GET</code> or
     * <code>HEAD</code> method cannot have a body.
     *
     * @param {String} [options.mode] The mode to use for the request, e.g., <code>cors</code>, <code>no-cors</code>,
     * <code>same-origin</code>, <code>navigate</code>, etc.
     *
     * @param {String} [options.credentials="same-origin"] Controls what browsers do with credentials
     * ({@link @MDN_WEB_URI@/HTTP/Cookies|cookies}, {@link @MDN_WEB_URI@/HTTP/Authentication|HTTP authentication} entries, and TLS
     * client certificates). Must be one of the following strings: <code>omit</code>, <code>same-origin</code> or <code>include</code>.
     *
     * @param {Function} [options.beforeRequest] The function to be called before a network request is made.
     *
     * @returns {Promise} The promise that resolves to the {@link @MDN_API_URI@/Response|Response} object representing the response to
     * the request.
     *
     * @throws {TypeError} If invalid arguments.
     *
     * @since 4.7.0
     *
     */
    static request(url, options = {}) {
        const parent = this;

        if (mindsmine.String.isEmpty(url)) {
            throw new TypeError("Fatal Error. 'url'. @ERROR_PERMITTED_STRING@");
        }

        if (!mindsmine.URL.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        options = mindsmine.Object.getNullSafe(options);

        if (mindsmine.String.isEmpty(options.method)) {
            options.method = "GET";
        }

        options.method = options.method.toUpperCase();

        if (!parent.#ALLOWED_METHODS.includes(options.method)) {
            throw new TypeError(`Fatal Error. 'method'. Allowed values are ${parent.#ALLOWED_METHODS.join(", ")}.`);
        }

        const initObj = {};

        initObj.method = options.method;

        if (options.headers) {
            initObj.headers = options.headers;
        }

        if (options.jsonData !== null || options.jsonData !== undefined) {
            if (["GET", "HEAD"].includes(options.method)) {
                throw new TypeError("Fatal Error. The request method is 'GET' or 'HEAD' but the body is non-null or not undefined.");
            }

            initObj.body = options.jsonData;
        }

        if (options.mode) {
            initObj.mode = options.mode;
        }

        if (options.credentials) {
            initObj.credentials = options.credentials;
        }

        let __proceed = true;

        if (mindsmine.Function.isFunction(options.beforeRequest)) {
            let __retVal = options.beforeRequest.call(window);

            __proceed = (__retVal === null || __retVal === undefined || typeof __retVal !== "boolean") ? true : __retVal;
        }

        if (__proceed) {
            return new Promise((resolve, reject) => {
                if (options.method === "GET") {
                    url = mindsmine.URL.appendQuery(url, "_dc", (new Date()).getTime());
                }

                fetch(url, initObj).then(response => {
                        if (response.ok) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                }).catch(error => {
                    reject(new Response(
                        error,
                        {
                            status: 500,
                            statusText: "Internal Server Error",
                            headers: options.headers
                        }
                    ));
                });
            });
        }
    }
};
