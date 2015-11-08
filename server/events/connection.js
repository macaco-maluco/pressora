var scheduledMatches = {}

module.exports = function (context, socket) {
  socket.join(context.match.id)
  console.log(`player ${context.session.playerId} connected to match ${context.session.matchId}`)

  if (context.match.isReadyToLoad()) {
    schedulePrepareMatch(socket, context.match)
    socket.emit('wait-for-players')
  } else {
    socket.emit('wait-for-players')
  }
}

function schedulePrepareMatch (socket, match) {
  if (scheduledMatches[match.id]) return
  var waitTime = (match.join_until - Date.now()) / 1000

  if (waitTime > 0) {
    scheduledMatches[match.id] = true
    console.log(`minimun amount of players reached for match ${match.id}, waiting ${waitTime}s to start`)
    setTimeout(() => prepareMatch(socket, match), waitTime)
  } else {
    prepareMatch(socket, match)
  }
}

function prepareMatch (socket, match) {
  match.positionPlayers()
  var event = {players: match.players}
  console.log(`preparing match ${match.id}`)
  socket.to(match.id).emit('prepare-match', event)
  socket.emit('prepare-match', event)
}
