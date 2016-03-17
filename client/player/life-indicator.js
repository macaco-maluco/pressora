import React from 'react'

export default React.createClass({
  propTypes: {
    life: React.PropTypes.number
  },

  render: function () {
    return <div className='life-indicator'>
    {renderIndicators(this.props.life)}
    </div>
  }
})

function renderIndicators (life) {
  const indicators = []

  for (var i = 0; i < life; i++) {
    indicators.push(<div className='life-indicator-unit'/>)
  }

  return indicators
}
