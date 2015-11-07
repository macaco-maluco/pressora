var express = require('express')
var app = express()

require('./static-assets')(app)
require('./routes')(app)

export default app
