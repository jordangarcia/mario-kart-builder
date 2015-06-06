var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;
var actionTypes = require('../action_types');

module.exports = Nuclear.Store({
  getInitialState: function() {
    return toImmutable({});
  },

  initialize: function() {
    this.on(actionTypes.UPDATE_TOURNAMENT, updateTournament)
    this.on(actionTypes.UPDATE_PLAYERS, updatePlayers)
    this.on(actionTypes.UPDATE_GROUPS, updateGroups)
  },
});

function updatePlayers(state, { tournamentId, players }) {
  return state.setIn([tournamentId, 'players'], toImmutable(players))
}

function updateGroups(state, { tournamentId, groups }) {
  debugger;
  return state.setIn([tournamentId, 'groups'], toImmutable(groups))
}

/**
 * @param {Immutable.Map} state
 * @param {Tournament} payload
 */
function updateTournament(state, tournament) {
  return state.set(tournament.id, toImmutable(tournament))
}
