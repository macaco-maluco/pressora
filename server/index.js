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

app.use(express.static('./client'))

app.use(session)
io.use(sharedsession(session))

require('./maps')
require('./static-assets')(app)
require('./routes')(app, io)

export default server
