var Flux = require('flux')
var actionTypes = require('./action_types')
var fns = require('./fns')
var uuid = require('node-uuid')

/**
 * @param {Player[]} players
 * @param {Group[]} groups
 */
exports.create = function(tournament) {
  tournament = tournament || {}
  var players = tournament.players || []
  var groups = tournament.groups || []
  var tournament = {
    id: uuid(),
    players: players,
    groups: groups,
  }
  Flux.dispatch(actionTypes.UPDATE_TOURNAMENT, tournament)
  return tournament
}

exports.updatePlayers = function(tournament, players) {
  Flux.dispatch(actionTypes.UPDATE_PLAYERS, {
    tournamentId: tournament.id,
    players: players,
  })
}

exports.createGroups = function(tournament, { percentiles, seed }) {
  var groups = fns.generateGroups(tournament, { percentiles, seed })

  Flux.dispatch(actionTypes.UPDATE_GROUPS, {
    tournamentId: tournament.id,
    groups: groups,
  });
};
