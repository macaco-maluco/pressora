import React from 'react'

export default React.createClass({
  propTypes: {
    action: React.PropTypes.string,
    status: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  render: function () {
    return <button onClick={this.props.onClick} className={`action-button action-button-${this.props.action} ${this.props.status}`}></button>
  }
})
