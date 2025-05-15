console.log('redirect.js');
Promise.all([
  chrome.storage.sync.get({ mode: 'default', color: '', url: '' }),
  new Promise(ok => {
    if (document.body) {
      ok();
    } else {
      document.addEventListener('DOMContentLoaded', ok, { once: true });
    }
  }),
]).then(([items]) => {
  switch (items.mode) {
    case 'custom': {
      if (items.color && items.color !== '') {
        document.body.style.backgroundColor = items.color;
      } else {
        document.body.style.backgroundColor = '#121212';
      }
      break;
    }
    case 'light': {
      document.body.style.backgroundColor = '#FFFFFF';
      break;
    }
    case 'dark': {
      document.body.style.backgroundColor = '#121212';
      break;
    }
    default: {
      // Don't set any background color for device default mode
      break;
    }
  }

  if (!items.url || items.url === '') {
    console.log('No url set, redirecting to options page');
    chrome.runtime.openOptionsPage();
    return;
  }

  //if not a local file, redirect to the URL
  if (!items.url.startsWith('file://')) {
    console.log('Redirecting to URL: ' + items.url);
    chrome.tabs.update({ url: items.url, active: true });
    return;
  }

  //if local file, check for file scheme access
  chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {
    if (isAllowedAccess) {
      console.log('File scheme access is allowed.');
      chrome.tabs.update({ url: items.url, active: true });
    } else {
      console.log('File scheme access is not allowed. Redirecting to options page.');
      chrome.runtime.openOptionsPage();
    }
  });
});
