import React from 'react'
import GameMap from './game-map/game-map'
import ActionSlots from './action-slots/action-slots'
import './app.scss'

export default React.createClass({
  propTypes: {
    map: React.PropTypes.object,
    actions: React.PropTypes.array
  },

  render: function () {
    return <div className='app'>
      <GameMap map={this.props.map}/>
      <ActionSlots actions={this.props.actions}/>
    </div>
  }
})
