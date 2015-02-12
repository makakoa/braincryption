var fontkit = require('fontkit');
var opentype = require('opentype.js');
var fs = require('fs');

var v1;
var v2;

opentype.load('STYLLO.TTF', function(err, font) {
  v1 = font;
opentype.load('crypt2.ttf', function(err, font) {
  v2 = font;
var alphfreq = 'etaoinshrdlcumwfgypbvkjxqz';

  console.log(v1);
for(var i = 0; i < 1; i++) {
  var temp = v1;
  var letters1 = alphfreq.slice(i);
  var letters2 = alphfreq.slice(0, i);

  var glyphs1 = v1.stringToGlyphs(letters1);
  var glyphs2 = v2.stringToGlyphs(letters2);
  temp.glyphs = glyphs1.concat(glyphs2);
  var stream = fs.createWriteStream('./font_lib/crypt' + (i + 1) + '.ttf');
  stream.write(temp);
}
});
});

  /*glyphs1.forEach(function(glyph) {
    font.includeGlyph(glyph);
  });
  glyphs2.forEach(function(glyph) {
    font.includeGlyph(glyph);
  });
  font.encodeStream().pipe(fs.createWriteStream('./font_lib/crypt' + (i + 1) + '.ttf'));*/
//var v1 = fontkit.openSync('crypt1.ttf');
//var v2 = fontkit.openSync('crypt2.ttf');



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