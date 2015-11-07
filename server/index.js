var express = require('express')
var app = express()

require('./routes')(app)

var port = 3000
app.listen(port)
console.log('Server started on port %s', port)
