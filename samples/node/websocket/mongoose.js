'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var Cat = mongoose.model('Cat', {
  name: String
});

console.log(48);

var kitty = new Cat({
  name: 'Zildjian'
});
kitty.save(function(err) {
  if (err) console.error(err);

  console.log('meow');

  kitty.name = 'Hello';

  kitty.save(function(err) {
    if (err) console.error(err);
    console.log('meow');
  });
});
