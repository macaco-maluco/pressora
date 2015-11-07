import React from 'react'
import ActionButton from '../action-button/action-button'

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.array
  },

  render: function () {
    return <ul className='action-slots'>
    {
      this.props.actions.map(action => <li><ActionButton action={action}/></li>)
    }
    </ul>
  }
})
