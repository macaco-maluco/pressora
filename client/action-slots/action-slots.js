import React from 'react'
import ActionButton from '../action-button/action-button'

export default React.createClass({
  render: function () {
    return <ul className='action-slots'>
      <li><ActionButton action='up past' status='past'/></li>
      <li><ActionButton action='down past' status='past'/></li>
      <li><ActionButton action='left current' status='current'/></li>
      <li><ActionButton action='right active' status='active'/></li>
      <li><ActionButton action='beam'/></li>
      <li><ActionButton action='blast'/></li>
      <li><ActionButton action='empty'/></li>
    </ul>
  }
})
