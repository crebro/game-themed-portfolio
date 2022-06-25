class Platform {
  constructor(x, y, nBlocks) {
    this.x = x
    this.y = y
    this.img = singleTileImage
    this.sideTile = sideTile
    this.nBlocks = nBlocks
    this.width = this.img.width * nBlocks
    this.height = this.img.height
    this.playerPresent = false
    this.xCollisionOffset = 50
  }

  draw() {
    for (let i = 0; i < this.nBlocks; i++) {
      if (i === 0) {
        push()
        scale(-1, 1)
        image(
          this.sideTile,
          -this.x - this.img.width * i - this.img.width,
          this.y,
        )
        pop()
      } else {
        image(this.img, this.x + this.img.width * i, this.y)
      }
    }
  }

  handlePlayer(player) {
    if (player.x < this.x + this.width && player.x + player.width > this.x) {
      if (
        player.x + player.width < this.x + this.xCollisionOffset &&
        (player.y + player.height > this.y) & (player.y < this.y + this.height)
      ) {
        player.x = this.x - player.width
        player.jumping = false
      } else if (
        player.x > this.x + this.width - this.xCollisionOffset &&
        (player.y + player.height > this.y) & (player.y < this.y + this.height)
      ) {
        player.x = this.x
        player.jumping = false
      } else if (
        player.y + player.height > this.y &&
        player.y + player.height < this.y + this.height / 2
      ) {
        player.onGround = true
        player.velY = 0
        player.y = this.y - player.height
        this.playerPresent = true
      } else if (
        player.y < this.y + this.height &&
        player.y > this.y + this.height / 2
      ) {
        player.y = this.y + this.height
        player.velY = player.g
      }
    } else if (this.playerPresent) {
      this.playerPresent = false
      player.onGround = false
    }
  }
}
