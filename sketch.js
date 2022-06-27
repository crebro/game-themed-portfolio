let playerIdleAnimation
let playerRunAnimation
let singleTileImage
let jetpackImages
let sideTile
let projectsData

let player
let platforms = []
let jetpack

let dpComicFont

let drawableCallbacks = []

let collectables = []
let currentTranslation = [0, 0]

let drawableData = []

function preload() {
  playerIdleAnimation = loadPlayerIdleAnimationSprites()
  playerRunAnimation = loadPlayerRunRightAnimation()
  singleTileImage = loadSingleTile()
  sideTile = loadSideTile()

  dpComicFont = loadFont('assets/fonts/dpcomic.ttf')
  jetpackImages = loadJetPackImage()

  fetch('/data/projects.json')
    .then((response) => response.json())
    .then(
      (data) =>
        (projectsData = data.map((data) => {
          return {
            ...data,
            image: loadImage(data.image, (image) => image.resize(250, 250)),
          }
        })),
    )
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

  let position = -projectsSpacing
  for (let i = 0; i < projectsData.length; i++) {
    //                                    // 6 refers to the number of blocks
    let xPos = 0
    platforms.push(new Platform(xPos, position, 8))
    position -= projectsSpacing

    let imageXPos = 20
    let textXPos = imageXPos + projectsData[i].image.width + 20
    let imageYPos =
      -projectsSpacing -
      (projectsSpacing * i + projectsData[i].image.height + 20)
    drawableData.push({
      image: {
        x: imageXPos,
        y: imageYPos,
        imageData: projectsData[i].image,
      },
      title: {
        x: textXPos,
        y: imageYPos + projectsData[i].image.height / 2,
        data: projectsData[i].name,
      },
      description: {
        x: textXPos,
        y: imageYPos + projectsData[i].image.height / 2 + 50,
        data: projectsData[i].description,
      },
    })
  }
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

  for (let platform of platforms) {
    platform.draw()
    platform.handlePlayer(player)
  }

  for (let drawableDataElement of drawableData) {
    image(
      drawableDataElement.image.imageData,
      drawableDataElement.image.x,
      drawableDataElement.image.y,
    )
    textSize(40)
    text(
      drawableDataElement.title.data,
      drawableDataElement.title.x,
      drawableDataElement.title.y,
    )
    textSize(30)
    text(
      drawableDataElement.description.data,
      drawableDataElement.description.x,
      drawableDataElement.description.y,
    )
  }

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
}

function keyReleased() {
  if ([INPUT_KEY_D, INPUT_KEY_A, INPUT_KEY_W].includes(keyCode)) {
    player.animationState = 'idle'
    player.animationIndex = 0
  }
}
