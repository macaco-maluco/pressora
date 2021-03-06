module.exports = function (context, socket) {
  return function () {
    context.match.players_ready[context.session.playerId] = true
    console.log(`player ${context.session.playerId} ready`)

    if (context.match.isReadyToStart()) {
      console.log(`starting match ${context.match.id}`)
      new GameLoop(socket, context.match).start().catch(err => console.err(err))
    }
  }
}

class GameLoop {
  constructor (socket, match) {
    this.socket = socket
    this.match = match
    this.waitDuration = 6000
    this.turnDuration = 25
    this.turnCountdownDuration = 3
  }

  start () {
    this.match.incTurn()
    if (this.match.isFinished()) {
      return this.wait().then(() => this.sendEndMatch())
    } else {
      return this.scheduleTurnCountdown(this.turnCountdownDuration).then(() => {
        return this.run().then(() => {
          if (this.match.isFinished()) {
            return this.wait().then(() => this.sendEndMatch())
          } else {
            return this.wait().then(() => this.start())
          }
        })
      })
    }
  }

  sendEndMatch () {
    var winner = this.match.winner
    var winnerId = winner ? winner.id : undefined
    this.emit('end-match', { winner_id: winnerId })
  }

  run () {
    return new Promise((resolve, reject) => {
      this.match.clearCommands()
      this.match.acceptCommands()
      this.emit('start-turn', { turn: this.match.turn })
      this.scheduleTick(this.turnDuration, resolve)
    }).then(() => {
      this.executeCommands()
      this.match.blockCommands()
      this.match.clearCommands()
      this.emit('end-turn', { game_finished: this.match.isFinished() })
    })
  }

  executeCommands () {
    var numberOfSlots = 5
    for (var i = 0; i < numberOfSlots; i++) {
      this.match.executeSlotCommands(i)
      this.emit('render', {players: this.match.players})
      this.match.clearPlayersTransientState()
      if (this.match.checkEndGame()) break
    }
  }

  scheduleTick (timeLeft, callback) {
    setTimeout(() => {
      this.emit('tick', { time_left: timeLeft, players: this.match.players })
      if (timeLeft > 0) this.scheduleTick(timeLeft - 1, callback)
      else callback()
    }, 1000)
  }

  scheduleTurnCountdown (timeToStartTurn) {
    return new Promise((resolve, reject) => {
      this.wait(1000).then(() => {
        this.emit('turn-starts-in', { time_to_start_turn: timeToStartTurn })
        return timeToStartTurn > 0 && this.scheduleTurnCountdown(timeToStartTurn - 1)
      }).then(resolve, reject)
    })
  }

  wait (waitDuration) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, waitDuration || this.waitDuration)
    })
  }

  emit (event, message) {
    this.socket.to(this.match.id).emit(event, message)
    this.socket.emit(event, message)
  }
}
