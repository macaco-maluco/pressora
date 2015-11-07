module.exports = function (context, socket) {
  return function () {
    context.match.players_ready[context.session.playerId] = true
    console.log(`player ${context.session.playerId} ready`)

    if (context.match.isReadyToStart()) {
      console.log(`starting match ${context.match.id}`)
      context.match.start()
      socket.to(context.match.id).emit('start-turn')
      socket.emit('start-turn')

      startGame(context, socket)
    }
  }
}

function startGame (context, socket) {
  var matchId = context.session.matchId

  startTick(socket, matchId)
    .then(function () {
      socket.to(matchId).emit('render', {})
      socket.emit('render', {})
    })
}

function startTick (socket, matchId) {
  return new Promise(function (resolve, reject) {
    scheduleTick(socket, matchId, 30, resolve)
  })
}

function scheduleTick (socket, matchId, timeLeft, callback) {
  setTimeout(function () {
    socket.to(matchId).emit('tick', { time_left: timeLeft })
    socket.emit('tick', { time_left: timeLeft })
    if (timeLeft > 0) scheduleTick(socket, matchId, timeLeft - 1, callback)
    else callback()
  }, 1000)
}
