module.exports = function(context, socket) {
  return function(message) {
    var slot = message.slot
    var command = message.command

    if ((slot >= 0 && slot < 5) && context.match.isAcceptingCommands()) {
      console.log(`[${context.match.id}] player ${context.session.playerId} adding command ${command} in slot ${slot}`)
      context.match.inputCommand(context.session.playerId, slot, command)
    }
  }
}
