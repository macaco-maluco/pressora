var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)
var session = require('express-session')({
  secret: require('./session-secret'),
  resave: false,
  saveUninitialized: true
})

var sharedsession = require('express-socket.io-session')
var SocketIO = require('socket.io')
var io = new SocketIO(server, { path: '/game-socket' })

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./dist'))
} else {
  require('./static-assets').middleware(app)
}

app.use(session)
io.use(sharedsession(session))

require('./maps')
require('./routes')(app, io)

export default server
