'use strict';

var intensity = 0;
var alphfreq = 'etaoinshrdlcumwfgypbvkjxqz';
var about = 'Visual encryption experiment utilizing neural adaptation to visually encode information. By progressivly disfiguring a font while a user reads it, braincryption aims to subconsciously teach a user to recognize a new subset of characters. The idea is based off of the principles of pattern recognizers and neural adaptation in attempt to link warped characters to existing pattern recognizers for the original character. This is in contrast with teaching a new language, cryptography secret, or new subset of characters. The idea is not unlike how anyone can read their own bad hand-writing while others have trouble. With succesful braincryption, a user could theoretically read these characters as if they were standard english characters while the actual characters are unrecognizable to the general population. This technology is currently experimental but with success could be applied to real world situations where sensitive information may be digitally encrypted but still vulnerable to over-the-shoulder screen readers. Ultimately a braincrypted font would be able to be downloaded by the client and applied to any device or platform. If you would like to know more please feel free to contact me. Otherwise I encourage you to play around with this and try it out. Paste your own text here or read this wonderful paragraph as many times as you like. To start hit the braincryption button below. The intensity and speed of the trainer can be modified at any time by using the sliders provided. As a side note, the app and fonts are still under development. Any feedback on certain characters is appreciated. Eventually this training process will be formatted as a paragraph instead of single words. As a disclaimer, this is experimental, so use at your own risk! Hope you enjoy!';
var training = false;
var speed = 300;
var base, v1, v2, v3;

// individual glyph canvas construction
var createGlyphCanvas = function(version, glyph, size) {
  var canvasId, html, wrap, glyphsDiv, canvas, ctx;
  canvasId = 'v' + version + 'c' + glyph.index;
  html = '<div class="wrapper" style="width:' + size + 'px"><canvas id ="' + canvasId + '" width="' + size + '" height="' + size + '"></canvas><span></span></div>';
  glyphsDiv = document.getElementById('glyphs');
  wrap = document.createElement('div');
  wrap.innerHTML = html;
  glyphsDiv.appendChild(wrap);
  canvas = document.getElementById(canvasId);
  ctx = canvas.getContext('2d');
  //enableHighDPICanvas(canvas, ctx);
  return ctx;
};

// rendering of the glyph grid
var renderGrid = function(version, font) {
  var glyphsDiv, x, y, amount, fontSize, ctx;
  glyphsDiv = document.getElementById('glyphs');
  glyphsDiv.innerHTML = '';
  amount = font.glyphs.length;
  x = 50;
  y = 120;
  fontSize = 144;
  console.log(amount);
  font.glyphs.forEach(function(glyph, index) {
    if(glyph.index > 31) {
      ctx = createGlyphCanvas(version, glyph, 150);
      ctx.clearRect(0, 0, 150, 150); // clear previous word
      glyph.draw(ctx, x, y, fontSize);
      glyph.drawPoints(ctx, x, y, fontSize);
      glyph.drawMetrics(ctx, x, y, fontSize);
    }
  });
};

// async loading of font versions
opentype.load('fonts/crypt1.ttf', function(err, font) {
  base = font;
  console.log('Loaded base');
  console.log('Length: ' + font.glyphs.length);
  renderGrid('X', font);
});
opentype.load('fonts/crypt1.ttf', function(err, font) {
  v1 = font;
  console.log('Loaded version 1');
  console.log('Length: ' + font.glyphs.length);
  // TODO: add glyphs index rendering
});
opentype.load('fonts/crypt2.ttf', function(err, font) {
  v2 = font;
  console.log('Loaded version 2');
  console.log('Length: ' + font.glyphs.length);
  // TODO: add glyphs index rendering
});
opentype.load('fonts/crypt3.ttf', function(err, font) {
  v3 = font;
  console.log('Loaded version 3');
  console.log('Length: ' + font.glyphs.length);
  // TODO: add glyphs index rendering
});

var renderFont = function() {
  var i = intensity;
  if(i < 26) {
    var letters1 = alphfreq.slice(i%26);
    var letters2 = alphfreq.slice(0, i%26);
  } else {
    var letters3 = alphfreq.slice(i%26);
    var letters2 = alphfreq.slice(0, i%26); //backwards for some reasons
  }
  var glyphs = [];

  // TODO: convert to single loop function on array
  if (letters1) {
    console.log('Adding one glyphs:' + letters1.length);
    v1.stringToGlyphs(letters1).forEach(function(glyph) {
      console.log('Substituting[1]: ' + glyph.unicode + ' for ' + base.glyphs[glyph.index].unicode);
      glyph.font = base;
      base.glyphs[glyph.index] = glyph;
    });
  }

  if (letters2) {
    console.log('Adding two glyphs' + letters2.length);
    v2.stringToGlyphs(letters2).forEach(function(glyph) {
      console.log('Substituting[2]: ' + glyph.unicode + ' for ' + base.glyphs[glyph.index+2].unicode);
      glyph.font = base;
      base.glyphs[glyph.index+2] = glyph;
    });
  }

  if (letters3) {
    console.log('Adding three glyphs' + letters3.length);
    v3.stringToGlyphs(letters3).forEach(function(glyph) {
      console.log('Substituting[3]: ' + glyph.unicode + ' for ' + base.glyphs[glyph.index+2].unicode);
      glyph.font = base;
      base.glyphs[glyph.index+2] = glyph;
    });
  }

  renderGrid('X', base);
};

$(document).ready(function() {

  var intensitySlider = document.getElementById('intensity');
  var changeIntensity = function() {
    intensity = intensitySlider.value;
    renderFont();
    console.log('Intensity set to ' + intensity);
  };
  intensitySlider.addEventListener('input', changeIntensity, false);
  intensitySlider.addEventListener('change', changeIntensity, false);
  //TODO: add auto increment toggle

  var speedSlider = document.getElementById('speed');
  var changeSpeed = function() {
    speed = 900 - speedSlider.value;
    console.log('Speed set to ' + speed);
  };
  speedSlider.addEventListener('input', changeSpeed, false);
  speedSlider.addEventListener('change', changeSpeed, false);

  $('#input').text(about);
  $('#about').click(function() {
    $('#input').text(about);
  });

  $('#braincrypt').click(function() {
    // TODO: find way to print paragraph/apply font
    if(training) return training = false;
    training = true;
    renderFont();

    var text = $('#input').val();
    console.log('Drawing ' + text);
    var canvas = document.getElementById('text').getContext('2d');
    var textarray = text.split(' ');
    // recursive loop through array of words
    var train = function(textarray, n) {
      setTimeout(function() {
      if (n == textarray.length || training == false) return;
      canvas.clearRect(0, 0, 500, 500); // clear previous word
      console.log('printing ' + textarray[n]);
      if(textarray[n]) base.draw(canvas, textarray[n], 0, 100, 64);
      train(textarray, ++n)
      }, speed);
    }
    train(textarray, 0);
    //base.draw(canvas, text, 0, 100, 48);
  });
  $('#stop').click(function() {
    training = false;
  });
});
