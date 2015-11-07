module.exports = function(context, socket) {
  return function() {
    context.match.players_ready[context.session.playerId] = true
    console.log(`player ${context.session.playerId} ready`)

    if (context.match.isReadyToStart()) {
      var event = {}
      console.log(`starting match ${context.match.id}`)
      context.match.status = 'started'
      socket.to(context.match.id).emit('start-match', event)
      socket.emit('start-match', event)
    }
  }
}
