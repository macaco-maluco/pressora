export default {
  map: {
    'name': 'map1',
    'coords': [
      [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
      [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
      [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
      [14, 14, 14, 1, 14, 14, 1, 14, 14, 14],
      [14, 14, 14, 2, 14, 14, 1, 14, 14, 14],
      [14, 14, 14, 1, 14, 14, 1, 14, 14, 14],
      [14, 14, 14, 1, 14, 14, 2, 14, 14, 14],
      [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
      [14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
      [14, 14, 14, 14, 14, 14, 14, 14, 14, 14]
    ],
    'terrain_types': {
      'walk': [14],
      'wall': [1]
    },
    'max_players': 4
  },

  players: [
    { pos: { x: 1, y: 1, facing: 'N' }, status: 'blasting' },
    { pos: { x: 2, y: 6, facing: 'N' }, status: 'stopped' },
    { pos: { x: 4, y: 3, facing: 'S' }, status: 'stopped' }
  ],

  actions: [
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' }
  ],

  availableActions: [
    { type: 'up' },
    { type: 'down' },
    { type: 'left' },
    { type: 'right' },
    { type: 'beam' },
    { type: 'blast' },
    { type: 'shield' }
  ]
}
