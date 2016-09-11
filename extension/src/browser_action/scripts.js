'use strict';

var encryptButton = document.getElementById('encrypt');
encryptButton.addEventListener('click', encrypt);
function encrypt() {
  console.log('encrypting');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'encrypt'}, function(response) {
      console.log(response);
    });
  });
}
