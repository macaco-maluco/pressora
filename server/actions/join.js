module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('socket connection')
    var req = socket.request
    console.log(req)
  })
}
