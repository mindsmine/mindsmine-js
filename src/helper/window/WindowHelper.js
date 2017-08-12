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
 * A collection of useful static methods to deal with JavaScript window object.
 *
 * **NOTE**: Unless otherwise specified, all callback functions are under <code>window</code> scope.
 *
 * @since 1.0.0
 *
 */
mindsmine.Window = class {

    /**
     * Loads a resource into a new browsing context (such as a window), depending on the browser preferences.
     *
     * This method creates a new secondary browser window, similar to choosing New Window from the File menu. The new
     * window is created with the default toolbars of the main window.
     *
     * Note that remote URLs won't load immediately. The actual fetching of the URL is deferred and starts after the
     * current script block finishes executing. The window creation and the loading of the referenced resource are done
     * asynchronously.
     *
     * @see {@link @MDN_API_URI@/Window/open|Window.open()}
     *
     * @param {String} externalURL The URL to be loaded in the newly opened window. It can be an HTML document on the
     * web, image file or any resource supported by the browser.
     *
     * @throws {TypeError} If invalid argument
     *
     * @since 1.0.0
     *
     */
    static open(externalURL) {
        if (mindsmine.String.isEmpty(externalURL)) {
            throw new TypeError("@ERROR_PERMITTED_STRING@");
        }

        window.open(externalURL, "_blank");
    }

    /**
     * Displays a modal dialog with a message and two buttons, <code>OK</code> and <code>Cancel</code>.
     *
     * ### Notes
     *
     * Dialog boxes are modal windows - they prevent the user from accessing the rest of the program's interface until
     * the dialog box is closed. For this reason, you should not overuse any function that creates a dialog box (or
     * modal window).
     *
     * @see {@link @MDN_API_URI@/Window/confirm|Window.confirm()}
     *
     * @param {String} message Text you want to display in the dialog, or, alternatively, an object that is converted
     * into a string and displayed.
     * @param {String} [title] Title you want to display in the dialog.
     * @param {Function} [okCallback] Callback function to be invoked after user clicks on the <code>OK</code> button.
     * @param {Function} [cancelCallback] Callback function to be invoked after user clicks on the <code>Cancel</code>
     * button, or simply closes the dialog window.
     *
     * @throws {TypeError} If invalid argument
     *
     * @since 1.0.0
     *
     */
    static confirm(message, title, okCallback, cancelCallback) {
        if (mindsmine.String.isEmpty(message)) {
            throw new TypeError("@ERROR_PERMITTED_STRING@");
        }

        let __finalMessage = (mindsmine.String.isEmpty(title)) ? message : `${title.trim()}\n\n\n${message}`;

        let __isOK = window.confirm(__finalMessage);

        if (__isOK) {
            if (mindsmine.Function.isFunction(okCallback)) {
                okCallback.call(window);
            }
        } else {
            if (mindsmine.Function.isFunction(cancelCallback)) {
                cancelCallback.call(window);
            }
        }
    }

    /**
     * Displays an alert dialog with the specified content and an <code>OK</code> button.
     *
     * ### Notes
     *
     * The alert dialog should be used for messages which do not require any response on the part of the user, other
     * than the acknowledgement of the message.
     *
     * Dialog boxes are modal windows - they prevent the user from accessing the rest of the program's interface until
     * the dialog box is closed. For this reason, you should not overuse any function that creates a dialog box (or
     * modal window).
     *
     * @see {@link @MDN_API_URI@/Window/alert|Window.alert()}
     *
     * @param {String} message Text you want to display in the alert dialog, or, alternatively, an object that is
     * converted into a string and displayed.
     * @param {String} [title] Title you want to display in the alert dialog.
     * @param {Function} [callback] Callback function to be invoked after the message box is closed.
     *
     * @throws {TypeError} If invalid argument
     *
     * @since 1.0.0
     *
     */
    static alert(message, title, callback) {
        if (mindsmine.String.isEmpty(message)) {
            throw new TypeError("@ERROR_PERMITTED_STRING@");
        }

        let __finalMessage = (mindsmine.String.isEmpty(title)) ? message : `${title.trim()}\n\n\n${message}`;

        window.alert(__finalMessage);

        if (mindsmine.Function.isFunction(callback)) {
            callback.call(window);
        }
    }

    /**
     * A collection of useful static methods to deal with JavaScript window.location object.
     *
     * @namespace mindsmine.Window.Location
     *
     * @class
     *
     * @since 1.0.0
     *
     */
    static get Location() {
        return class {
            /**
             * Returns an object containing the names of the search parameters as properties and values of the search parameters
             * as the property values.
             *
             * @returns {Object|null} Returns <code>null</code> if no search parameters exist.
             *
             * @since 2.0.0
             *
             * @function
             * @memberOf mindsmine.Window.Location
             * @inner
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
             * @function
             * @memberOf mindsmine.Window.Location
             * @inner
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
             * @function
             * @memberOf mindsmine.Window.Location
             * @inner
             *
             */
            static getAllHashParameters() {
                if (window.location.hash) {
                    let __hashParams = {};

                    window.location.hash.substr(1).split("&").forEach((p) => {
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
             * @param {String} hashParam The hash parameter (case-sensitive) string whose value is to be retrieved.
             *
             * @returns {String|null} Returns <code>null</code> if unavailable.
             *
             * @throws {TypeError} If invalid argument
             *
             * @since 1.0.0
             *
             * @function
             * @memberOf mindsmine.Window.Location
             * @inner
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
    }
};
