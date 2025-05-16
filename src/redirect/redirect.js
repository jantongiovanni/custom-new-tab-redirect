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
    chrome.runtime.openOptionsPage();
    return;
  }

  //if not a local file, redirect to the URL
  if (!items.url.startsWith('file://')) {
    chrome.tabs.update({ url: items.url, active: true });
    return;
  }

  //if local file, check for file scheme access
  chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {
    if (isAllowedAccess) {
      chrome.tabs.update({ url: items.url, active: true });
    } else {
      chrome.runtime.openOptionsPage();
    }
  });
});
