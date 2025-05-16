chrome.storage.sync.get({ url: '', mode: 'default', color: '' }, items => {
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
    const colorTextElement = document.getElementById('color-text');
    if (colorTextElement) {
      colorTextElement.value = items?.color || '#121212';
    }
  }
});

//color input sync
const colorElement = document.getElementById('color');
const colorTextElement = document.getElementById('color-text');

if (colorElement && colorTextElement) {
  colorElement.addEventListener('input', function() {
    colorTextElement.value = this.value;
  });

  colorTextElement.addEventListener('input', function() {
    // Only update if it's a valid hex color
    if (/^#[0-9A-F]{6}$/i.test(this.value)) {
      colorElement.value = this.value;
    }
  });
}

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

//save button click
document.getElementById("save").addEventListener("click", function() {
  const color = document.getElementById('color')?.value;
  color && chrome.storage.sync.set({ color });
  let url = document.getElementById('url')?.value || '';
  // Adds https:// to URLs that begin with www
  if (url.startsWith('www.')) {
    url = 'https://' + url;
    const urlInput = document.getElementById('url');
    if (urlInput) {
      urlInput.value = url;
    }
  }
  chrome.storage.sync.set({ url });
  const mode = document.querySelector('input[name="mode"]:checked')?.value;

  mode && chrome.storage.sync.set({ mode });
  const status = document.getElementById('status');
  status.textContent = '✅ Settings saved.';
  setTimeout(() => {
    status.textContent = '';
  }, 2000);
});

document.getElementById('reset-url').addEventListener('click', function() {
  document.getElementById('url').value = '';
});

document.getElementById('open-extension-settings').addEventListener('click', function() {
  chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id });
});

document.getElementById('open-extension-settings-link').addEventListener('click', function() {
  chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id });
});

document.getElementById('open-appearance-settings').addEventListener('click', function() {
  chrome.tabs.create({ url: 'chrome://settings/appearance' });
});
