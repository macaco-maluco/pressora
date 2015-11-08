export default {
  map: null,
  players: [],
  gameState: 'searching-for-game',
  gameFinished: false,
  timeToWait: null,
  timeLeft: 0,
  matchId: null,
  playerId: null,
  winnerId: null,

  actions: [
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
