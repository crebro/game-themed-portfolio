let playerIdleAnimation
let playerRunAnimation
let singleTileImage
let jetpackImages
let sideTile
let projectsData

let profileImage

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
            image: loadImage(data.image, (image) =>
              image.resize(250 * ELEMENTS_SCALE, 250 * ELEMENTS_SCALE),
            ),
          }
        })),
    )

  profileImage = loadImage(
    'https://avatars.githubusercontent.com/crebro',
    (image) => image.resize(250, 250),
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

  let introductionPlatform = new Platform(
    width / 2 - width / 2 / 2,
    -projectsSpacing / 2,
    int(width / TILE_SIZE / 2),
  )

  platforms.push(introductionPlatform)
  let imageXPos = introductionPlatform.x + 20
  let textXPos = imageXPos + profileImage.width + 20
  let imageYPos = introductionPlatform.y - profileImage.height - 20
  drawableData.push({
    image: {
      x: imageXPos,
      y: imageYPos,
      imageData: profileImage,
    },
    title: {
      x: textXPos,
      y: imageYPos + profileImage.height / 2,
      data: 'Kreation Duwal',
    },
    description: {
      x: textXPos,
      y: imageYPos + profileImage.height / 2 + 50,
      data:
        'A 10th grader and a full stack developer.\nLearning new technologiegs and building jawbreaking projects.\n( maths, p5.js, game-dev, web-dev,  )',
    },
  })

  let position = -projectsSpacing * 1.5
  for (let i = 0; i < projectsData.length; i++) {
    console.log(width - int(width / TILE_SIZE / 2))
    let xPos = i % 2 === 0 ? 0 : width - int(width / TILE_SIZE / 2) * TILE_SIZE
    platforms.push(new Platform(xPos, position, int(width / TILE_SIZE / 2)))

    let imageXPos = xPos + 20
    let textXPos = imageXPos + projectsData[i].image.width + 20
    let imageYPos = position - projectsData[i].image.height - 20

    // -projectsSpacing -
    // (projectsSpacing * i + projectsData[i].image.height + 20)
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
    position -= projectsSpacing
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
    textSize(50)
    text(
      drawableDataElement.title.data,
      drawableDataElement.title.x,
      drawableDataElement.title.y,
    )
    textSize(25)
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
