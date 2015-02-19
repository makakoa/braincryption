var intensity = 0;
var alphfreq = 'etaoinshrdlcumwfgypbvkjxqz';
var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum arcu ut accumsan ornare. Donec ligula purus, suscipit sit amet tellus id, suscipit blandit odio. Donec convallis erat lacus, ac semper neque luctus quis. Donec in dolor venenatis, porta dolor at, sagittis nibh. Duis vel interdum libero. Donec a tellus commodo, rutrum enim at, finibus ante. Quisque ipsum odio, laoreet euismod orci eu, efficitur porttitor urna. Etiam erat mi, accumsan molestie commodo eu, pulvinar at lorem. Nullam vulputate risus a ex commodo aliquet. Quisque at leo sem. Nam et turpis vel ex pulvinar finibus. Maecenas semper mi quis rutrum pulvinar. Fusce sit amet justo placerat massa cursus bibendum. Vivamus vitae massa blandit, ultricies enim quis, imperdiet nisi. In nulla enim, ultricies quis scelerisque sed, lacinia fringilla leo. Maecenas interdum, lacus eu laoreet rutrum, purus sapien tempus nisi, a dictum erat lectus at felis. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus ultrices viverra. Integer sodales eleifend enim, iaculis tempor erat finibus id.';
var training = false;
var speed = 300;
var base;

opentype.load('fonts/crypt1.ttf', function(err, font) {
  base = font;
  console.log('Loaded base');
});
opentype.load('fonts/crypt1.ttf', function(err, font) {
  v1 = font;
  console.log('Loaded version 1');
});
opentype.load('fonts/crypt2.ttf', function(err, font) {
  v2 = font;
  console.log('Loaded version 2');
});
opentype.load('fonts/crypt3.ttf', function(err, font) {
  v3 = font;
  console.log('Loaded version 3');
});

var renderFont = function() {
  var i = intensity;
  var letters1 = alphfreq.slice(i);
  var letters2 = alphfreq.slice(0, i);
  var glyphs = [];

  if (letters1) {
    console.log('Adding version 1 glyphs');
    v1.stringToGlyphs(letters1).forEach(function(glyph) {
      console.log('Substituting: ' + glyph.unicode + ' for ' + base.glyphs[glyph.index].unicode);
      glyph.font = base;
      //base.glyphs[glyph.index] = glyph;
      glyphs.push(glyph);
    });
  }
  if (letters2) {
    console.log('Adding version 2 glyphs');
    v2.stringToGlyphs(letters2).forEach(function(glyph) {
      console.log('Substituting: ' + glyph.unicode + ' for ' + base.glyphs[glyph.index].unicode);
      glyph.font = base;
      //base.glyphs[glyph.index] = glyph;
      glyphs.push(glyph);
    });
  }
  glyphs.forEach(function(glyph) {
    base.glyphs[glyph.index] = glyph;
  });
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

  $('#input').text(lorem);
  $('#braincrypt').click(function() {
    training = true;
    renderFont();
    var text = $('#input').val();
    console.log('Drawing ' + text);
    var canvas = document.getElementById('text').getContext('2d');
    var textarray = text.split(' ');
    var train = function(textarray, n) {
      setTimeout(function() {
      if (n == textarray.length || training == false) return;
      canvas.clearRect(0, 0, 500, 500);
      console.log('printing ' + textarray[n]);
      if(textarray[n]) base.draw(canvas, textarray[n], 0, 100, 120);
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