module.exports = function (app, io) {
  app.get('/api/game', require('./actions/game'))
  app.get('/api/stats', require('./actions/stats'))
  require('./actions/join')(io)
}
