/**
 * Module specific pure functions
 */
var _ = require('lodash')
var seedrandom = require('seedrandom')

/**
 * @param {String} input
 * @return {Player[]}
 */
exports.parsePlayerCsv = function(input) {
  var people = _(input.trim().split('\n'))
    .map(line => {
      var exploded = line.split('\t')
      var email = exploded[0]
      var skill = parseInt(exploded[1], 10)

      if (!email) {
        return
      }

      var name = email.split('@')[0]

      return {
        name: name,
        email: email,
        skill: skill,
      }
    })
    .filter(a => !!a)
    .value()

  return people || []
}

exports.validatePlayer = function(player) {
  if (!player.name || player.name.length === 0) {
    return false
  }
  if (
    !player.skill ||
    player.skill < 1 ||
    player.skill > 5
  ) {
    return false
  }

  return true
}

/**
 * @param {Player[]} players
 * @param {Object} opts
 * @param {Array<Array>} opts.percentiles
 * @return {Array<Array<Player>>}
 */
exports.generateGroups = function(tournament, { percentiles, seed }) {
  var tournament = _.cloneDeep(tournament)
  players = _(tournament.players)
    .sortByAll(['skill', 'name'])
    .reverse()
    .value()
  var randomIntFn = createRandomIntFn(seed)
  var perGroup = 4
  var n = players.length
  var g = Math.floor(n / perGroup)
  var r = n % perGroup

  if (r === perGroup - 1) {
    g++;
  }

  if (g === 0) {
    throw new Error("Must have at least " + perGroup + " players")
  }

  var groups = _.range(0, g).map(_ => [])
  var players = _.sortBy(players, 'skill')
  var roundNum = 0

  while (players.length > 0) {
    var percentile = percentiles[roundNum]
    groups.forEach(function(group) {
      if (players.length > 0) {
        group.push(sample(players, percentile, randomIntFn))
      }
    })
    roundNum++
  }

  return groups
}


/**
 * Sample a random person
 * @param {Object[]} list
 * @param {Array} percentiles
 * @return {Object}
 */
function sample(list, percentiles, randomFn) {
  debugger;
  var size = list.length;

  var bounds = percentiles.map(function(percentile) {
    return Math.floor((percentile / 100) * size)
  })

  var pick = randomFn(bounds[0], Math.max(bounds[1] - 1, 0))

  if (!list[pick]) {
    throw new Error("Invalid pick")
  }

  var res = list.splice(pick, 1);
  return res[0]
}


function createRandomIntFn(seed) {
  var rng = seedrandom(seed)

  return function(min, max) {
    return Math.floor(rng() * (max - min)) + min;
  }
}
