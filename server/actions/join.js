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
    var context = {
      session: session,
      match: match
    }

    require('../events/connection')(context, socket)
    socket.on('client-ready', require('../events/client-ready')(context, socket))
    socket.on('command', require('../events/command')(context, socket))
  })
}
