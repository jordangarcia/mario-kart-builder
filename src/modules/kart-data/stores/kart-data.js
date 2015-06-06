var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;

var KARTS_DATA = require('../karts.json');
var WHEELS_DATA = require('../wheels.json');
var GLIDERS_DATA = require('../gliders.json');


module.exports = Nuclear.Store({
  getInitialState: function() {
    return toImmutable({
      karts: KARTS_DATA,
      wheels: WHEELS_DATA,
      gliders: GLIDERS_DATA,
    });
  },

  initialize: function() {
  },
});
