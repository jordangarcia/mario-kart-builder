var _ = require('lodash')
var Flux = require('flux')
var actionTypes = require('./action_types')

exports.selectComponent = function(part, component) {
  Flux.dispatch(actionTypes.SELECT_KART_COMPONENT, {
    part, component
  })
}
/**
 * @param {ViewEnum} view
 */
exports.showView = function(view) {
  Flux.dispatch(actionTypes.APP_SWITCH_VIEW, {
    view: view
  })
}

exports.initialize = function() {
  window.localStorage.removeItem('state')
  // setup persistence
  Flux.observe(_.debounce(state => {
    window.localStorage.setItem('state', Flux.serialize())
  }))

  var persistedState = window.localStorage.getItem('state')
  if (!persistedState) {
    // fresh initializaton
    var tournament = Tournament.actions.create()
    exports.showView(views.PlayerUploader)
    exports.setTournamentId(tournament.id)
  } else {
    Flux.loadState(persistedState)
  }

  //window.onerror = () => exports.reset()
}

exports.reset = function() {
  window.localStorage.removeItem('state')
  Flux.reset()
  exports.showView(views.PlayerUploader)
  window.location.reload()
}
