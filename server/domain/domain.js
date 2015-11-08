var Maps = require('../maps')
var Uuid = require('uuid')
var Directions = require('./directions')

export class Match {
  constructor () {
    this.id = Uuid.v4()
    this.map = Maps[Math.floor(Math.random()) % Maps.length]
    this.turn = 0
    this.players = []
    this.players_ready = {}
    this.created_at = Date.now()
    this.join_until = new Date(this.created_at + (30 * 1000)) // 1m
    this.latest_interaction = Date.now()
    this.maxIdleTime = 10 * 60 * 1000 // 10m
    this.status = 'waiting'
    this.turn_command_buffer = {}
  }

  isReadyToLoad () {
    return this.players.length >= this.map.min_players &&
           this.players.length <= this.map.max_players
  }

  isReadyToStart () {
    return Object.keys(this.players_ready).length === this.players.length &&
           this.status === 'waiting'
  }

  isFinished () {
    return false
  }

  isExpired () {
    return Date.now() - this.latest_interaction > this.maxIdleTime
  }

  addPlayer (player) {
    this.logInteraction()
    this.players.push(player)
  }

  acceptCommands () {
    this.logInteraction()
    this.status = 'accepting-commands'
  }

  blockCommands () {
    this.logInteraction()
    this.status = 'blocking-commands'
  }

  clearCommands () {
    this.logInteraction()
    this.players.forEach(player => this.turn_command_buffer[player.id] = new Array(5))
  }

  clearPlayersTransientState () {
    this.logInteraction()
    this.players.forEach(player => player.transient = {})
  }

  positionPlayers () {
    this.logInteraction()
    var horizontalLength = this.map.coords[0].length - 1
    var verticalLength = this.map.coords.length - 1
    var playerPositions = [{x: 0, y: 0, facing: 'S'},
                           {x: horizontalLength, y: verticalLength, facing: 'N'},
                           {x: horizontalLength, y: 0, facing: 'S'},
                           {x: 0, y: verticalLength, facing: 'N'}]
    this.players.forEach(player => player.pos = playerPositions.shift())
  }

  inputCommand (playerId, slot, command) {
    this.logInteraction()
    this.turn_command_buffer[playerId][slot] = new Command(slot, command, playerId)
  }

  isAcceptingCommands () {
    return this.status === 'accepting-commands'
  }

  executeSlotCommands (slot) {
    this.logInteraction()
    Object.keys(this.turn_command_buffer)
      .map((id) => this.turn_command_buffer[id][slot])
      .filter(command => command)
      .sort((a, b) => a.created_at - b.created_at)
      .forEach(command => this.applyCommand(command))
  }

  applyCommand (command) {
    try {
      this.logInteraction()
      var player = this.players.find(function (player) { return player.id === command.player_id })
      if (player.alive) {
        require(`../commands/${command.action}`)(this, player)
        player.transient.action = player.alive ? command.action : 'die'
      }
    } catch (e) {
      console.error(`while applying command ${command.action}: ${e.message}`)
    }
  }

  logInteraction () {
    this.latest_interaction = Date.now()
  }
}

export class Player {
  constructor (name) {
    this.id = Uuid.v4()
    this.name = name
    this.life = 3
    this.battery = 100
    this.alive = true
    this.death_reason = undefined
    this.transient = {}
  }

  die (reason) {
    console.log(`player ${this.name} died. Reason: ${reason} :(`)
    this.alive = false
    this.death_reason = reason
  }

  walk (coord) {
    console.log(`player ${this.name} moving to `, coord)
    this.pos.x = coord.x
    this.pos.y = coord.y
  }

  spinLeft () {
    console.log(`player ${this.name} spinning left`)
    this.pos.facing = Directions[this.pos.facing].left
  }

  spinRight () {
    console.log(`player ${this.name} spinning right`)
    this.pos.facing = Directions[this.pos.facing].right
  }

  consumeBattery (amount) {
    this.battery -= amount
    if (this.battery <= 0) this.die('battery')
    this.logBatteryLevel()
    return this.alive
  }

  rechargeBattery (amount) {
    this.battery = Math.min(100, this.battery + amount)
    this.logBatteryLevel()
  }

  takeHit () {
    if (!this.transient.shield) {
      this.takeDamage()
      return true
    } else {
      console.log(`player ${this.name} was protected by shield`)
      return false
    }
  }

  takeDamage () {
    console.log(`player ${this.name} took 1 damage.`)
    this.life--
    if (this.life <= 0) {
      this.die('damage')
    }
  }

  logBatteryLevel () {
    console.log(`player ${this.name} current battery level: ${this.battery}%`)
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
