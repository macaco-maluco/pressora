module.exports = function (app) {
  app.get('/', require('./actions/home'))
}
