var Vue = require('vue')
var Flux = require('flux')
//var App = require('modules/app')
var KartData = require('modules/kart-data');
var kartBuilder = require('components/kart-builder')

Vue.config.debug = true

window.KartData = KartData;
window.flux = Flux;

//App.actions.initialize()

var KartBuilder = Vue.extend(kartBuilder)
new KartBuilder({
  el: '#app',
})
