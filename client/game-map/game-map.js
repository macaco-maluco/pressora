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
    {
      coords.map(row => {
        return <tr>
        {
          row.map(cell => <td className={`cell-${cell}`} style={style}></td>)
        }
        </tr>
      })
    }

    </table>
  }
})
