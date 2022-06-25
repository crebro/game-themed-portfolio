let playerIdleAnimation
let playerRunAnimation
let singleTileImage
let sideTile
let player
let basePlatform
let platforms = []

let robusFont

function preload() {
  playerIdleAnimation = loadPlayerIdleAnimationSprites()
  playerRunAnimation = loadPlayerRunRightAnimation()
  singleTileImage = loadSingleTile()
  sideTile = loadSideTile()

  robusFont = loadFont('assets/fonts/Robus.otf')
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
}

function drawTextDetails() {
  push()
  fill(255)

  textFont(robusFont)
  textSize(100)
  text('Kreation Duwal', 200, 200)
  textSize(50)
  text('An Interactive Portfolio', 200, 200 + 50)

  pop()
}

function draw() {
  background(50, 143, 168)

  drawTextDetails()

  player.draw()
  player.handleGravity(platforms)
}

function keyReleased() {
  if ([INPUT_KEY_D, INPUT_KEY_A, INPUT_KEY_W].includes(keyCode)) {
    player.animationState = 'idle'
    player.animationIndex = 0
  }
}
