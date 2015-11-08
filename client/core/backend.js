import axios from 'axios'
import store from './store'

let renderQueue = []
let socket

function performRender (data) {
  return new Promise(function (resolve) {
    data.players.forEach(player => {
      const action = player.transient.action

      if (action === 'forward' ||
          action === 'backward' ||
          action === 'spin-left' ||
          action === 'spin-right') {
        player.status = 'moving'
      }

      if (action === 'blast') {
        player.status = 'blasting'
      }

      if (action === 'beam') {
        player.status = 'shooting'
      }

      if (action === 'shield') {
        player.status = 'shielding'
      }

      if (action === 'recharge') {
        player.status = 'recharge'
      }

      if (action === 'die') {
        player.status = 'dying'
      }
    })

    const clearStatusAndResolve = () => {
      data.players.forEach(player => delete player.status)
      store.dispatch({ type: 'LOAD_PLAYERS', players: data.players })
      resolve()
    }

    store.dispatch({ type: 'LOAD_PLAYERS', players: data.players })
    setTimeout(clearStatusAndResolve, 1000)
  })
}

function enqueueRender (data) {
  renderQueue.push(performRender.bind(null, data))
}

axios.get(`/api/game${window.location.search}`)
  .then(function ({ data }) {
    store.dispatch({ type: 'LOAD_MAP', map: data.map, playerId: data.player_id })
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
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'render' })
      enqueueRender(data)
    })
    socket.on('end-turn', function (data) {
      console.log('end-turn', data, renderQueue.length)
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'end-turn' })

      renderQueue.reduce((promise, perform) => {
        return promise.then(perform)
      }, Promise.resolve()).then(() => renderQueue = [])
    })
    socket.on('end-match', function (data) {
      console.log('end-match', data)
      store.dispatch({ type: 'SET_GAME_STATE', gameState: 'end-match' })
      store.dispatch({ type: 'SET_WINNER', winnerId: data.winner_id })
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
