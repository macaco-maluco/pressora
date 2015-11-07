var Directions = require('../domain/directions')

module.exports = function(match, player) {
  var originalDirection = player.pos.facing.slice(0)
  var oppositeDirection = Directions[Directions[player.pos.facing].left].left
  player.pos.facing = oppositeDirection
  player.decreaseBattery(5)
  require('./forward')(match, player)
  player.pos.facing = originalDirection
}
