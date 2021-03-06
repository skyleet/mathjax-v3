/*************************************************************
 *
 *  Copyright (c) 2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  Interfaces and abstract classes for Handler objects
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {MathDocument, AbstractMathDocument} from './MathDocument.js';
import {OptionList} from '../util/Options.js';

/*****************************************************************/
/*
 *  The Handler interface
 */

export interface Handler {
    /*
     * The name of the handler class
     */
    name: string;

    /*
     * The priority for the handler when handlers are polled
     *   to see which one can process a given document.
     */
    priority: number;

    /*
     * Checks to see if the handler can process a given document
     *
     * @param{any} document  The document to be processed (string, window, etc.)
     * @return{boolean}      True if this handler can process the given document
     */
    handlesDocument(document: any): boolean;

    /*
     * Creates a MathDocument for the given handler
     *
     * @param{any} document        The document to be handled
     * @param{OptionList} options  The options for the handling of the document
     * @return{MathDocument}       The MathDocument object that manages the processing
     */
    create(document: any, options: OptionList): MathDocument;
}

/*****************************************************************/
/*
 *  The default MathDocument class (subclasses use their own)
 */

class DefaultMathDocument extends AbstractMathDocument {}

/*****************************************************************/
/*
 *  The Handler interface
 */

export abstract class AbstractHandler implements Handler {

    /*
     * The name of this class
     */
    public static NAME: string = 'generic';

    /*
     * The priority for this handler
     */
    public priority: number;

    /*
     * @param{number} priority  The priority to use for this handler
     *
     * @constructor
     */
    constructor(priority: number = 5) {
        this.priority = priority;
    }

    /*
     * @return{string}  The name of this handler class
     */
    public get name() {
        return (this.constructor as typeof AbstractHandler).NAME;
    }

    /*
     * @override
     */
    public handlesDocument(document: any) {
        return false;
    }

    /*
     * @override
     */
    public create(document: any, options: OptionList) {
        return new DefaultMathDocument(document, options) as MathDocument;
    }

}
