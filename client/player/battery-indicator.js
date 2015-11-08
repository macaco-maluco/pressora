import React from 'react'

export default React.createClass({
  propTypes: {
    battery: React.PropTypes.number
  },

  render: function () {
    return <div className='battery-indicator'>
      <div className='battery-indicator-bar' style={{ width: `${this.props.battery}%` }}/>
    </div>
  }
})
