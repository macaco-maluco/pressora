var Commons = require('./commons')

module.exports = function(match, player) {
  console.log(`player ${player.name} is firing a beam`)
  if (player.decreaseBattery(20)) {
    var destination = Commons.findDestination(match.map, player.pos, player.pos.facing)
    var beamPath = [destination.coord]
    var enemyFound = false
    while (!Commons.isWall(match.map, destination.terrain_type)
           && !Commons.isOutsideMap(destination)
           && !enemyFound) {
      var enemy = Commons.findPlayer(match, destination.coord)
      if (enemy) {
        enemy.takeDamage()
        enemyFound = true
      }
      destination = Commons.findDestination(match.map, destination.coord, player.pos.facing)
      beamPath.push(destination.coord)
    }
  }
  console.log('beam path', beamPath)
}
