class Jetpack {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = jetpackImages.noFlames.width
    this.height = jetpackImages.noFlames.height
    this.manipulates = 'jumpingLogic'
    this.thrustPower = -2
    this.isActive = false
  }

  draw(player) {
    image(
      this.isActive ? jetpackImages.flames : jetpackImages.noFlames,
      !!player ? player.x : this.x,
      !!player ? player.y : this.y,
    )
  }

  handleUsage(player) {
    textSize(30)
    fill(255)
    text(
      `Altitude: ${int(height - player.y)} `,
      currentTranslation[0] + 10,
      -currentTranslation[1] + 40,
    )

    if (keyIsDown(INPUT_KEY_W) || keyIsDown(INPUT_KEY_SPACE)) {
      player.velY += this.thrustPower
      this.isActive = true
    } else if (this.isActive) {
      this.isActive = false
    }
  }
}
