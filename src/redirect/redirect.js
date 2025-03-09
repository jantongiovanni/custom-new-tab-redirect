document.addEventListener('DOMContentLoaded', function() {
  //get color from storage
  chrome.storage.sync.get({ color: '' }, items => {
    //set the background color of the body
    if (items.color && items.color !== '') {
      document.body.style.backgroundColor = items.color;
    }
  });
});

chrome.storage.sync.get(
  { url: '' },
  items => {
    console.log(items);
    if (!items.url || items.url === '') {
      console.log('No url set, redirecting to options page');
      chrome.runtime.openOptionsPage();
      return;
    }

    //if not a local file, redirect to the URL
    if (!items.url.startsWith('file://')) {
      chrome.tabs.update({ url: items.url });
      return;
    }

    //if local file, check for file scheme access
    chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {
      if (isAllowedAccess) {
        console.log('File scheme access is allowed.');
        chrome.tabs.update({ url: items.url });
      } else {
        console.log('File scheme access is not allowed. Redirecting to options page.');
        chrome.runtime.openOptionsPage();
      }
    });
  }
);
