import React from 'react'

export default React.createClass({
  propTypes: {
    gameState: React.PropTypes.string,
    gameFinished: React.PropTypes.bool,
    timeToWait: React.PropTypes.number,
    player: React.PropTypes.object,
    winnerId: React.PropTypes.string
  },

  render: function () {
    var message = this.getMessage()
    var visible = message ? 'visible' : 'invisible'
    var winner = this.isWinner() ? 'winner' : ''

    return (
      <div className={`game-message ${visible}`}>
        <div className={`message ${this.props.gameState}`}>
          <span className={`${this.props.gameState} ${winner}`}>{message}</span>
        </div>
      </div>
    )
  },

  isWinner: function () {
    if (!this.props.player) return false
    return this.props.winnerId === this.props.player.id
  },

  getMessage: function () {
    if (this.isGameRunningAndPlayerDead()) {
      return `You died! ${this.getDeathReason()}`
    }

    switch (this.props.gameState) {
      case 'searching-for-game':
        return 'Searching for game'
      case 'wait-for-players':
        return 'Waiting for players'
      case 'turn-starts-in':
        return `Turn starts in ${this.props.timeToWait} seconds`
      case 'end-match':
        return this.isWinner() ? 'You win' : `Game Over${this.getDeathReason()}`
      case 'no-matches-found':
        return 'No matches found'
      case 'disconnect':
        return 'You were disconnected from the game server, try again'
      case 'error':
        return 'Some error occurred, try to load the game again :/'
    }
  },

  getDeathReason: function () {
    switch (this.props.player.death_reason) {
      case 'fall':
        return ', You fell into deep space!'
      case 'push-fall':
        return ', You were pushed into deep space'
      case 'damage':
        return ', You are too damaged!'
      case 'battery':
        return ', No juice in the battery cells'
      default:
        return ''
    }
  },

  isGameRunningAndPlayerDead: function () {
    if (!this.props.player) return false
    return !this.props.gameFinished && !this.props.player.alive
  }
})
