var scheduledMatches = {}

module.exports = function (context, socket) {
  socket.join(context.match.id)
  console.log(`player ${context.session.playerId} connected to match ${context.session.matchId}`)

  if (context.match.isReadyToLoad()) {
    if (schedulePrepareMatch(socket, context.match)) {
      socket.emit('wait-for-players')
    }
  } else {
    socket.emit('wait-for-players')
  }
}

function schedulePrepareMatch (socket, match) {
  if (scheduledMatches[match.id]) {
    if (match.isFull()) {
      console.log(`maximun amount of players reached, starting match ${match.id} now`)
      clearTimeout(scheduledMatches[match.id])
      prepareMatch(socket, match)
      return false
    }

    return true
  }

  var waitTime = match.join_until - Date.now()

  if (waitTime > 0) {
    console.log(`minimun amount of players reached for match ${match.id}, waiting ${waitTime}ms to start`)
    scheduledMatches[match.id] = setTimeout(() => prepareMatch(socket, match), waitTime)
    return true
  }

  clearTimeout(scheduledMatches[match.id])
  prepareMatch(socket, match)
  return false
}

function prepareMatch (socket, match) {
  match.positionPlayers()
  var event = {players: match.players}
  console.log(`preparing match ${match.id}`)
  socket.to(match.id).emit('prepare-match', event)
  socket.emit('prepare-match', event)
}
