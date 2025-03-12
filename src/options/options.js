console.log('options.ts');

//set the default value of the url and color inputs
chrome.storage.sync.get({ url: '', color: '' }, items => {
  const urlElement = document.getElementById('url');
  const schemeElement = document.getElementById('scheme');
  const colorElement = document.getElementById('color');

  if (urlElement) {
    urlElement.value = items?.url || '';
  }
  if (schemeElement) {
    schemeElement.value = items?.scheme || 'dark';
  }
  if (colorElement) {
    colorElement.value = items?.color || '#000000';
  }
});


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
