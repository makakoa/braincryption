'use strict';
/* globals chrome */

var settings = {
  intensity: 1,
  enabled: false
};
chrome.storage.local.get('braincryption', function(res) {
  settings = res.braincryption || settings;
  updateSettings();
});

var intensitySlider = document.getElementById('intensity');
intensitySlider.value = settings.intensity;
intensitySlider.addEventListener('input', intensityChange);
intensitySlider.addEventListener('change', intensityChange);
function intensityChange(e) {
  settings.intensity = parseInt(e.target.value);
  console.log('Intensity change: ', settings.intensity);
  updateSettings();
}

var enableButton = document.getElementById('enable');
enableButton.innerText = settings.enabled ? 'Enabled' : 'Disabled';
enableButton.className = settings.enabled ? 'enabled' : '';
enableButton.addEventListener('click', toggleEnable);
function toggleEnable() {
  settings.enabled = !settings.enabled;
  updateSettings();
}

function updateSettings() {
  enableButton.innerText = settings.enabled ? 'Enabled' : 'Disabled';
  enableButton.className = settings.enabled ? 'enabled' : '';

  intensitySlider.value = settings.intensity;

  // Store
  chrome.storage.local.set({braincryption: settings}, function() {
    console.log('Updated Settings: ', settings);
  });

  // Send to page
  chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, 'SETTINGS_CHANGED');
    }
  });
}
