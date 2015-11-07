export function editActionSlot (action, slot) {
  return {
    type: 'EDIT_ACTION_SLOT',
    slot
  }
}


export function selectAction (action) {
  return {
    type: 'SELECT_ACTION',
    action
  }
}


export function movePlayer (playerId, newPosition) {
  return {
    type: 'MOVE_PLAYER',
    playerId,
    newPosition
  }
}
