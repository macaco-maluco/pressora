module.exports = function(match, player) {

  var playerDestination = findDestination(match.map, player, player.pos.facing)

  console.log(`player ${player.name} trying to move from `, player.pos, playerDestination)

  if (isOutsideMap(playerDestination)) {
    player.die('fall')
  } else {
    player.battery -= 10
    console.log(`player ${player.name} current battery at ${player.battery}`)
    if (player.battery <= 0) {
      player.die('battery')
    } else {
      if (isWalkable(match.map, playerDestination.terrain_type)) {
        var enemy = findPlayer(match, playerDestination.coord)
        if (enemy) {
          var enemyDestination = findDestination(match.map, enemy, player.pos.facing)
          if (isOutsideMap(enemyDestination)) {
            enemy.die('push-fall')
          } else {
            enemy.walk(enemyDestination.coord)
          }
        }
        player.walk(playerDestination.coord)
      }
    }
  }
}

function findDestination(map, player, facingDirection) {
  var coord = findFacingCoord(player, facingDirection)
  var terrain_type = findTerrainType(map, coord)
  return {coord: coord, terrain_type: terrain_type}
}

function findFacingCoord(player, facingDirection) {
  switch (facingDirection) {
    case 'N':
      return {x: player.pos.x, y: player.pos.y - 1}
    case 'E':
      return {x: player.pos.x + 1, y: player.pos.y}
    case 'S':
      return {x: player.pos.x, y: player.pos.y + 1}
    case 'W':
      return {x: player.pos.x - 1, y: player.pos.y}
  }
}

function findTerrainType(map, coord) {
  var x = map.coords[coord.x]
  return x ? x[coord.y] : undefined
}

function findPlayer(match, coord) {
  return match.players.find(p => p.pos.x === coord.x && p.pos.y === coord.y)
}

function isOutsideMap(destination) {
  return !destination.terrain_type
}

function isWalkable(map, terrain_type) {
  return map.terrain_types.walk.indexOf(terrain_type) !== -1
}
