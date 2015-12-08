var eliminatedElements = 0;

var re = /(.*(kim|khloe|kourtney).*)?(kardashian)/ig;
var dislike = function (content) {
  if (content && content.match(re)) {
    eliminatedElements += 1;
    return true;
  }
  return false;
};

var terminateWithPrejudice = function (node) {
  node.parentNode.removeChild(node);
};

var walk = function (node) {
  // modified from "cloud-to-butt" extension
  if (node) {
    var child, next;
    switch (node.nodeType) {
      case 1: // element
        var tagName = node.tagName.toLowerCase();
        if (node.children.length === 0) {
          if (tagName === "img") {
            if (dislike(node.src) || dislike(node.alt)) {
              var w = node.clientWidth, h = node.clientHeight;
              if (w > 50 && h > 50) {
                node.src = "https://www.placecage.com/c/" + w + "/" + h;
                break;
              }
            }
          } else if (tagName === "p" || tagName === "a" || tagName[0] === "h") {
            node.innerHTML = node.innerHTML.replace(re, "Nicholas Cage");
            break;
          }
        }
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
          if (dislike(node.nodeValue)) {
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
