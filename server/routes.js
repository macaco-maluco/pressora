module.exports = function (app, io) {
  app.post('/api/game', require('./actions/game'))
  app.get('/api/stats', require('./actions/stats'))
  require('./actions/join')(io)
}
