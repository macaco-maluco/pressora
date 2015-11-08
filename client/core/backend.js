import axios from 'axios'
import store from './store'

let socket

axios.get('/api/game')
  .then(function ({ data }) {
    store.dispatch({ type: 'LOAD_MAP', map: data.map })
    store.dispatch({ type: 'SET_GAME_STATE', gameState: 'match-acquired' })

    socket = window.io.connect(data.socket_url, { path: '/game-socket' })
    socket.on('wait-for-players', function (data) {
      console.log('wait-for-players', data)
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'wait-for-players' })
    })
    socket.on('prepare-match', function (data) {
      console.log('prepare-match', data)
      store.dispatch({ type: 'LOAD_PLAYERS', players: data.players })
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'prepare-match' })
      socket.emit('client-ready')
    })
    socket.on('start-turn', function (data) {
      console.log('start-turn', data)
      store.dispatch({ type: 'CLEAN_COMMANDS' })
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'start-turn' })
    })
    socket.on('tick', function (data) {
      console.log('tick', data)
      store.dispatch({ type: 'LOAD_PLAYERS', players: data.players })
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'tick' })
      store.dispatch({ type: 'SET_TIME_LEFT', timeLeft: data.time_left })
    })
    socket.on('render', function (data) {
      console.log('render', data)
      store.dispatch({ type: 'LOAD_PLAYERS', players: data.players })
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'render' })
    })
    socket.on('end-turn', function (data) {
      console.log('end-turn', data)
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'end-turn' })
    })
    socket.on('end-match', function (data) {
      console.log('end-match', data)
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'end-match' })
    })
    socket.on('turn-starts-in', function (data) {
      console.log('turn-starts-in', data)
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'turn-starts-in' })
      store.dispatch({ type: 'WAIT_FOR', timeToWait: data.time_to_start_turn })
    })
    socket.on('error', function (err) {
      if (/no matches found/.test(err)) {
        store.dispatch({ type: 'SET_GAME_STATE', gameState: 'no-matches-found' })
      } else {
        console.log('error', arguments)
        store.dispatch({ type: 'SET_GAME_STATE', gameState: 'error' })
      }
    })
    socket.on('disconnect', function () {
      console.log('disconnect', arguments)
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'disconnect' })
    })
  })

export default {
  sendCommand (command) {
    socket.emit('command', command)
  }
}
