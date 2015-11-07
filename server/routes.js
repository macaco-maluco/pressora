module.exports = function (app, io) {
  app.get('/', require('./actions/home'))
  app.get('/game', require('./actions/game'))
  app.get('/stats', require('./actions/stats'))
  require('./actions/join')(io)
}
