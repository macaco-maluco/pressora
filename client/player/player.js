import React from 'react'
import BatteryIndicator from './battery-indicator'
import LifeIndicator from './life-indicator'

export default React.createClass({
  propTypes: {
    player: React.PropTypes.object,
    index: React.PropTypes.number
  },

  render: function () {
    return <div className={`player player-${this.props.index + 1} player-${this.props.player.status} player-facing-${this.props.player.pos.facing}`}>
      <div className='player-body'/>
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

      <BatteryIndicator battery={this.props.player.battery}/>
      <LifeIndicator life={this.props.player.life}/>
    </div>
  }
})
