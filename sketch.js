let playerIdleAnimation
let playerRunAnimation
let singleTileImage
let jetpackImages
let sideTile

let player
let platforms = []
let jetpack

let dpComicFont

let collectables = []
let currentTranslation = [0, 0]

function preload() {
  playerIdleAnimation = loadPlayerIdleAnimationSprites()
  playerRunAnimation = loadPlayerRunRightAnimation()
  singleTileImage = loadSingleTile()
  sideTile = loadSideTile()

  dpComicFont = loadFont('assets/fonts/dpcomic.ttf')
  jetpackImages = loadJetPackImage()
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  player = new Player(200, 200, 1, playerIdleAnimation, playerRunAnimation)
  platforms = [
    new Platform(
      0,
      height - singleTileImage.height,
      int(width / singleTileImage.width) * 2,
    ),
    new Platform(
      width / 2,
      height - singleTileImage.height * 4,
      int(width / singleTileImage.width) * 2,
    ),
  ]
  collectables.push(
    new Jetpack(platforms[1].x, platforms[1].y - jetpackImages.noFlames.height),
  )
}

function drawTextDetails() {
  textFont(dpComicFont)
  push()
  fill(255)

  textSize(100)
  text('Kreation Duwal', 200, 200)
  textSize(50)
  text('An Interactive Portfolio', 200, 200 + 50)

  text(
    'W or <space>, A, D to move',
    platforms[1].x,
    platforms[1].y + platforms[1].height + 100,
  )

  pop()
}

function draw() {
  pixelDensity(1)

  if (player.jumpingManipulationExists && player.y < 200) {
    translate(0, -player.y + 200)
    currentTranslation = [0, -player.y + 200]
  }

  background(50, 143, 168)

  drawTextDetails()

  for (let collectable of collectables) {
    collectable.draw()
    if (
      collisionDetection(
        collectable.x,
        collectable.y,
        collectable.width,
        collectable.height,
        player.x,
        player.y,
        player.width,
        player.height,
      )
    ) {
      player.handleEquipmentCollect(collectable)
      collectables.splice(collectables.indexOf(collectable), 1)
    }
  }

  player.draw()
  player.handleGravity()
  for (let platform of platforms) {
    platform.draw()
    platform.handlePlayer(player)
  }
}

function keyReleased() {
  if ([INPUT_KEY_D, INPUT_KEY_A, INPUT_KEY_W].includes(keyCode)) {
    player.animationState = 'idle'
    player.animationIndex = 0
  }
}
