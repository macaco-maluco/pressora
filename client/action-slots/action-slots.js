import React from 'react'
import ActionButton from '../action-button/action-button'

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.array,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },

  getDefaultProps: function () {
    return { className: '' }
  },

  render: function () {
    return <ul className={`action-slots ${this.props.className}`}>
    {
      this.props.actions.map((action, index) => <li><ActionButton onClick={this.props.onClick.bind(null, action, index)} action={action.type} status={action.status}/></li>)
    }
    </ul>
  }
})
