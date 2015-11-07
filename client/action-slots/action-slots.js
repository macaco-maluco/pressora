import React from 'react'

export default React.createClass({
  render: function () {
    return <ul className='action-slots'>
      <li><button className='action-up past'></button></li>
      <li><button className='action-down past'></button></li>
      <li><button className='action-left current'></button></li>
      <li><button className='action-right active'></button></li>
      <li><button className='action-beam'></button></li>
      <li><button className='action-blast'></button></li>
      <li><button className='action-empty'></button></li>
    </ul>
  }
})
