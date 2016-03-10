chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 255]});

chrome.runtime.onMessage.addListener(
  function(mss, sender, respond) {
    chrome.browserAction.setBadgeText({text: mss.elements.toString(), tabId: sender.tab.id});
  }
);
