const commons = {
  findDestination (map, playerPosition, facingDirection) {
    var coord = commons.findFacingCoord(playerPosition, facingDirection)
    var terrain_type = comons.findTerrainType(map, coord)
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
    var x = map.coords[coord.x]
    return x ? x[coord.y] : undefined
  },

  isOutsideMap (destination) {
    return !destination.terrain_type
  },

  isWalkable (map, terrain_type) {
    return map.terrain_types.walk.indexOf(terrain_type) !== -1
  }
}

export default commons
