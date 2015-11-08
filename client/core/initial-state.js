export default {
  map: null,
  players: [],
  gameState: 'searching-for-game',
  timeToWait: null,
  timeLeft: 0,

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
