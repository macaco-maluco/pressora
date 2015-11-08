module.exports = function (match, player) {
  console.log(`player ${player.name} is recharging`)
  player.rechargeBattery(20)
}
