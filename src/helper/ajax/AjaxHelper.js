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
 * The Ajax class encapsulates an HTTP connection to the page's originating domain, allowing requests to be made to a
 * URL specified at request time.
 *
 * @deprecated since 4.6.0; use mindsmine.http instead.
 *
 * @since 1.0.0
 *
 */
mindsmine.Ajax = class {
    /**
     * Provides the default <code>timeout</code> (in milliseconds) for the Ajax calls.
     *
     * @constant
     *
     * @returns {Number}
     *
     * @since 1.0.0
     *
     */
    static get DEFAULT_TIMEOUT() {
        return 120000;
    }

    /**
     * Provides the default <code>async</code> value for the Ajax calls.
     *
     * @constant
     *
     * @returns {Boolean}
     *
     * @since 1.0.0
     *
     */
    static get DEFAULT_ASYNC() {
        return true;
    }

    /**
     * Returns the Ajax object based upon the browser.
     *
     * @constant
     *
     * @returns {XMLHttpRequest}
     *
     * @since 1.0.0
     *
     */
    static get XHRObject() {
        let trials = [
            () => {
                return new XMLHttpRequest();
            },
            () => {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            },
            () => {
                return new ActiveXObject("MSXML2.XMLHTTP");
            },
            () => {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        ];

        let xmlHttpRequest = null;

        for (let i = 0; i < trials.length; i++) {
            try {
                xmlHttpRequest = trials[i]();
                break;
            } catch (e) {
                // Do nothing
            }
        }

        if (xmlHttpRequest == null) {
            throw new Error("Fatal Error. XMLHttpRequest Object could not be created");
        }

        return xmlHttpRequest;
    }

    /**
     * Provides an array of allowed HTTP methods.
     *
     * @constant
     *
     * @returns {String[]}
     *
     * @since 1.0.0
     *
     */
    static get ALLOWED_METHODS() {
        return [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
        ];
    }

    /**
     * Sends an HTTP request to a remote server and returns a Promise object. The Promise callback functions are passed
     * the XMLHttpRequest object containing the response data. See {@link @MDN_API_URI@/XMLHttpRequest|XMLHttpRequest}
     * for details about accessing elements of the response.
     *
     * Requests made by this method are by default asynchronous, and will return immediately. No data from the server
     * will be available to the statement immediately following this call.
     *
     * Example Usage:
     *
     *      mindsmine.Ajax.request(
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
     * @param {String} method The HTTP method to use for the request. Note that the method name is case-sensitive and
     * should be all caps.
     *
     * @param {String} url The URL to which to send the request.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Boolean} [options.async=true] <code>true</code> if this request should run asynchronously.
     * <code>false</code> if this request should run synchronously (it will cause the UI to be blocked, the user won't
     * be able to interact with the browser until the request completes).
     *
     * @param {Object} [options.headers] Request headers to set for the request.
     *
     * @param {Number} [options.timeout=120000] The timeout is an unsigned long representing the number of milliseconds
     * a request can take before automatically being terminated. Timeout should not be used for synchronous requests.
     *
     * @param {Object|String} [options.jsonData] JSON data to be used in the request body.
     *
     * @param {Boolean} [options.withCredentials=false] The value for the
     * {@link @MDN_API_URI@/XMLHttpRequest/withCredentials|withCredentials} property of the
     * {@link @MDN_API_URI@/XMLHttpRequest|XMLHttpRequest} object.
     *
     * @param {Function} [options.beforeRequest] The function to be called before a network request is made.
     *
     * @returns {Promise} A {@link @MDN_JS_URI@/Promise|Promise} that resolves to an
     * {@link @MDN_API_URI@/XMLHttpRequest|XMLHttpRequest} object.
     *
     * @throws {TypeError} If invalid arguments.
     *
     * @since 1.0.0
     *
     */
    static request(method, url, options) {
        const parent = this;

        return new Promise((resolve, reject) => {

            /**
             * Called when the request has come back from the server.
             *
             * @param {XMLHttpRequest} xhrObj
             *
             * @private
             *
             * @since 1.0.0
             *
             */
            function _onRequestComplete(xhrObj) {
                let __success;

                try {
                    __success = (status => {
                        //
                        // Fix IE issue - IE mangles status code 204
                        // https://prototype.lighthouseapp.com/projects/8886/tickets/129-ie-mangles-http-response-status-code-204-to-1223
                        //
                        status = (status === 1223) ? 204 : status;

                        return (status >= 200 && status < 300) || status === 304;
                    })(xhrObj.status);
                } catch (e) {
                    //
                    // Some browsers do not provide access to status when request fails.
                    //
                    __success = false;
                }

                if (__success) {
                    resolve(xhrObj);
                } else {
                    reject(xhrObj);
                }
            }

            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            if (mindsmine.String.isEmpty(method)) {
                throw new TypeError("Fatal Error. 'method'. @ERROR_PERMITTED_STRING@");
            }

            method = method.toUpperCase();

            if (parent.ALLOWED_METHODS.indexOf(method) === -1) {
                throw new TypeError(`Fatal Error. 'method'. Allowed values are ${parent.ALLOWED_METHODS.join(", ")}.`);
            }

            if (mindsmine.String.isEmpty(url)) {
                throw new TypeError("Fatal Error. 'url'. @ERROR_PERMITTED_STRING@");
            }

            if (!mindsmine.URL.isValidURL(url)) {
                throw new TypeError("Fatal Error. 'url'. Invalid URL.");
            }

            options = mindsmine.Object.getNullSafe(options);

            let _timeout = (mindsmine.Number.isNumber(options.timeout) && options.timeout >= 0) ? options.timeout : parent.DEFAULT_TIMEOUT;

            let __proceed = true;

            if (mindsmine.Function.isFunction(options.beforeRequest)) {
                let __retVal = options.beforeRequest.call(window);

                __proceed = (__retVal === null || __retVal === undefined || typeof __retVal !== "boolean") ? true : __retVal;
            }

            if (__proceed) {
                if (method === "GET") {
                    url = mindsmine.URL.appendQuery(url, "_dc", (new Date()).getTime());
                }

                let _async = (options.async !== false) ? (options.async || parent.DEFAULT_ASYNC) : false;

                let __xmlHttpRequest = parent.XHRObject;

                __xmlHttpRequest.open(method, url, _async);

                if (_async) {
                    __xmlHttpRequest.timeout = _timeout;
                    __xmlHttpRequest.ontimeout = () => {
                        reject(__xmlHttpRequest);
                    };
                }

                if (mindsmine.Boolean.getNullSafe(options.withCredentials)) {
                    __xmlHttpRequest.withCredentials = true;
                }

                let headers = mindsmine.Object.getNullSafe(options.headers);

                try {
                    for (let key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            __xmlHttpRequest.setRequestHeader(key, headers[key]);
                        }
                    }
                } catch (e) {
                    throw new Error("Fatal Error. Could not set the request header(s).");
                }

                let _jsonData = options.jsonData;

                let _data = (_jsonData != null) ? ((mindsmine.Object.isPrimitive(_jsonData)) ? _jsonData : JSON.stringify(_jsonData)) : null;

                __xmlHttpRequest.send(_data);

                if (_async) {
                    __xmlHttpRequest.onreadystatechange = () => {
                        if (__xmlHttpRequest.readyState === 4) {
                            _onRequestComplete(__xmlHttpRequest);
                        }
                    };
                } else {
                    _onRequestComplete(__xmlHttpRequest);
                }
            }
        });
    }
};
