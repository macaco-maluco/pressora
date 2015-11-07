#!/usr/bin/env node

require('babel/register')

var app = require('../server/index')

var port = process.env.PORT || 3000
app.listen(port)
console.log('Server started on port %s', port)
