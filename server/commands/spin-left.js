module.exports = function(match, player) {
  if (player.decreaseBattery(5)) player.spinLeft()
}
