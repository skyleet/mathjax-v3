import {MathList} from '../../core/MathList.js';
import {HTMLMathItem} from './HTMLMathItem.js';

export class HTMLMathList extends MathList {

    isBefore(a: HTMLMathItem, b:HTMLMathItem) {
        return (a.start.i < b.start.i || (a.start.i === b.start.i && a.start.n < b.start.n));
    }

};