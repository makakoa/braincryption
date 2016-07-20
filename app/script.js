'use strict';

var about = '   Braincryption is an innovative form of visual encryption that secures digital information beyond the digital realm. Despite having the best digital encryption available, there comes a time when private data needs to be presented in a way in which the recipient can understand. Unfortunately, this generally means inadvertently presenting the information in a way which others can understand as well (e.g. Written in plain text on a screen). What that leaves is the risk for that information to be captured, be it by over-the-shoulder onlookers, pictures, or remote viewing. To prevent that vulnerability, I created a new type of visual encryption, called braincryption, which secures information in this interface between a user and their digital device. In the end, a user will be able to read sensitive information in the view of others without exposing that information to them. \nHow it works: Braincryption works by subconsciously training users to read text which the general public cannot. The idea is much like how people can generally read their own hand-writing with ease even when others have a difficult time at it. By combining the neuro principles of neural-adaptation and pattern recognition, braincryption works to link new patterns with existing pattern recognizers. What that means is it leverages the users existing reading ability and extends it to a new set of characters avoiding the need for the user to learn a new language or cryptographic code. Additional by disfiguring text progressively while a user reads, all the training occurs subconsciously. Once completed, a fully braincrypted font would be able to be downloaded by the client and applied to any device or platform. \nIf you would like to know more please feel free to contact me. As a disclaimer, this is experimental, so use at your own risk! Enjoy!';
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
  result += encryptChunk(tmp, currentLevel);
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
