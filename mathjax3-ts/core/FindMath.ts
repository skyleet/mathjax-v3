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
 * @fileoverview  Interfaces and abstract classes for FindMath objects
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {userOptions, defaultOptions, OptionList} from '../util/Options.js';
import {ProtoItem} from './MathItem.js';

/*****************************************************************/
/*
 *  The FindMath interface
 */

export interface FindMath {
    /*
     * One of two possibilities:  Look through a DOM element,
     *   or look through an array of strings for delimited math.
     */
    findMath(node: Element): ProtoItem[];
    findMath(strings: string[]): ProtoItem[];
}

/*****************************************************************/
/*
 *  The FindMath abstract class
 */
export abstract class AbstractFindMath implements FindMath {

    /*
     * The default options for FindMath
     */
    public static OPTIONS: OptionList = {};

    /*
     * The actual options for this instance
     */
    protected options: OptionList;

    /*
     * @param {OptionList} options  The user options for this instance
     */
    constructor(options: OptionList) {
        let CLASS = this.constructor as typeof AbstractFindMath;
        this.options = userOptions(defaultOptions({}, CLASS.OPTIONS), options);
    }

    /*
     * Locate math in an Element or a string array;
     *
     * @param{Element | string[]} where  The node or string array to search for math
     * @return{ProtoItem[]}              The array of proto math items found
     */
    public findMath(where: Element | string[]) {
        return [] as ProtoItem[];
    }

}
