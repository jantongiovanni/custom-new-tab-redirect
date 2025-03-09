console.log('options.ts');

//set the default value of the url input
chrome.storage.sync.get({ url: '' }, items => {
  document.getElementById('url').value = items.url;
});

chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {
  if (!isAllowedAccess) {
    console.log('File scheme access is not allowed.');
    document.getElementById('file-scheme-warning').style.display = 'block';
  }
});

document.getElementById("save").addEventListener("click", function() {
    console.log('save');
  const url = document.getElementById('url').value;
  chrome.storage.sync.set({ url });
  const status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(() => {
    status.textContent = '';
  }, 1500);
});

//reset button to clear input
document.getElementById('reset').addEventListener('click', function() {
  console.log('reset');
  document.getElementById('url').value = '';
  chrome.storage.sync.set({ url: '' });
  const status = document.getElementById('status');
  status.textContent = 'Options reset.';
  setTimeout(() => {
    status.textContent = '';
  }, 1500);
});

document.getElementById('open-extension-settings').addEventListener('click', function() {
  console.log('open-settings');
  chrome.tabs.create({ url: 'chrome://extensions/?id=fnmljlendckijopajedcjebppcmolngf' });
});

document.getElementById('open-appearance-settings').addEventListener('click', function() {
  chrome.tabs.create({ url: 'chrome://settings/appearance' });
});
