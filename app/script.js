'use strict';

var about = 'Visual encryption experiment utilizing neural adaptation to visually encode information. By progressively disfiguring a font while a user reads it, braincryption aims to subconsciously teach a user to recognize a new subset of characters. The idea is based off of the principles of pattern recognizers and neural adaptation in attempt to link warped characters to existing pattern recognizers for the original character. This is in contrast with teaching a new language, cryptography secret, or new subset of characters. The idea is not unlike how anyone can read their own bad hand-writing while others have trouble. With successful braincryption, a user could theoretically read these characters as if they were standard english characters while the actual characters are unrecognizable to the general population. This technology is currently experimental but with success could be applied to real world situations where sensitive information may be digitally encrypted but still vulnerable to over-the-shoulder screen readers. Ultimately a braincrypted font would be able to be downloaded by the client and applied to any device or platform. If you would like to know more please feel free to contact me. Otherwise I encourage you to play around with this and try it out. Paste your own text here or read this wonderful paragraph as many times as you like. To start hit the braincryption button below. The intensity and speed of the trainer can be modified at any time by using the sliders provided. As a side note, the app and fonts are still under development. Any feedback on certain characters is appreciated. Eventually this training process will be formatted as a paragraph instead of single words. As a disclaimer, this is experimental, so use at your own risk! Hope you enjoy!';
var alphfreq = 'etaoinshrdlcumwfgypbvkjxqz';

var inputBox = document.getElementById('input');
var braincryptedDiv = document.getElementById('braincrypted');

var text = about;
inputBox.value = about;
var intensity = 0;
var legend = {};

render();

// Rendering
function render() {
  updateLegend(intensity);
  renderText(text);
}

function renderText(text) {
  var letters = text.split('');
  var result = '';
  var tmp = '';
  var currentLevel = 'one';
  letters.forEach(function(letter) {
    var l = legend[letter];
    if (letter === ' ' || l === currentLevel) {
      tmp += letter;
    } else {
      result += encryptChunk(tmp, currentLevel);
      tmp = letter;
      currentLevel = l;
    }
    // result += encryptChunk(letter, legend[letter]);
  });
  braincryptedDiv.innerHTML = result;
}
function encryptChunk(text, level) {
  return [
    '<span class="',
    level || 'one',
    '">',
    text,
    '</span>'
  ].join('');
}

// Legend generation
function updateLegend(i) { // i = intensity
  var levels = ['one', 'two', 'three'];
  var sets = {};
  if (i < 26) {
    sets.one = alphfreq.slice(i%26);
    sets.two = alphfreq.slice(0, i%26);
    sets.three = '';
  } else {
    sets.one = '';
    sets.two = alphfreq.slice(0, i%26);
    sets.three = alphfreq.slice(i%26);
  }
  levels.forEach(function(level) {
    sets[level].split('').forEach(function(letter) {
      legend[letter] = level;
    });
  });
}



// Controls
inputBox.addEventListener('input', textChange, false);
inputBox.addEventListener('change', textChange, false);
function textChange(e) {
  text = e.target.value;
  render();
}

var intensitySlider = document.getElementById('intensity');
intensitySlider.addEventListener('input', intensityChange);
intensitySlider.addEventListener('change', intensityChange);
function intensityChange(e) {
  intensity = parseInt(e.target.value);
  render();
}

var aboutButton = document.getElementById('about');
aboutButton.addEventListener('click', aboutClick);
function aboutClick() {
  text = about;
  inputBox.value = text;
  render();
}

var inverted = false;
var invertButton = document.getElementById('invert');
var app = document.getElementById('app');
invertButton.addEventListener('click', invertClick);
function invertClick() {
  app.className = inverted ? '' : 'inverted';
  inverted = !inverted;
}
