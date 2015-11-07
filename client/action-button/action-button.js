import React from 'react'

export default React.createClass({
  propTypes: {
    action: React.PropTypes.string,
    status: React.PropTypes.string
  },

  render: function () {
    return <button className={`action-button action-button-${this.props.action} ${this.props.status}`}></button>
  }
})
