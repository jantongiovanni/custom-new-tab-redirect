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
      window.location.href = items.url;
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
