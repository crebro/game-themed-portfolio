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

    if (keyIsDown(INPUT_KEY_D)) {
      this.x += 10
      image(this.runAnimation[this.animationIndex], this.x, this.y)
    } else if (keyIsDown(INPUT_KEY_A)) {
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

  handleGravity(platforms) {
    this.y += this.velY

    if (!this.onGround) {
      this.velY += this.g
    }

    for (let platform of platforms) {
      platform.draw()
      if (
        this.x < platform.x + platform.width &&
        this.x + this.width > platform.x
      ) {
        if (
          this.x + this.width < platform.x + platform.xCollisionOffset &&
          (this.y + this.height > platform.y) &
            (this.y < platform.y + platform.height)
        ) {
          this.x = platform.x - this.width
          this.jumping = false
        } else if (
          this.x > platform.x + platform.width - platform.xCollisionOffset &&
          (this.y + this.height > platform.y) &
            (this.y < platform.y + platform.height)
        ) {
          this.x = platform.x
          this.jumping = false
        } else if (
          this.y + this.height > platform.y &&
          this.y + this.height < platform.y + platform.height / 2
        ) {
          this.onGround = true
          this.velY = 0
          this.y = platform.y - this.height
          platform.playerPresent = true
        } else if (
          this.y < platform.y + platform.height &&
          this.y > platform.y + platform.height / 2
        ) {
          this.y = platform.y + platform.height
          this.velY = this.g
        }
      } else if (platform.playerPresent) {
        platform.playerPresent = false
        this.onGround = false
      }
    }
  }
}
