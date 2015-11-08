var Commons = require('./commons')

module.exports = function (match, player) {
  console.log(`player ${player.name} is firing a beam`)
  if (player.consumeBattery(20)) {
    var destination = Commons.findDestination(match.map, player.pos, player.pos.facing)
    var beamPath = [destination.coord]
    var enemyHit = false
    var enemyDamaged = undefined
    while (!Commons.isWall(match.map, destination.terrain_type)
           && !Commons.isOutsideMap(destination)
           && !enemyHit) {
      var enemy = Commons.findPlayer(match, destination.coord)
      if (enemy) {
        enemyHit = true
        if (enemy.takeHit()) enemyDamaged = enemy
      }
      destination = Commons.findDestination(match.map, destination.coord, player.pos.facing)
      beamPath.push(destination.coord)
    }
    player.transient.beam = { path: beamPath, damages_player: enemyDamaged }
  }
}
