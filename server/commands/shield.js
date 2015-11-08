module.exports = function (match, player) {
  if (player.consumeBattery(25)) {
    console.log(`player ${player.name} shield activated`)
    player.transient.shield = true
  }
}
