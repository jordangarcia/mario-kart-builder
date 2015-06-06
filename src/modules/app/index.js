var Flux = require('flux');

// register stores with Flux system
Flux.registerStores({
  currentKart: require('./stores/current-kart'),
});

module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: require('./getters'),
};
