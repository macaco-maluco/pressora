var matchQueue = require('../match-queue')

module.exports = function readMatchQueue (req, res) {
  res.json({
    matches: matchQueue.map(function (match) {
      return {
        id: match.id,
        status: match.status,
        turn: match.turn,
        expired: match.isExpired(),
        players: match.players
      }
    })
  })
}
