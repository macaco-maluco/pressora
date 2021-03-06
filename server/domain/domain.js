var Maps = require('../maps')
var Uuid = require('uuid')
var Directions = require('./directions')

const WAITING = 'waiting'
const FINISHED = 'finished'
const ACCEPTING_COMMANDS = 'accepting-commands'
const BLOCKING_COMMANDS = 'blocking-commands'

export class Match {

  constructor () {
    this.id = Uuid.v4()
    this.map = Maps[Math.floor(parseInt(Math.random() * 100, 10) % Maps.length)]
    this.turn = 0
    this.players = []
    this.players_ready = {}
    this.created_at = Date.now()
    this.latest_interaction = Date.now()
    this.maxIdleTime = 5 * 60 * 1000 // 5m
    this.status = WAITING
    this.turn_command_buffer = {}
    this.max_turns = 15
  }

  isReadyToLoad () {
    return this.players.length >= this.map.min_players &&
           this.players.length <= this.map.max_players
  }

  isFull () {
    return this.players.length === this.map.max_players
  }

  isReadyToStart () {
    return Object.keys(this.players_ready).length === this.players.length &&
           this.status === WAITING
  }

  incTurn () {
    if (++this.turn > this.max_turns) this.status = FINISHED
  }

  checkEndGame () {
    var players_alive = this.players.filter(player => player.alive)
    if (players_alive.length <= 1) {
      this.status = FINISHED
      this.winner = players_alive.pop()
      return true
    }
    return false
  }

  isFinished () {
    return this.status === FINISHED
  }

  isExpired () {
    return Date.now() - this.latest_interaction > this.maxIdleTime ||
           this.isFinished()
  }

  addPlayer (player) {
    if ((!this.players || this.players.length === 0) && !this.join_until) {
      this.join_until = Date.now() + (30 * 1000) // 30s
    }
    if (!this.players.find(p => p.id === player.id)) {
      this.logInteraction()
      this.players.push(player)
    }
  }

  acceptCommands () {
    this.logInteraction()
    if (this.status !== FINISHED) this.status = ACCEPTING_COMMANDS
  }

  blockCommands () {
    this.logInteraction()
    if (this.status !== FINISHED) this.status = BLOCKING_COMMANDS
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
    if (this.status !== WAITING) return

    this.logInteraction()
    var horizontalLength = this.map.coords[0].length - 2
    var verticalLength = this.map.coords.length - 2
    var playerPositions = [
      {x: 1, y: 1, facing: 'S'},
      {x: horizontalLength, y: verticalLength, facing: 'N'},
      {x: horizontalLength, y: 1, facing: 'S'},
      {x: 1, y: verticalLength, facing: 'N'}
    ]
    this.players.forEach(player => player.pos = playerPositions.shift())
  }

  inputCommand (playerId, slot, command) {
    this.logInteraction()
    this.turn_command_buffer[playerId][slot] = new Command(slot, command, playerId)
  }

  isAcceptingCommands () {
    return this.status === ACCEPTING_COMMANDS
  }

  executeSlotCommands (slot) {
    this.logInteraction()
    console.log(`[${this.id}] executing commands of slot ${slot}`)
    Object.keys(this.turn_command_buffer)
      .map(playerId => this.turn_command_buffer[playerId][slot])
      .filter(command => !!command)
      .sort((a, b) => a.created_at - b.created_at)
      .forEach(command => this.applyCommand(command))
  }

  applyCommand (command) {
    try {
      this.logInteraction()
      var player = this.players.find(p => p.id === command.player_id)
      if (player.alive) {
        require(`../commands/${command.action}`)(this, player)
        player.transient.action = player.alive ? command.action : 'die'
      } else {
        console.log(`player ${player.name} dead, skipping command ${command.action}`)
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
  constructor (name, id = Uuid.v4()) {
    this.id = id
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
    this.transient.action = 'die'
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
    console.log(`player ${this.name} took 1 damage`)
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
