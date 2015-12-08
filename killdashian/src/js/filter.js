var eliminatedElements = 0;

var dislike = function (node) {
  var content = node.href + node.nodeValue + node.value;
  if (content.match(/(kardashian|kim.*kanye)/i)) {
    eliminatedElements += 1;
    return true;
  }
  return false;
};

var terminateWithPrejudice = function (node) {
  if (node.parentNode.parentNode) {
    node.parentNode.parentNode.removeChild(node.parentNode);
  } else {
    node.parentNode.removeChild(node);
  }
};

var walk = function (node) {
  // modified from "cloud-to-butt" extension
  if (node) {
    var child, next;

    switch (node.nodeType) {
      case 1: // element
      case 9: // document
      case 11: // document fragment
        child = node.firstChild;
        while (child) {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;
      case 3: // text node
        if (node.parentElement.tagName.toLowerCase() !== "script") {
          if (dislike(node)) {
            terminateWithPrejudice(node);
          }
        }
        break;
    }
  }
};

walk(document.body);

if (eliminatedElements > 0) {
  chrome.runtime.sendMessage({
    "elements": eliminatedElements
  });
}
