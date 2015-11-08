import {Match, Player} from '../domain/domain'
import matchQueue from '../match-queue'

var guests = 0
var socketUrl = process.env.NODE_ENV === 'production' ? '/' : ':3000/'
var matchQueueWatchdogTime = 5 * 60 * 1000 // 5m

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

setInterval(() => {
  var oldSize = matchQueue.length
  matchQueue
    .filter((match) => match.isExpired())
    .forEach((match) => matchQueue.splice(matchQueue.indexOf(match), 1))

  var newSize = matchQueue.length
  console.log(`match queue watchdog, garbage collected ${oldSize - newSize} matches`)
}, matchQueueWatchdogTime)
