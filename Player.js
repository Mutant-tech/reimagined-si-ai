export default class Player {
  constructor(x, y, skin = '#2b7cff') {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.lives = 3;
    this.skin = skin;
  }

  setSkin(color) {
    this.skin = color;
  }

  loseLife() {
    if (this.lives > 0) this.lives -= 1;
    return this.lives;
  }

  isAlive() {
    return this.lives > 0;
  }

  render(ctx) {
    ctx.fillStyle = this.skin;
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}
