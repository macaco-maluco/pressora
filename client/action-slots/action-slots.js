import React from 'react'
import ActionButton from '../action-button/action-button'

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.array,
    onClick: React.PropTypes.func
  },

  render: function () {
    return <ul className='action-slots'>
    {
      this.props.actions.map((action, index) => <li><ActionButton onClick={this.props.onClick.bind(null, index)} action={action.type} status={action.status}/></li>)
    }
    </ul>
  }
})
