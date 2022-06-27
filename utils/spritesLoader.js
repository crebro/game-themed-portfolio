function bulkImageLoader(count, namePrefix, nameSuffix, callback) {
  let images = []
  for (let i = 1; i <= count; i++) {
    images.push(
      loadImage(`${namePrefix}${i > 9 ? i : '0' + i}${nameSuffix}`, callback),
    )
  }
  return images
}

function loadPlayerIdleAnimationSprites() {
  return bulkImageLoader(
    4,
    'assets/player/idle/adventurer_idle_',
    '.png',
    (image) => image.resizeNN(USER_WIDTH, USER_HEIGHT),
  )
}

function loadPlayerRunRightAnimation() {
  return bulkImageLoader(
    6,
    'assets/player/run/adventurer_run_',
    '.png',
    (image) => image.resizeNN(USER_WIDTH, USER_HEIGHT),
  )
}

function loadSingleTile() {
  return loadImage('assets/tiles/block.JPG', (image) =>
    image.resizeNN(TILE_SIZE, TILE_SIZE),
  )
}

function loadSideTile() {
  return loadImage('assets/tiles/sidetile.JPG', (image) =>
    image.resizeNN(TILE_SIZE, TILE_SIZE),
  )
}

function loadJetPackImage() {
  return {
    noFlames: loadImage('assets/jetpack/jetpack.png', (image) =>
      image.resizeNN(JETPACK_WIDTH, JETPACK_HEIGHT),
    ),
    flames: loadImage('assets/jetpack/jetpack-flames.png', (image) =>
      image.resizeNN(JETPACK_WIDTH, JETPACK_HEIGHT),
    ),
  }
}
