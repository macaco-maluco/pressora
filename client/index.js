import React from 'react'
import ReactDOM from 'react-dom'

var HelloMessage = React.createClass({
  render: function () {
    return <div>Hello World</div>
  }
})

ReactDOM.render(<HelloMessage/>, document.getElementById('main'))
