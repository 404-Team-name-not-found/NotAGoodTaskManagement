/**
 * Used to inject an HTML based string into a specific place in the dom.
 * 
 * @param {string} whatToInject 
 * @param {Node.ELEMENT_NODE} whereToInject node element in the dom
 */
function injectHTMLToElement(whatToInject, whereToInject) {
  if(!whatToInject || !whereToInject) return;
  whereToInject.insertAdjacentHTML('beforeend', whatToInject);
};

/**
 * Used to replace the element innerHTML.
 * 
 * @param {string} newHTML 
 * @param {Node.ELEMENT_NODE} whereToReplace node element in the dom
 */
function replaceElementInnerHTML(newHTML, whereToReplace) {
  if(!newHTML || !whereToReplace) return;
  whereToReplace.innerHTML = newHTML;
};

export { injectHTMLToElement, replaceElementInnerHTML };