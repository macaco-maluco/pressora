module.exports = function (match, player) {
  if (player.consumeBattery(5)) player.spinLeft()
}
