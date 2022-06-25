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
    if (
      (keyIsDown(INPUT_KEY_W) || keyIsDown(INPUT_KEY_SPACE)) &&
      player.onGround
    ) {
      player.velY += this.thrustPower
      this.isActive = true
    } else if (this.isActive) {
      this.isActive = false
    }
  }
}
