#!/usr/bin/env node

require('babel/register')

var staticAssets = require('../server/static-assets')

staticAssets.build(function (err) {
  if (err) {
    console.log('Build failed')
    console.log(arguments)
    process.exit(1)
  }

  console.log('Build success!')
})
