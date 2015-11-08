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
    const transient = this.props.player.transient
    const beamSize = (transient &&
                     transient.beam &&
                     transient.beam.path &&
                     transient.beam.path.length || 0) * 100

    return <div className={this.className()}>
      <div className='player-body'>
        <div className='flames'/>
        <div className='beam'>
          <div className='light' style={{ height: `${beamSize}%` }}/>
          <div className='light' style={{ height: `${beamSize}%` }}/>
          <div className='light' style={{ height: `${beamSize}%` }}/>
          <div className='light' style={{ height: `${beamSize}%` }}/>
          <div className='light' style={{ height: `${beamSize}%` }}/>
          <div className='light' style={{ height: `${beamSize}%` }}/>
        </div>
        <div className='blast'>
          <div className='particle'/>
          <div className='particle'/>
          <div className='particle'/>
        </div>
      </div>
      <div className='recharge'/>
      <div className='shield'/>
      <span className='name'>{this.props.player.name}</span>
      <BatteryIndicator battery={this.props.player.battery}/>
      <LifeIndicator life={this.props.player.life}/>
    </div>
  },

  className: function () {
    const localPlayer = this.props.isLocal ? 'player-local' : ''
    let status = this.props.player.status ? `player-${this.props.player.status}` : ''
    if (!this.props.player.alive) status = 'player-dying'
    return `player ${localPlayer} player-${this.props.index + 1} ${status} player-facing-${this.props.player.pos.facing}`
  }
})
