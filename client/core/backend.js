import axios from 'axios'
import store from './store'

axios.get('/game')
  .then(function ({ data }) {
    store.dispatch({ type: 'LOAD_MAP', map: data.map })

    var socket = window.io.connect(':3000/', { path: '/game-socket' })
    socket.on('wait-for-players', function (data) {
      console.log('wait-for-players', data)
    })
    socket.on('prepare-match', function (data) {
      console.log('prepare-match', data)
      store.dispatch({ type: 'LOAD_PLAYERS', players: data.players })
      socket.emit('client-ready')
    })
    socket.on('start-turn', function (data) {
      console.log('start-turn', data)
    })
    socket.on('tick', function (data) {
      console.log('tick', data)
    })
    socket.on('render', function (data) {
      console.log('render', data)
    })
    socket.on('end-turn', function (data) {
      console.log('end-turn', data)
    })
    socket.on('end-match', function (data) {
      console.log('end-match', data)
    })
    socket.on('error', function () {
      console.log(arguments)
    })
  })
