import React from 'react'

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  render: function () {
    return this.props.children
  }
})
