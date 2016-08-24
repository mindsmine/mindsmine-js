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
 * @singleton
 *
 * @since 1.0
 *
 */
mindsmine.Ajax = (function () {

    /**
     * Provides the default <code>timeout</code> (in milliseconds) for the Ajax calls.
     *
     * @readonly
     *
     * @property {Number}
     *
     * @private
     *
     * @since 1.0
     *
     */
    var __DEFAULT_TIMEOUT = 120000;

    /**
     * Provides an array of allowed HTTP methods.
     *
     * @readonly
     *
     * @property {String[]}
     *
     * @private
     *
     * @since 1.0
     *
     */
    var __ALLOWED_METHODS = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];

    /**
     * Provides the default <code>async</code> value for the Ajax calls.
     *
     * @readonly
     *
     * @property {Boolean}
     *
     * @private
     *
     * @since 1.0
     *
     */
    var __DEFAULT_ASYNC = true;

    /**
     * Provides the default <code>withCredentials</code> value for Ajax calls.
     *
     * @readonly
     *
     * @property {Boolean}
     *
     * @private
     *
     * @since 1.0
     *
     */
    var __DEFAULT_WITH_CREDENTIALS = false;

    /**
     * Provides the default <code>scope</code> value for callbacks.
     *
     * @readonly
     *
     * @property {Object} [__DEFAULT_SCOPE=window]
     *
     * @private
     *
     * @since 1.0
     *
     */
    var __DEFAULT_SCOPE = window;

    /**
     * Checks the status of the response to the request.
     *
     * The HTTP result codes <code>200</code> to <code>299</code> and <code>304</code> are
     * deemed as successful request.
     *
     * Handles an IE issue as well - [IE mangles status code 204][1]
     *
     * [1]: https://prototype.lighthouseapp.com/projects/8886/tickets/129-ie-mangles-http-response-status-code-204-to-1223
     *
     * @param {Number} status The status code.
     *
     * @returns {Boolean} Whether success/failure.
     *
     * @private
     *
     * @since 1.0
     *
     */
    var _isRequestSuccessful = function (status) {
        //
        // Fix IE issue
        //
        status = (status == 1223) ? 204 : status;

        return (status >= 200 && status < 300) || status == 304;
    };

    /**
     * Called when the request has come back from the server.
     *
     * @param {XMLHttpRequest} request
     * @param {Object} scope The scope for the callback functions.
     * @param {Function} successFunc The function to be called upon success of the request.
     * @param {Function} failureFunc The function to be called upon failure of the request.
     * @param {Function} [onCompleteFunc] The function to be called upon completion of the request.
     *
     * @private
     *
     * @since 1.0
     *
     */
    var _onRequestComplete = function (request, scope, successFunc, failureFunc, onCompleteFunc) {
        var __success;

        try {
            __success = _isRequestSuccessful(request.status);
        } catch (e) {
            //
            // Some browsers do not provide access to status when request fails.
            //
            __success = false;
        }

        if (onCompleteFunc) {
            onCompleteFunc.call(scope, request);
        }

        if (__success) {
            successFunc.call(scope, request);
        } else {
            failureFunc.call(scope, request);
        }
    };

    /**
     * Returns the Ajax object based upon the browser.
     *
     * @returns {XMLHttpRequest}
     *
     * @private
     *
     * @throws {Error}
     *
     * @since 1.0
     *
     */
    var _getXHRObject = function () {
        var trials = [
            function () {
                return new XMLHttpRequest();
            },
            function () {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            },
            function () {
                return new ActiveXObject("MSXML2.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        ];

        var xmlHttpRequest = null;

        for (var i = 0; i < trials.length; i++) {
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
    };

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    return {

        /**
         * Sends an HTTP request to a remote server.
         *
         * Requests made by this method are by default asynchronous, and will return immediately. No data from the
         * server will be available to the statement immediately following the {@link #request} call. To process
         * returned data, use a success (or afterRequest) callback in the request options object.
         *
         * Example Usage:
         *
         *      mindsmine.Ajax.request(
         *           "GET",
         *           "valid URL",
         *           {
         *                headers: {
         *                     "Accept" : "some value",
         *                     "Content-Type" : "some value",
         *                     "Authorization" : "some value"
         *                },
         *
         *                success: function (request) {
         *                     var responseJSON = JSON.parse(request.responseText);
         *                     console.log(responseJSON);
         *                },
         *
         *                failure: function (request) {
         *                     console.log("HTTP error " + request.status);
         *                }
         *           }
         *      );
         *
         * @param {String} method The HTTP method to use for the request. Note that the method name is case-sensitive
         * and should be all caps.
         *
         * @param {String} url The URL to which to send the request.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Boolean} [options.async=true] <code>true</code> if this request should run asynchronously.
         * <code>false</code> if this request should run synchronously (it will cause the UI to be blocked, the user
         * won't be able to interact with the browser until the request completes).
         *
         * @param {Object} [options.headers] Request headers to set for the request.
         *
         * @param {Object} [options.scope=window] The scope in which to execute the callbacks (refers to the "this"
         * parameter for the callback functions).
         *
         * @param {Object/String} [options.jsonData] JSON data to use as the post.
         *
         * @param {Boolean} [options.withCredentials=false] <code>true</code> to add the <code>withCredentials</code>
         * property to the XHR object.
         *
         * @param {Function} [options.beforeRequest] The function to be called before a network request is made to
         * retrieve a data object.
         *
         * @param {Function} [options.afterRequest] The function to be called upon receipt of the HTTP response. This
         * function is called regardless of success or failure. The callback is passed the following parameters:
         * @param {XMLHttpRequest} options.afterRequest.response The XMLHttpRequest object containing the response data.
         * See [www.w3.org/TR/XMLHttpRequest][1] for details about accessing elements of the response.
         *
         * [1]: http://www.w3.org/TR/XMLHttpRequest/
         *
         * @param {Function} options.success The function to be called upon success of the request. The callback is
         * passed the following parameters:
         * @param {XMLHttpRequest} options.success.response The XMLHttpRequest object containing the response data. See
         * [www.w3.org/TR/XMLHttpRequest][1] for details about accessing elements of the response.
         *
         * [1]: http://www.w3.org/TR/XMLHttpRequest/
         *
         * @param {Function} options.failure The function to be called upon failure of the request. The callback is
         * passed the following parameters:
         * @param {XMLHttpRequest} options.failure.response The XMLHttpRequest object containing the response data. See
         * [www.w3.org/TR/XMLHttpRequest][1] for details about accessing elements of the response.
         *
         * [1]: http://www.w3.org/TR/XMLHttpRequest/
         *
         * @throws {TypeError} If invalid arguments.
         *
         * @since 1.0
         *
         */
        request: function (method, url, options) {
            if (mindsmine.String.isEmpty(method)) {
                throw new TypeError("Fatal Error. @ERROR_PERMITTED_STRING@");
            }

            method = method.toUpperCase();

            if (__ALLOWED_METHODS.indexOf(method) == -1) {
                throw new TypeError("Fatal Error. Allowed methods are " + __ALLOWED_METHODS.join(" ") + ".");
            }

            if (mindsmine.String.isEmpty(url)) {
                throw new TypeError("Fatal Error. @ERROR_PERMITTED_STRING@");
            }

            options = options || {};

            var scope = options.scope || __DEFAULT_SCOPE;

            var __successFunc = options.success;

            if (__successFunc == null || typeof __successFunc !== "function") {
                throw new TypeError("Fatal Error. @ERROR_PERMITTED_FUNCTION@");
            }

            var __failureFunc = options.failure;

            if (__failureFunc == null || typeof __failureFunc !== "function") {
                throw new TypeError("Fatal Error. @ERROR_PERMITTED_FUNCTION@");
            }

            var __proceed = true;

            var __beforeRequest = options.beforeRequest;

            if (__beforeRequest != null && typeof __beforeRequest === "function") {
                var __retVal = __beforeRequest.call(scope);

                if (__retVal === null || __retVal === undefined || typeof __retVal !== "boolean") {
                    __proceed = true;
                } else {
                    __proceed = __retVal;
                }
            }

            if (__proceed) {
                var __afterRequestFuncVal = options.afterRequest,
                    __afterRequestFunc = null;

                if (__afterRequestFuncVal != null && typeof __afterRequestFuncVal === "function") {
                    __afterRequestFunc = __afterRequestFuncVal;
                }

                if (method === "GET") {
                    url = mindsmine.String.urlAppend(url, "_dc=" + (new Date().getTime()));
                }

                var async = (options.async !== false) ? (options.async || __DEFAULT_ASYNC) : false;

                var __xmlHttpRequest = _getXHRObject();

                __xmlHttpRequest.open(method, url, async);

                if (async) {
                    __xmlHttpRequest.timeout = __DEFAULT_TIMEOUT;
                    __xmlHttpRequest.ontimeout = function () {
                        __failureFunc.call(scope, __xmlHttpRequest);
                    };
                }

                if (options.withCredentials || __DEFAULT_WITH_CREDENTIALS) {
                    __xmlHttpRequest.withCredentials = true;
                }

                var headers = options.headers || {},
                    header = null,
                    key = null;

                try {
                    for (key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            header = headers[key];
                            __xmlHttpRequest.setRequestHeader(key, header);
                        }
                    }
                } catch (e) {
                    throw new Error("Fatal Error. Could not set the (" + key + ", " + header + ") request header.");
                }

                if (async) {
                    __xmlHttpRequest.onreadystatechange = function () {
                        if (__xmlHttpRequest.readyState == 4) {
                            _onRequestComplete(__xmlHttpRequest, scope, __successFunc, __failureFunc, __afterRequestFunc);
                        }
                    };
                }

                var __jsonData = options.jsonData,
                    data = null;

                if (__jsonData != null) {
                    if (mindsmine.Object.isPrimitive(__jsonData)) {
                        data = __jsonData;
                    } else {
                        data = JSON.stringify(__jsonData);
                    }
                }

                __xmlHttpRequest.send(data);

                if (!async) {
                    _onRequestComplete(__xmlHttpRequest, scope, __successFunc, __failureFunc, __afterRequestFunc);
                }
            }
        }
    };
})();
