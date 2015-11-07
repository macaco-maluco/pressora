import React from 'react'
import GameMap from './game-map/game-map'
import GameMapNode from './game-map/game-map-node'
import ActionSlots from './action-slots/action-slots'
import Player from './player/player'
import './app.scss'

export default React.createClass({
  propTypes: {
    map: React.PropTypes.object,
    actions: React.PropTypes.array,
    availableActions: React.PropTypes.array,
    editActionSlot: React.PropTypes.func,
    selectAction: React.PropTypes.func
  },

  render: function () {
    return <div className='app'>
      <GameMap map={this.props.map}>
        <GameMapNode x={5} y={3}>
          <Player />
        </GameMapNode>
      </GameMap>

      <ActionSlots className='selected-actions' onClick={this.props.editActionSlot} actions={this.props.actions}/>

      {
        this.props.actions.find(action => action.status === 'editting') &&
        <ActionSlots className='available-actions' onClick={this.props.selectAction} actions={this.props.availableActions}/>
      }
    </div>
  }
})
