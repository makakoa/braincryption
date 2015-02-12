var intensity = 0;
var alphfreq = 'etaoinshrdlcumwfgypbvkjxqz';
var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum arcu ut accumsan ornare. Donec ligula purus, suscipit sit amet tellus id, suscipit blandit odio. Donec convallis erat lacus, ac semper neque luctus quis. Donec in dolor venenatis, porta dolor at, sagittis nibh. Duis vel interdum libero. Donec a tellus commodo, rutrum enim at, finibus ante. Quisque ipsum odio, laoreet euismod orci eu, efficitur porttitor urna. Etiam erat mi, accumsan molestie commodo eu, pulvinar at lorem. Nullam vulputate risus a ex commodo aliquet. Quisque at leo sem. Nam et turpis vel ex pulvinar finibus. Maecenas semper mi quis rutrum pulvinar. Fusce sit amet justo placerat massa cursus bibendum. Vivamus vitae massa blandit, ultricies enim quis, imperdiet nisi. In nulla enim, ultricies quis scelerisque sed, lacinia fringilla leo. Maecenas interdum, lacus eu laoreet rutrum, purus sapien tempus nisi, a dictum erat lectus at felis. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus ultrices viverra. Integer sodales eleifend enim, iaculis tempor erat finibus id.';

opentype.load('fonts/crypt1.ttf', function(err, font) {
  v1 = font;
});
opentype.load('fonts/crypt2.ttf', function(err, font) {
  v2 = font;
});

$(document).ready(function() {
  $('#input').text(lorem);
  $('#braincrypt').click(function() {
    var i = intensity;
    var temp = v1;
    var letters1 = alphfreq.slice(i);
    var letters2 = alphfreq.slice(0, i);

    var glyphs1 = v1.stringToGlyphs(letters1);
    var glyphs2 = v2.stringToGlyphs(letters2);
    temp.glyphs = glyphs1.concat(glyphs2);
    var text = document.getElementById('input').text;
    var canvas = document.getElementById('text').getContext('2d');
    temp.draw(canvas, text);
  });
});