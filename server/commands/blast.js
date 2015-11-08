var Commons = require('./commons')

module.exports = function (match, player) {
  console.log(`player ${player.name} is blasting`)
  if (player.consumeBattery(20)) {
    var enemiesDamaged = []
    Commons.findSurroundings(player.pos).forEach(function (coord) {
      var enemy = Commons.findPlayer(match, coord)
      if (enemy && enemy.takeHit()) {
        enemiesDamaged.push(enemy)
      }
    })
    player.transient.blast = { damages_players: enemiesDamaged }
  }
}
