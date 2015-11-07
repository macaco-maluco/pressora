import initialState from './initial-state'

export default function (state = initialState, action) {
  let actions

  switch (action.type) {
    case 'EDIT_ACTION_SLOT':
      actions = state.actions.map((stateAction, index) => {
        if (stateAction.status === 'editting') { return Object.assign({}, stateAction, { status: '' }) };
        if (index !== action.slot) { return stateAction };
        return Object.assign({}, stateAction, { status: 'editting' })
      })

      return Object.assign({}, state, { actions })

    case 'MOVE_PLAYER':
      const players = state.players.map((player, index) => {
        if (index !== action.playerId) { return player }
        return Object.assign({}, player, { pos: action.newPosition })
      })

      return Object.assign({}, state, { players })

    case 'SELECT_ACTION':
      actions = state.actions.map((stateAction, index) => {
        if (stateAction.status !== 'editting') { return stateAction }
        return Object.assign({}, action.action)
      })

      return Object.assign({}, state, { actions })
  }

  return state
}
