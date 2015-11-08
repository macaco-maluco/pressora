import React from 'react'
import BatteryIndicator from './battery-indicator'
import LifeIndicator from './life-indicator'

export default React.createClass({
  propTypes: {
    player: React.PropTypes.object,
    index: React.PropTypes.number,
    isLocal: React.PropTypes.bool
  },

  render: function () {
    return <div className={this.className()}>
      <div className='player-body'>
        <div className='flames'/>
        <div className='beam'>
          <div className='light'/>
          <div className='light'/>
          <div className='light'/>
          <div className='light'/>
          <div className='light'/>
          <div className='light'/>
        </div>
        <div className='blast'>
          <div className='particle'/>
          <div className='particle'/>
          <div className='particle'/>
        </div>
      </div>
      <div className="recharge"/>
      <div className="shild"/>

      <BatteryIndicator battery={this.props.player.battery}/>
      <LifeIndicator life={this.props.player.life}/>
    </div>
  },

  className: function () {
    const localPlayer = this.props.isLocal ? 'player-local' : ''
    const status = this.props.player.status ? `player-${this.props.player.status}` : ''
    return `player ${localPlayer} player-${this.props.index + 1} ${status} player-facing-${this.props.player.pos.facing}`
  }
})
