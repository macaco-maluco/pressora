import {Match, Player} from '../domain/domain'
import matchQueue from '../match-queue'

var guests = 0
var socketUrl = process.env.NODE_ENV === 'production' ? '/' : ':3000/'

module.exports = function gameAction (req, res) {
  var match = findMatch(req.session.matchId)
  if (!match) matchQueue.push(match = new Match())

  if (!req.session.playerId) {
    var player = new Player(`Guest ${++guests}`)
    match.addPlayer(player)
    req.session.playerId = player.id
    req.session.matchId = match.id
  }
  res.json({
    map: match.map,
    socket_url: socketUrl
  })
}

function findMatch (id) {
  if (id) return matchQueue.find(match => match.id === id)
  return matchQueue
    .filter(match => match.players.length < match.map.max_players)
    .pop()
}
