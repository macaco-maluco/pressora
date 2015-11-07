var Maps = require('../maps')
var Uuid = require('uuid')
var Directions = require('./directions')

export class Match {
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
    return Object.keys(this.players_ready).length === this.map.max_players && this.status === 'waiting'
  }

  addPlayer (player) {
    this.players.push(player)
  }

  start () {
    this.status = 'accepting-commands'
    this.players.forEach(player => this.turn_command_buffer[player.id] = new Array(5))
  }

  positionPlayers () {
    var horizontalLength = this.map.coords[0].length - 1
    var verticalLength = this.map.coords.length - 1
    var playerPositions = [{x: 0, y: 0, facing: 'S'},
                           {x: horizontalLength, y: 0, facing: 'S'},
                           {x: horizontalLength, y: verticalLength, facing: 'N'},
                           {x: 0, y: verticalLength, facing: 'N'}]
    this.players.forEach(player => player.pos = playerPositions.shift())
  }

  inputCommand (playerId, slot, command) {
    this.turn_command_buffer[playerId][slot] = new Command(slot, command, playerId)
  }

  isAcceptingCommands () {
    return this.status === 'accepting-commands'
  }

  executeSlotCommands (slot) {
    Object.keys(this.turn_command_buffer)
      .map((id) => this.turn_command_buffer[id][slot])
      .filter(command => command)
      .sort((a, b) => a.created_at - b.created_at)
      .forEach(command => this.applyCommand(command))
  }

  applyCommand (command) {
    try {
      console.log(`applying command ${command.action}`)
      var player = this.players.find(function(player) { return player.id === command.player_id })
      if (player.alive) {
        require(`../commands/${command.action}`)(this, player)
      }
    } catch(e) {
      console.error(`while applying command: ${e.message}`)
    }
  }
}

export class Player {
  constructor (name) {
    this.id = Uuid.v4()
    this.name = name
    this.life = 3
    this.battery = 100
    this.alive = true
  }

  die (reason) {
    console.log(`player ${this.name} died. Reason: ${reason} :(`)
    this.alive = false
    if (!this.death_reason) this.death_reason = reason
  }

  walk (coord) {
    console.log(`player ${this.name} moving to `, coord)
    this.pos.x = coord.x
    this.pos.y = coord.y
  }

  spinLeft () {
    this.pos.facing = Directions[this.pos.facing].left
  }

  spinRight () {
    this.pos.facing = Directions[this.pos.facing].right
  }
}

export class Command {
  constructor (slot, action, player_id) {
    this.slot = slot
    this.action = action
    this.player_id = player_id
    this.created_at = Date.now()
  }
}