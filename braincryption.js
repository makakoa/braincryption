var fontkit = require('fontkit');
var fs = require('fs');

var v1 = fontkit.openSync('crypt1.ttf');
var v2 = fontkit.openSync('crypt2.ttf');
console.log(v1);
var alphfreq = 'etaoinshrdlcumwfgypbvkjxqz';

var generateFontLibrary = function() {
  //for(var i = 0; i < 26; i++) {
    var i = 11;
    var font = v1.createSubset();

    var letters1 = alphfreq.slice(i);
    var letters2 = alphfreq.slice(0, i);
    
    var glyphs1 = v1.glyphsForString(letters1);
    var glyphs2 = v2.glyphsForString(letters2);
    glyphs1.forEach(function(glyph) {
      font.includeGlyph(glyph);
    });
    glyphs2.forEach(function(glyph) {
      font.includeGlyph(glyph);
    });
    //font.encodeStream().pipe(fs.createWriteStream('./font_lib/crypt' + (i + 1) + '.ttf'));
  //}
};

generateFontLibrary();



var alph = 'abcdefghijklmnopqrstuvwxyz'.split('');
var freqs = {
  a: 8.1,
  b: 1.4,
  c: 2.7,
  d: 4.3,
  e: 12.7,
  f: 2.2,
  g: 2,
  h: 6.1,
  i: 7,
  j: 0.15,
  k: 0.7,
  l: 4,
  m: 2.4,
  n: 6.7,
  o: 7.5,
  p: 1.9,
  q: 0.1,
  r: 5.9,
  s: 6.3,
  t: 9,
  u: 2.7,
  v: 0.9,
  w: 2.4,
  x: 0.15,
  y: 1.9,
  z: 0.07
};