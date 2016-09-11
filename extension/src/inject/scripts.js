'use strict';
/* globals chrome */

console.log('braincyption running');

var braincryptionSettings;
function getSettings() {
  chrome.storage.local.get('braincryption', function(res) {
    console.log('Settings: ', res);
    braincryptionSettings = res.braincryption || braincryptionSettings;
    updatePage();
  });
}
getSettings(); // Get initial settings

// Settings Changed
chrome.runtime.onMessage.addListener(function(req) {
  if (req === 'SETTINGS_CHANGED') getSettings();
});

var body = document.getElementsByTagName('body')[0];
var currentLevel = '';
function updatePage() {
  if (!braincryptionSettings) return;
  console.log('braincryption: ', braincryptionSettings);

  if (braincryptionSettings.enabled) {
    body.classList.remove('braincrypt' + currentLevel);
    body.classList.add('braincrypt' + braincryptionSettings.intensity);
    currentLevel = braincryptionSettings.intensity;
  } else {
    body.classList.remove('braincrypt' + currentLevel);
    currentLevel = '';
  }
}
