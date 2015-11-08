import React from 'react'

export default React.createClass({
  propTypes: {
    gameState: React.PropTypes.string
  },

  render: function () {
    var message = this.getMessage()
    var visible = message ? 'visible' : 'invisible'
    return <div className={`game-message ${visible}`}>
      <div className='message'>
        <span>{message}</span>
      </div>
    </div>
  },

  getMessage: function () {
    switch (this.props.gameState) {
      case 'searching-for-game':
        return 'Searching for game'
      case 'wait-for-players':
        return 'Waiting for players'
    }
  }
})
