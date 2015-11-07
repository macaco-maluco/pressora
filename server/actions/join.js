module.exports = function (io) {
  io.on('connection', function (socket) {
    var session = socket.handshake.session
    console.log(session)
    socket.emit('wait')
  })
}
