import {MathJax} from "mathjax3/mathjax.js";
export {MathJax} from "mathjax3/mathjax.js";

import "mathjax3/handlers/html.js";
import {TeX} from "mathjax3/input/tex.js";
import {CHTML} from "mathjax3/output/chtml.js";

let OPTIONS = {
  InputJax: new TeX(),
  OutputJax: new CHTML()
};

let HTML = `
  This is \\$ some math: \\(x+1\\).
  \\[x+1\\over x-1\\]
`;

var html;
try {
  //
  //  Use browser document, if there is one
  //
  html = MathJax.document(document,OPTIONS);
  document.body.insertBefore(document.createElement("hr"),document.body.firstChild);
  var div = document.createElement('div');
  div.innerHTML = HTML; div.style.marginBottom = "1em";
  document.body.insertBefore(div,document.body.firstChild);
} catch (err) {
  //
  //  Otherwise, make a new document (measurements not supported here)
  //
  html = MathJax.document(
    '<html><head><title>Test MathJax3</title></head><body>'
    + HTML +
    '</body></html>',
    OPTIONS
  );
}

MathJax.handleRetriesFor(function () {

    html.findMath()
        .compile()
        .typeset();
        
    console.log(Array.from(html.math));

}).catch(err => {
  console.log(err.message);
  console.log(err.stack.replace(/\n.*\/system\.js:(.|\n)*/,""));
});
