import React from 'react'

export default React.createClass({
  propTypes: {
    map: React.PropTypes.object
  },

  render: function () {
    const coords = this.props.map.coords
    const cellWidth = 100 / coords.length
    const style = { width: `${cellWidth}%`, height: `${cellWidth}%` }

    return <table className='game-map'>
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
  }
})
