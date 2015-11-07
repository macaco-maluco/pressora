import React from 'react'

export default React.createClass({
  render: function () {
    return <ul className='action-slots'>
      <li><button className='action-up'></button></li>
      <li><button className='action-down'></button></li>
      <li><button className='action-left'></button></li>
      <li><button className='action-right'></button></li>
      <li><button className='action-beam'></button></li>
      <li><button className='action-blast'></button></li>
      <li><button className='action-shield'></button></li>
    </ul>
  }
})
