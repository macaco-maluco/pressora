export default {
  map: null,
  players: [],
  gameState: 'searching-for-game',
  timeToWait: null,

  actions: [
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' }
  ],

  availableActions: [
    { type: 'forward' },
    { type: 'backward' },
    { type: 'spin-left' },
    { type: 'spin-right' },
    { type: 'beam' },
    { type: 'blast' },
    { type: 'shield' },
    { type: 'recharge' }
  ]
}
