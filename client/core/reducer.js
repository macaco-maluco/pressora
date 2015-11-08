import initialState from './initial-state'
import backend from './backend'

export default function (state = initialState, action) {
  let actions, players

  switch (action.type) {
    case 'CLEAN_COMMANDS':
      actions = initialState.actions
      return Object.assign({}, state, { actions })

    case 'EDIT_ACTION_SLOT':
      actions = state.actions.map((stateAction, index) => {
        if (stateAction.status === 'editting') { return Object.assign({}, stateAction, { status: '' }) };
        if (index !== action.slot) { return stateAction };
        return Object.assign({}, stateAction, { status: 'editting' })
      })

      return Object.assign({}, state, { actions })

    case 'MOVE_PLAYER':
      players = state.players.map((player, index) => {
        if (index !== action.playerId) { return player }
        return Object.assign({}, player, { pos: action.newPosition })
      })

      return Object.assign({}, state, { players })

    case 'SELECT_ACTION':
      actions = state.actions.map((stateAction, index) => {
        if (stateAction.status !== 'editting') { return stateAction }
        backend.sendCommand({ slot: index, command: action.action.type })
        return Object.assign({}, action.action)
      })

      return Object.assign({}, state, { actions })

    case 'LOAD_MAP':
      return Object.assign({}, state, { map: action.map, matchId: action.matchId, playerId: action.playerId })

    case 'LOAD_PLAYERS':
      players = action.players
      return Object.assign({}, state, { players })

    case 'SET_GAME_STATE':
      return Object.assign({}, state, { gameState: action.gameState, gameFinished: action.gameFinished })

    case 'WAIT_FOR':
      return Object.assign({}, state, { timeToWait: action.timeToWait })

    case 'SET_TIME_LEFT':
      return Object.assign({}, state, { timeLeft: action.timeLeft })

    case 'SET_WINNER':
      return Object.assign({}, state, { winnerId: action.winnerId })
  }

  return state
}
