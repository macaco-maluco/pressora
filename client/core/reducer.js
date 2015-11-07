import initialState from './initial-state'

export default function (state = initialState, action) {
  switch (action.type) {
    case 'EDIT_ACTION_SLOT':
      const actions = state.actions.map((stateAction, index) => {
        if (stateAction.status === 'active') { return Object.assign({}, stateAction, { status: '' }) };
        if (index !== action.slot) { return stateAction };
        return Object.assign({}, stateAction, { status: 'active' })
      })

      return Object.assign({}, state, { actions })
  }

  return state
}
