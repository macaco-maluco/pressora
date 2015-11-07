var Uuid = require('uuid')
var Maps = require('../maps')

class Match {
  constructor () {
    this.id = Uuid.v4()
    this.map = Maps[Math.floor(Math.random()) % Maps.length]
    this.players = []
    this.players_ready = {}
    this.created_at = Date.now()
    this.latest_interaction = Date.now()
    this.status = 'waiting'
    this.turn_command_buffer = {}
  }

  isReadyToLoad () {
    return this.players.length === this.map.max_players
  }

  isReadyToStart () {
    return Object.keys(this.players_ready).length === this.players.length && this.status === 'waiting'
  }

  addPlayer (player) {
    this.players.push(player)
  }

  start () {
    this.status = 'accepting-commands'
    this.players.forEach(player => this.turn_command_buffer[player.id] = new Array(5))
  }

  inputCommand (playerId, slot, command) {
    this.turn_command_buffer[playerId][slot] = new Command(slot, command)
  }

  isAcceptingCommands () {
    return this.status === 'accepting-commands'
  }
}

class Player {
  constructor (name) {
    this.id = Uuid.v4()
    this.name = name
  }
}

class Command {
  constructor (slot, action) {
    this.slot = slot
    this.action = action
    this.created_at = Date.now()
  }
}

var matchQueue = require('../match-queue')
var guests = 0

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
    map: match.map
  })
}

function findMatch(id) {
  if (id) {
    return matchQueue.find(match => match.id === id)
  }
  return matchQueue.filter(match => match.players.length < match.map.max_players).pop()
}
