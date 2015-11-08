module.exports = function (context, socket) {
  return function () {
    var playerId = context.session.playerId
    console.log(`player ${playerId} disconnected`)
    var player = context.match.players.find((p) => p.id === playerId)
    if (player) player.die('disconnected')
  }
}
