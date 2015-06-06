var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;
var actionTypes = require('../action_types');

var DEFAULTS = {
  kart: null,
  wheels: null,
  glider: null,
}

module.exports = Nuclear.Store({
  getInitialState: function() {
    return toImmutable(DEFAULTS);
  },

  initialize: function() {
    this.on(actionTypes.SELECT_KART_COMPONENT, selectComponent)
  },
});

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 */
function selectComponent(state, { part, component }) {
  return state.set(part, toImmutable(component))
}
