module.exports = function (context, socket) {
  return function () {
    console.log(`player ${context.session.playerId} disconnected`)
  }
}
