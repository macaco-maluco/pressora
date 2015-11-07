export function editActionSlot (slot) {
  return {
    type: 'EDIT_ACTION_SLOT',
    slot
  }
}


export function selectAction (slot, action) {
  return {
    type: 'SELECT_ACTION_SLOT',
    slot,
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
