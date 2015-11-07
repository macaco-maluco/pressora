module.exports = function (app, io) {
  app.get('/', require('./actions/home'))
  app.get('/game', require('./actions/game'))
  require('./actions/join')(io)
}
