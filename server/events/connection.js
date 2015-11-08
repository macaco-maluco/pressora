var scheduledMatches = {}
var scheduledWaitForPlayers = {}
const maxWaitForPlayersTimeout = 2 * 60 * 1000

module.exports = function (context, socket) {
  socket.join(context.match.id)
  console.log(`player ${context.session.playerId} connected to match ${context.session.matchId}`)

  if (context.match.isReadyToLoad()) {
    clearTimeout(scheduledWaitForPlayers[context.match.id])
    delete scheduledWaitForPlayers[context.match.id]
    if (schedulePrepareMatch(socket, context.match)) {
      socket.emit('wait-for-players')
    }
  } else {
    socket.emit('wait-for-players')
    scheduleWaitForPlayersTimeout(socket, context.match)
  }
}

function scheduleWaitForPlayersTimeout (socket, match) {
  if (scheduledWaitForPlayers[match.id]) return
  scheduledWaitForPlayers[match.id] = setTimeout(() => {
    console.log(`match ${match.id} expired without enough players`)
    delete scheduledWaitForPlayers[match.id]
    match.status = 'finished'
    socket.to(match.id).emit('match-expired')
    socket.emit('match-expired')
  }, maxWaitForPlayersTimeout)
}

function schedulePrepareMatch (socket, match) {
  if (scheduledMatches[match.id]) {
    if (match.isFull()) {
      console.log(`maximum amount of players reached, starting match ${match.id} now`)
      clearTimeout(scheduledMatches[match.id])
      delete scheduledMatches[match.id]
      prepareMatch(socket, match)
      return false
    }

    return true
  }

  var waitTime = match.join_until - Date.now()

  if (waitTime > 0) {
    console.log(`minimum amount of players reached for match ${match.id}, waiting ${waitTime}ms to start`)
    scheduledMatches[match.id] = setTimeout(() => prepareMatch(socket, match), waitTime)
    return true
  }
  clearTimeout(scheduledMatches[match.id])
  delete scheduledMatches[match.id]
  prepareMatch(socket, match)
  return false
}

function prepareMatch (socket, match) {
  match.positionPlayers()
  delete scheduledMatches[match.id]
  var event = {players: match.players}
  console.log(`preparing match ${match.id}`)
  socket.to(match.id).emit('prepare-match', event)
  socket.emit('prepare-match', event)
}
