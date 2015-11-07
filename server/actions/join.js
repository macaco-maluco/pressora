var matchQueue = require('../match-queue')

function findMatch (id) {
  return matchQueue.find(match => match.id === id)
}

module.exports = function (io) {
  // auth
  io.use(function (socket, next) {
    var session = socket.handshake.session
    var match = findMatch(session.matchId)

    if (!match) {
      next(new Error('no matches found'))
    } else {
      next()
    }
  })

  io.on('connection', function (socket) {
    var session = socket.handshake.session
    var match = findMatch(session.matchId)

    socket.join(match.id)
    console.log(`player ${session.playerId} connected to match ${session.matchId}`)

    if (match.isReadyToLoad()) {
      var event = {players: match.players}
      console.log(`preparing match ${session.matchId}`)
      socket.to(match.id).emit('prepare-match', event)
      socket.emit('prepare-match', event)
    } else {
      socket.emit('wait-for-players')
    }

    socket.on('client-ready', function () {
      var session = socket.handshake.session
      var match = findMatch(session.matchId)

      match.players_ready[session.playerId] = true
      console.log(`player ${session.playerId} ready`)

      if (match.isReadyToStart()) {
        var event = {}
        console.log(`starting match ${match.id}`)
        socket.to(match.id).emit('start-match', event)
        socket.emit('start-match', event)
      }
    })
  })
}
