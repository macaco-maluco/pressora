import React from 'react'

export default React.createClass({
  propTypes: {
    timeLeft: React.PropTypes.number
  },

  render: function () {
    return <div className='turn-timer'>{this.props.timeLeft}</div>
  }
})
