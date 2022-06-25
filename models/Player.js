class Player {
  constructor(x, y, g, idleAnimation, runAnimation) {
    this.x = x
    this.y = y
    this.g = g
    this.idleAnimation = idleAnimation
    this.runAnimation = runAnimation
    this.animationIndex = 0
    this.animationCount = {
      idle: this.idleAnimation.length,
      run: this.runAnimation.length,
    }
    this.animationState = 'idle'
    // variable used to slow down the animation
    this.animationCounter = 0
    this.velY = 0
    this.height = 100
    this.width = 100
    this.jumpForce = 30
    this.onGround = false
    this.jumping = false
  }

  draw() {
    this.handleAnimation()
  }

  handleAnimation() {
    if (this.animationIndex >= this.animationCount[this.animationState]) {
      this.animationIndex = 0
    }

    if (keyIsDown(INPUT_KEY_D) && this.x < width - this.width) {
      this.x += 10
      image(this.runAnimation[this.animationIndex], this.x, this.y)
    } else if (keyIsDown(INPUT_KEY_A) && this.x > 0) {
      this.x -= 10
      push()
      scale(-1, 1)
      image(
        this.runAnimation[this.animationIndex],
        -this.x - this.runAnimation[0].width,
        this.y,
      )
      pop()
    } else {
      image(this.idleAnimation[this.animationIndex], this.x, this.y)
    }

    if (
      keyIsPressed &&
      (keyIsDown(INPUT_KEY_W) || keyIsDown(INPUT_KEY_SPACE)) &&
      this.onGround
    ) {
      this.velY = -this.jumpForce
      this.onGround = false
      this.jumping = true
    }
    if (this.animationCounter > 10) {
      this.animationIndex += 1
      this.animationCounter = 0
    }
    this.animationCounter += 1
  }

  handleGravity() {
    this.y += this.velY

    if (!this.onGround) {
      this.velY += this.g
    }
  }
}
