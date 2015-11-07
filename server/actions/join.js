var matchQueue = require('../match-queue')

function findMatch (id) {
  return matchQueue.find(match => match.id === id)
}

module.exports = function (io) {
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
    console.log(match.isReadyToStart)
    var interval = setInterval(function () {
      if (match.isReadyToStart()) {
        clearInterval(interval)
        socket.emit('start-match')
      } else {
        socket.emit('wait-for-players')
      }
    }, 1000)
  })
}
