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
 * A collection of useful static methods to deal with JavaScript DOM.
 *
 * @since 4.0.0
 *
 */
mindsmine.DOM = class {
    /**
     * Adds a DOM Node element to the HTML DOM.
     *
     * @see {@link @MDN_API_URI@/Element/setAttribute|Element setAttribute}
     * @see {@link @MDN_API_URI@/Node/appendChild|Node appendChild}
     *
     * @param {String} parentID ID of the parent node under which the element is to be added.
     * @param {String} elementTag Tag of the DOM Node element to be added.
     * @param {String} [elementID] ID of the DOM Node element to be added. By default, `Date.getTime()` will be used.
     * @param {String} [elementContent] Content of the DOM Node element.
     *
     * @throws {TypeError} for empty arguments
     * @throws {ReferenceError} for missing DOM elements and/or tags
     *
     * @since 4.0.0
     *
     */
    static addElement(parentID, elementTag, elementID = (new Date()).getTime().toString(), elementContent = null) {
        if (mindsmine.String.isEmpty(parentID)) {
            throw new TypeError("Fatal Error. 'parentID'. @ERROR_PERMITTED_STRING@");
        }

        if (mindsmine.String.isEmpty(elementTag)) {
            throw new TypeError("Fatal Error. 'elementTag'. @ERROR_PERMITTED_STRING@");
        }

        let parentNode = window.document.getElementById(parentID);

        if (parentNode == null) {
            throw new ReferenceError(`DOM Element with '${parentID}' as ID does not exist!`);
        }

        let newElement = window.document.createElement(elementTag);

        if (newElement instanceof HTMLUnknownElement) {
            throw new ReferenceError(`The '${elementTag}' tag is unrecognised!`);
        }

        newElement.setAttribute("id", elementID);

        if (elementContent != null) {
            newElement.innerHTML = elementContent;
        }

        parentNode.appendChild(newElement);
    }

    /**
     * Deletes a DOM Node element from the HTML DOM.
     *
     * @see {@link @MDN_API_URI@/Node/removeChild|Node removeChild}
     *
     * @param {String} elementID ID of the DOM Node element to be deleted.
     *
     * @throws {TypeError} for empty arguments
     * @throws {ReferenceError} for missing DOM elements and/or tags
     *
     * @since 4.0.0
     *
     */
    static deleteElement(elementID) {
        if (mindsmine.String.isEmpty(elementID)) {
            throw new TypeError("Fatal Error. 'elementID'. @ERROR_PERMITTED_STRING@");
        }

        let elementNode = window.document.getElementById(elementID);

        if (elementNode == null) {
            throw new ReferenceError(`DOM Element with '${elementID}' as ID does not exist!`);
        }

        elementNode.parentNode.removeChild(elementNode);
    }
};
