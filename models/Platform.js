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
}
