import {Match, Player} from '../domain/domain'
import matchQueue from '../match-queue'

var guests = 0
var socketUrl = process.env.NODE_ENV === 'production' ? '/' : ':3000/'
var matchQueueWatchdogTime = 5 * 60 * 1000 // 5m

module.exports = function gameAction (req, res) {
  var match = findMatch(req.session.matchId)
  if (!match) matchQueue.push(match = new Match())
  req.session.matchId = match.id

  var player = createPlayer(req)
  match.addPlayer(player)

  res.json({
    socket_url: socketUrl,
    match_id: match.id,
    player_id: player.id,
    map: match.map
  })
}

function findMatch (id) {
  if (id) return matchQueue.find(match => match.id === id)
  return matchQueue
    .filter(match => match.players.length < match.map.max_players)
    .pop()
}

function createPlayer (req) {
  req.session.playerName = getPlayerName(req)

  if (req.session.playerId) {
    return new Player(req.session.playerName, req.session.playerId)
  }

  var player = new Player(req.session.playerName)
  req.session.playerId = player.id
  return player
}

function getPlayerName (req) {
  var playerName = req.query.playerName
  if (!playerName || playerName.length === 0) playerName = null
  return req.session.playerName || playerName || `Guest ${++guests}`
}

// match queue watchdog
setInterval(() => {
  var oldSize = matchQueue.length
  matchQueue
    .filter((match) => match.isExpired())
    .forEach((match) => matchQueue.splice(matchQueue.indexOf(match), 1))

  var newSize = matchQueue.length
  console.log(`match queue watchdog, garbage collected ${oldSize - newSize} matches`)
}, matchQueueWatchdogTime)
