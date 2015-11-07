import React from 'react'

export default React.createClass({
  propTypes: {
    map: React.PropTypes.object,
    children: React.PropTypes.node
  },

  render: function () {
    const coords = this.props.map.coords
    const cellWidth = 100 / coords.length
    const style = { width: `${cellWidth}%`, height: `${cellWidth}%` }

    return <div className='game-map'>
      <table>
        <tbody>
        {
          coords.map((row, rowIndex) => {
            return <tr key={rowIndex}>
            {
              row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className={`cell-${cell}`} style={style}></td>)
            }
            </tr>
          })
        }
        </tbody>
      </table>
      {
        React.Children.map(this.props.children, child => {
          const left = `${child.props.x * cellWidth}%`
          const top = `${child.props.y * cellWidth}%`
          const width = `${cellWidth}%`
          const height = `${cellWidth}%`

          return <div className='game-map-node' style={{ left, top, width, height }}>
            {child}
          </div>
        })
      }
    </div>
  }
})
