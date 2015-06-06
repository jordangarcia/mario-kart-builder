var Flux = require('flux');

// register stores with Flux system
Flux.registerStores({
  tournament: require('./stores/tournament-store'),
});

module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: require('./getters'),
};
