const commons = {
  findDestination (map, playerPosition, facingDirection) {
    var coord = commons.findFacingCoord(playerPosition, facingDirection)
    var terrain_type = commons.findTerrainType(map, coord)
    return {coord: coord, terrain_type: terrain_type}
  },

  findFacingCoord (position, facingDirection) {
    switch (facingDirection) {
      case 'N':
        return {x: position.x, y: position.y - 1}
      case 'E':
        return {x: position.x + 1, y: position.y}
      case 'S':
        return {x: position.x, y: position.y + 1}
      case 'W':
        return {x: position.x - 1, y: position.y}
    }
  },

  findTerrainType (map, coord) {
    var y = map.coords[coord.y]
    return y ? y[coord.x] : undefined
  },

  isOutsideMap (destination) {
    return !destination.terrain_type
  },

  isWalkable (map, terrain_type) {
    return map.terrain_types.walk.indexOf(terrain_type) !== -1
  },

  isWall (map, terrain_type) {
    return map.terrain_types.wall.indexOf(terrain_type) !== -1
  },

  findPlayer (match, coord) {
    return match.players.find(player => player.pos.x === coord.x && player.pos.y === coord.y)
  },

  findSurroundings (position) {
    return [
      {x: position.x, y: position.y - 1},
      {x: position.x + 1, y: position.y - 1},
      {x: position.x + 1, y: position.y},
      {x: position.x + 1, y: position.y + 1},
      {x: position.x, y: position.y + 1},
      {x: position.x - 1, y: position.y + 1},
      {x: position.x - 1, y: position.y},
      {x: position.x - 1, y: position.y - 1}
    ]
  }
}

export default commons
