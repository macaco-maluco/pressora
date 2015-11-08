import React from 'react'
import GameMap from './game-map/game-map'
import GameMapNode from './game-map/game-map-node'
import ActionSlots from './action-slots/action-slots'
import GameMessage from './game-message/game-message'
import Player from './player/player'
import TurnTimer from './turn-timer/turn-timer'
import './app.scss'

export default React.createClass({
  propTypes: {
    map: React.PropTypes.object,
    actions: React.PropTypes.array,
    players: React.PropTypes.array,
    availableActions: React.PropTypes.array,
    editActionSlot: React.PropTypes.func,
    selectAction: React.PropTypes.func,
    movePlayer: React.PropTypes.func,
    gameState: React.PropTypes.string,
    gameFinished: React.PropTypes.bool,
    timeToWait: React.PropTypes.number,
    timeLeft: React.PropTypes.number,
    matchId: React.PropTypes.string,
    playerId: React.PropTypes.string,
    winnerId: React.PropTypes.string
  },

  handleTouch: function (e) {
    e.preventDefault()
  },

  render: function () {
    return (
      <div className='app'
           onTouchStart={this.handleTouch}
           onTouchMove={this.handleTouch}
           onMouseMove={this.handleTouch}>

        {
          this.props.matchId &&
          <div className='match-id'>{this.props.matchId}</div>
        }

        <GameMessage gameState={this.props.gameState}
                     gameFinished={this.props.gameFinished}
                     timeToWait={this.props.timeToWait}
                     player={this.getCurrentPlayer()}
                     winnerId={this.props.winnerId}/>
        {
          this.props.map && <GameMap map={this.props.map}>
            {
              this.props.players.map((player, index) => {
                const hasPosition = typeof player.pos !== 'undefined'
                if (!hasPosition) return

                return (
                  <GameMapNode key={index} x={player.pos.x} y={player.pos.y}>
                    <Player player={player}
                            index={index}
                            isLocal={this.isLocalPlayer(player)}/>
                  </GameMapNode>
                )
              })
            }
          </GameMap>
        }

        {
          this.props.timeLeft > 0 &&
          <TurnTimer timeLeft={this.props.timeLeft}/>
        }

        {
          this.props.gameState === 'tick' &&
          <ActionSlots className='selected-actions'
                       onClick={this.props.editActionSlot}
                       actions={this.props.actions}/>
        }

        {
          this.props.actions.find(action => action.status === 'editting') &&
          <ActionSlots className='available-actions'
                       onClick={this.props.selectAction}
                       actions={this.props.availableActions}/>
        }
      </div>
    )
  },

  getCurrentPlayer: function () {
    return (this.props.players || []).find((p) => p.id === this.props.playerId)
  },

  isLocalPlayer: function (player) {
    return player && player.id === this.props.playerId
  }
})
