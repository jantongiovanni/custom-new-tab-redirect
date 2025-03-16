Promise.all([
  chrome.storage.sync.get({ mode: 'dark', color: '', url: '' }),
  new Promise(ok => {
    if (document.body) {
      ok();
    } else {
      document.addEventListener('DOMContentLoaded', ok, { once: true });
    }
  }),
]).then(([items]) => {
  console.log(items);
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
    default:
      document.body.style.backgroundColor = '#121212';
  }

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
});
