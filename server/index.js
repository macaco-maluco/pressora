var express = require('express')
var app = express()
var session = require('express-session')

app.use(session({
  secret: require('./session-secret'),
  resave: false,
  saveUninitialized: true
}))

require('./maps')
require('./static-assets')(app)
require('./routes')(app)

export default app
