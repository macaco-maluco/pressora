import React from 'react'

export default React.createClass({
  propTypes: {
    player: React.PropTypes.object
  },

  render: function () {
    return <div className={`player player-1 player-${this.props.player.status} player-facing-${this.props.player.facing}`}>
      <div className='flames'/>
    </div>
  }
})
