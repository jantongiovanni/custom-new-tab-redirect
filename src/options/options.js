console.log('options.ts');

//set the default value of the url and color inputs
chrome.storage.sync.get({ url: '', mode: 'default', color: '' }, items => {
  console.log(items);

  const urlElement = document.getElementById('url');
  const modeDefaultElement = document.getElementById('mode-default');
  const modeDarkElement = document.getElementById('mode-dark');
  const modeLightElement = document.getElementById('mode-light');
  const modeCustomElement = document.getElementById('mode-custom');
  const colorElement = document.getElementById('color');
  const colorPicker = document.getElementById('color-picker');

  if (urlElement) {
    urlElement.value = items?.url || '';
  }
  if (modeDefaultElement && modeDarkElement && modeLightElement && modeCustomElement) {
    if (items?.mode === 'default') {
      modeDefaultElement.checked = true;
      colorPicker.style.display = 'none';
    } else if (items?.mode === 'dark') {
      modeDarkElement.checked = true;
      colorPicker.style.display = 'none';
    } else if (items?.mode === 'light') {
      modeLightElement.checked = true;
      colorPicker.style.display = 'none';
    } else if (items?.mode === 'custom') {
      modeCustomElement.checked = true;
      colorPicker.style.display = 'flex';
    }
  }
  if (colorElement) {
    colorElement.value = items?.color || '#121212';
  }
});

document.querySelectorAll('.label-input-container.radio-group > div').forEach(div => {
  div.addEventListener('click', function() {
    const radio = this.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));
    }
  });
});

document.querySelectorAll('input[name="mode"]').forEach(element => {
  element.addEventListener('change', function() {
    const colorPicker = document.getElementById('color-picker');
    switch (this.value) {
      case 'custom':
      colorPicker.style.display = 'flex';
      break;
    default:
      colorPicker.style.display = 'none';
    }
  });
});

document.getElementById("save").addEventListener("click", function() {
  console.log('save');

  const color = document.getElementById('color')?.value;
  color && chrome.storage.sync.set({ color });
  const url = document.getElementById('url')?.value || '';
  chrome.storage.sync.set({ url });
  const mode = document.querySelector('input[name="mode"]:checked')?.value;
  console.log(mode);
  mode && chrome.storage.sync.set({ mode });
  const status = document.getElementById('status');
  status.textContent = '✅ Settings saved.';
  setTimeout(() => {
    status.textContent = '';
  }, 2000);

  //console log current storage settings
  chrome.storage.sync.get({ url: '', mode: 'dark', color: '' }, items => {
    console.log(items);
  });
});


//reset button to clear url input
document.getElementById('reset-url').addEventListener('click', function() {
  console.log('reset');
  document.getElementById('url').value = '';
});

document.getElementById('open-extension-settings').addEventListener('click', function() {
  console.log('open-settings');
  chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id });
});

document.getElementById('open-appearance-settings').addEventListener('click', function() {
  chrome.tabs.create({ url: 'chrome://settings/appearance' });
});
