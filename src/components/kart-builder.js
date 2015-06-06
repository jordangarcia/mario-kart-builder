var Flux = require('flux')
var KartData = require('modules/kart-data')
var App = require('modules/app')

module.exports = {
  template: require('./kart-builder.html'),

  components: {
    'kart-component': require('./kart-component'),
  },

  methods: {
    selectComponent: App.actions.selectComponent,
  },

  created() {
    Flux.bindVueValues(this, {
      karts: KartData.getters.karts,
      wheels: KartData.getters.wheels,
      gliders: KartData.getters.gliders,
      currentKart: App.getters.currentKart,
    })
  }
}
