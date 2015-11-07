module.exports = function (context, socket) {
  socket.join(context.match.id)
  console.log(`player ${context.session.playerId} connected to match ${context.session.matchId}`)

  if (context.match.isReadyToLoad()) {
    context.match.positionPlayers()
    var event = {players: context.match.players}
    console.log(`preparing match ${context.session.matchId}`)
    socket.to(context.match.id).emit('prepare-match', event)
    socket.emit('prepare-match', event)
  } else {
    socket.emit('wait-for-players')
  }
}
