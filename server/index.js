var express = require('express')
var app = express()

require('./routes')(app)

export default app
