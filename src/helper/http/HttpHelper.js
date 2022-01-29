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
 * The http class encapsulates an HTTP connection to the page's originating domain, allowing requests to be made to a
 * URL specified at request time.
 *
 * @since 4.6.0
 *
 */
mindsmine.http = class {
    /**
     * Array of allowed HTTP methods.
     *
     * @constant
     *
     * @since 4.6.0
     *
     */
    static #ALLOWED_METHODS = [
        "GET",
        "HEAD",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];

    /**
     * Sends an HTTP request to a remote server and returns a Promise object. The Promise callback functions are passed
     * the XMLHttpRequest object containing the response data. See {@link @MDN_API_URI@/XMLHttpRequest|XMLHttpRequest}
     * for details about accessing elements of the response.
     *
     * @see {@link @MDN_API_URI@/fetch|fetch}
     *
     * Requests made by this method are by default asynchronous, and will return immediately. No data from the server
     * will be available to the statement immediately following this call.
     *
     * Example Usage:
     *
     *      mindsmine.http.request(
     *           "valid URI",
     *           {
     *                headers: {
     *                     "Accept" : "some value",
     *                     "Content-Type" : "some value",
     *                     "Authorization" : "some value"
     *                }
     *           }
     *      ).then((response) => {
     *
     *           response.json().then(responseJSON => {
     *                console.log(responseJSON);
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
     * 
     * 
     * 
     * 
     *      mindsmine.http.request(
     *           "GET",
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
     *           let responseJSON = JSON.parse(response.responseText);
     *           console.log(responseJSON);
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
     *
     * @param {String} url The destination URL where to send the request.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {String} [options.method=GET] The HTTP method to use for the request.
     *
     * @param {Object} [options.headers] Any headers to add to the request, contained in an object literal with String values.
     *
     * @param {Object|String} [options.body] Any body to add to the request. Note that a request using the <code>GET</code> or
     * <code>HEAD</code> method cannot have a body.
     *
     * @param {String} [options.mode=cors] The mode to use for the request: <code>cors</code>, <code>no-cors</code>,
     * <code>same-origin</code> or <code>navigate</code>.
     *
     * @param {String} [options.credentials=same-origin] The request credentials to use for the request: <code>omit</code>,
     * <code>same-origin</code> or <code>include</code>.
     *
     * @param {Function} [options.beforeRequest] The function to be called before a network request is made.
     *
     * @returns {Promise} A {@link @MDN_JS_URI@/Promise|Promise} that resolves to an
     * {@link @MDN_API_URI@/XMLHttpRequest|XMLHttpRequest} object.
     *
     * @throws {TypeError} If invalid arguments.
     *
     * @since 4.6.0
     *
     */
    static request(url, options) {
        const parent = this;

        if (mindsmine.String.isEmpty(url)) {
            throw new TypeError("Fatal Error. 'url'. @ERROR_PERMITTED_STRING@");
        }

        if (!mindsmine.URL.isValidURL(url)) {
            throw new TypeError("Fatal Error. 'url'. Invalid URL.");
        }

        options = mindsmine.Object.getNullSafe(options);

        let _method = mindsmine.String.getNullSafe(options.method).toUpperCase();

        if (mindsmine.String.isEmpty(_method)) {
            _method = "GET";
        }

        if (!parent.#ALLOWED_METHODS.includes(_method)) {
            throw new TypeError(`Fatal Error. 'method'. Allowed values are ${parent.#ALLOWED_METHODS.join(", ")}.`);
        }

        let __proceed = true;

        if (mindsmine.Function.isFunction(options.beforeRequest)) {
            const __retVal = options.beforeRequest.call(window);

            __proceed = (__retVal === null || __retVal === undefined || typeof __retVal !== "boolean") ? true : __retVal;
        }

        if (__proceed) {
            if (_method === "GET") {
                url = mindsmine.URL.appendQuery(url, "_dc", (new Date()).getTime());
            }

            const initObj = {};

            initObj.method = _method;

            if (options.headers) {
                initObj.headers = options.headers;
            }

            if (options.body) {
                initObj.body = options.body;
            }

            if (options.mode) {
                initObj.mode = options.mode;
            }

            if (options.credentials) {
                initObj.credentials = options.credentials;
            }

            return new Promise((resolve, reject) => {
                fetch(
                    url,
                    initObj
                ).then(response => {
                    //
                    // Fix IE issue - IE mangles status code 204
                    // https://prototype.lighthouseapp.com/projects/8886/tickets/129-ie-mangles-http-response-status-code-204-to-1223
                    //
                    if (response.ok || response.status === 1223 || response.status === 304) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch(error => {
                    reject(new Response(
                        error,
                        {
                            status: 500,
                            statusText: "Internal Server Error"
                        }
                    ));
                });
            });
        }
    }
};
