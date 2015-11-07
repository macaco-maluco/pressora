var Uuid = require('uuid')
var Maps = require('../maps')

class Match {
  constructor () {
    this.id = Uuid.v4()
    this.map = Maps[Math.floor(Math.random()) % Maps.length]
    this.players = []
    this.created_at = Date.now()
    this.latest_interaction = Date.now()
  }
}

class Player {
  constructor (name) {
    this.id = Uuid.v4()
    this.name = name
  }
}

var matchQueue = []
var guests = 0

module.exports = function gameAction (req, res) {
  var matchToJoin = matchQueue.filter(match => { match.players.length < match.map.max_players }).pop()
  if (!matchToJoin) matchQueue.push(matchToJoin = new Match())

  var player = new Player(`Guest ${++guests}`)
  matchToJoin.players.push(player)
  req.session.playerId = player.id

  res.json({
    match_id: matchToJoin.id,
    map: matchToJoin.map
  })
}
