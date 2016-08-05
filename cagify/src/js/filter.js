var re = /.*/ig;
var dislike = function (content) {
  if (content && content.match(re)) {
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
        if (tagName === "img") {
          if (dislike(node.src) || dislike(node.alt)) {
            var w = node.clientWidth, h = node.clientHeight;
            if (w > 50 && h > 50) {
              node.src = "https://www.placecage.com/c/" + w + "/" + h;
              break;
            }
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
          // pass
        }
        break;
    }
  }
};
walk(document.body);
