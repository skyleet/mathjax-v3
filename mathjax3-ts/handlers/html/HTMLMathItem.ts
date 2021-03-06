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
 * @fileoverview  Implements the HTMLMathItem class
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {AbstractMathItem, Location} from '../../core/MathItem.js';
import {InputJax} from '../../core/InputJax.js';
import {HTMLDocument} from './HTMLDocument.js';

/*****************************************************************/
/*
 *  Implements the HTMLMathItem class (extends AbstractMathItem)
 */

export class HTMLMathItem extends AbstractMathItem {

    public static STATE = AbstractMathItem.STATE;

    /*
     * @override
     */
    constructor(math: string, jax: InputJax, display: boolean = true,
                start: Location = {node: null, n: 0, delim: ''},
                end: Location = {node: null, n: 0, delim: ''}) {
        super(math, jax, display, start, end);
    }

    /*
     * Not yet implemented
     *
     * @override
     */
    public addEventHandlers() {}

    /*
     * Insert the typeset MathItem into the document at the right location
     *   If the starting and ending nodes are the same:
     *     Split the text to isolate the math and its delimiters
     *     Replace the math by the typeset version
     *   Otherewise (spread over several nodes)
     *     Split the start node, if needed
     *     Remove nodes until we reach the end node
     *     Insert the math before the end node
     *     Split the end node, if needed
     *     Remove the end node
     *
     * @override
     */
    public updateDocument(html: HTMLDocument) {
        if (this.state() < STATE.INSERTED) {
            if (this.inputJax.processStrings) {
                let node = this.start.node as Text;
                if (node === this.end.node) {
                    if (this.end.n < this.end.node.nodeValue.length) {
                        this.end.node.splitText(this.end.n);
                    }
                    if (this.start.n) {
                        node = (this.start.node as Text).splitText(this.start.n);
                    }
                    node.parentNode.replaceChild(this.typesetRoot, node);
                } else {
                    if (this.start.n) {
                        node = node.splitText(this.start.n);
                    }
                    while (node !== this.end.node) {
                        let next = node.nextSibling as Text;
                        node.parentNode.removeChild(node);
                        node = next;
                    }
                    node.parentNode.insertBefore(this.typesetRoot, node);
                    if (this.end.n < node.nodeValue.length) {
                        node.splitText(this.end.n);
                    }
                    node.parentNode.removeChild(node);
                }
            } else {
                this.start.node.parentNode.replaceChild(this.typesetRoot, this.start.node);
            }
            this.start.node = this.end.node = this.typesetRoot;
            this.start.n = this.end.n = 0;
            this.state(STATE.INSERTED);
        }
    }

    /*
     * Remove the typeset math from the document, and put back the original
     *  expression and its delimiters, if requested.
     *
     * @override
     */
    public removeFromDocument(restore: boolean = false) {
        if (this.state() >= STATE.TYPESET) {
            let node = this.start.node;
            if (restore) {
                let document = node.ownerDocument;
                let text = this.start.delim + this.math + this.end.delim;
                let math;
                if (this.inputJax.processStrings) {
                    math = document.createTextNode(text);
                } else {
                    let span = document.createElement('span');
                    span.innerHTML = text;
                    math = span.firstChild;
                }
                node.parentNode.insertBefore(math, node);
            }
            node.parentNode.removeChild(node);
        }
    }

}

let STATE = HTMLMathItem.STATE;
