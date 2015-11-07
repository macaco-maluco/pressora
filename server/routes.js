module.exports = function(app) {
  app.get('/', require('./actions/home'))
  app.get('/game', require('./actions/game'))
}
