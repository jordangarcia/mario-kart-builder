var Flux = require('flux');

// register stores with Flux system
Flux.registerStores({
  KartData: require('./stores/kart-data'),
});

module.exports = {
  getters: require('./getters'),
};
