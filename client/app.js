import React from 'react'
import GameMap from './game-map/game-map'
import './app.scss'

// static map for the moment
const map = {
  'name': 'map1',
  'coords': [
    [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    [14, 14, 14, 1, 14, 14, 1, 14, 14, 14],
    [14, 14, 14, 1, 14, 14, 1, 14, 14, 14],
    [14, 14, 14, 1, 14, 14, 1, 14, 14, 14],
    [14, 14, 14, 1, 14, 14, 1, 14, 14, 14],
    [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14, 14, 14, 14, 14]
  ],
  'terrain_types': {
    'walk': [14],
    'wall': [1]
  },
  'max_players': 4
}

export default React.createClass({
  render: function () {
    return <div className='app'>
      <GameMap map={map}/>
    </div>
  }
})
