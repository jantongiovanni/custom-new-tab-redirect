console.log('options.ts');

//set the default value of the url and color inputs
chrome.storage.sync.get({ url: '', color: '' }, items => {
  document.getElementById('url').value = items.url;
  document.getElementById('color').value = items.color || '#000000';
});

// chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {
//   if (!isAllowedAccess) {
//     console.log('File scheme access is not allowed.');
//     document.getElementById('file-scheme-warning').style.display = 'block';
//   }
// });


document.getElementById("save").addEventListener("click", function() {
    console.log('save');
  
  const color = document.getElementById('color').value;
  chrome.storage.sync.set({ color });
  const url = document.getElementById('url').value;
  chrome.storage.sync.set({ url });
  const status = document.getElementById('status');
  status.textContent = '✅ Settings saved.';
  setTimeout(() => {
    status.textContent = '';
  }, 2000);
});

//reset button to clear color input
document.getElementById('reset-color').addEventListener('click', function() {
  console.log('reset');
  document.getElementById('color').value = '#000000';
  chrome.storage.sync.remove('color');
  const status = document.getElementById('status');
  status.textContent = 'Color reset.';
  setTimeout(() => {
    status.textContent = '';
  }, 2000);
});

//reset button to clear url input
document.getElementById('reset-url').addEventListener('click', function() {
  console.log('reset');
  document.getElementById('url').value = '';
  chrome.storage.sync.remove('url');
  const status = document.getElementById('status');
  status.textContent = 'URL reset.';
  setTimeout(() => {
    status.textContent = '';
  }, 2000);
});

document.getElementById('open-extension-settings').addEventListener('click', function() {
  console.log('open-settings');
  chrome.tabs.create({ url: 'chrome://extensions/?id=fnmljlendckijopajedcjebppcmolngf' });
});

document.getElementById('open-appearance-settings').addEventListener('click', function() {
  chrome.tabs.create({ url: 'chrome://settings/appearance' });
});
