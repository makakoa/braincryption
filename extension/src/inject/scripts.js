'use strict';

console.log('braincyption running');

var body = document.getElementsByTagName('body')[0];

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (req.message === 'encrypt') body.classList.toggle('braincrypt');
  sendResponse('encrypting');
});
