import React from 'react'

export default React.createClass({
  propTypes: {
    gameState: React.PropTypes.string,
    timeToWait: React.PropTypes.number
  },

  render: function () {
    var message = this.getMessage()
    var visible = message ? 'visible' : 'invisible'
    return <div className={`game-message ${visible}`}>
      <div className={`message ${this.props.gameState}`}>
        <span className={this.props.gameState}>{message}</span>
      </div>
    </div>
  },

  getMessage: function () {
    switch (this.props.gameState) {
      case 'searching-for-game':
        return 'Searching for game'
      case 'wait-for-players':
        return 'Waiting for players'
      case 'turn-starts-in':
        return `Turn starts in ${this.props.timeToWait} seconds`
      case 'no-matches-found':
        return 'No matches found'
      case 'error':
        return 'Some error occurred, try to load the game again :/'
      case 'disconnect':
        return 'You were disconnected from the game server, try again'
    }
  }
})
