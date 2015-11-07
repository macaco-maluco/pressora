var Commons = require('./commons')

module.exports = function(match, player) {
  var playerDestination = Commons.findDestination(match.map, player.pos, player.pos.facing)

  console.log(`player ${player.name} trying to move from`, player.pos, 'to', playerDestination)

  if (player.decreaseBattery(10)) {
    if (Commons.isOutsideMap(playerDestination)) {
      player.die('fall')
    } else {
      if (Commons.isWalkable(match.map, playerDestination.terrain_type)) {
        var enemy = Commons.findPlayer(match, playerDestination.coord)
        if (enemy) {
          var enemyDestination = Commons.findDestination(match.map, enemy.pos, player.pos.facing)
          if (Commons.isOutsideMap(enemyDestination)) {
            enemy.die('push-fall')
          } else {
            enemy.walk(enemyDestination.coord)
          }
        }
        player.walk(playerDestination.coord)
      }
    }
  }
}
