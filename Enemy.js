export default class Enemy {
  constructor(startX, startY, targetY) {
    this.x = startX;
    this.y = startY;
    this.targetY = targetY;
    this.state = 'descending';
    this.speed = 1; // initial slow descent speed
    this.width = 24;
    this.height = 24;
  }

  update() {
    if (this.state === 'descending') {
      // Move slowly downward until targetY is reached
      if (this.y < this.targetY) {
        this.y += this.speed;
      } else {
        // Once target reached, switch to attacking state
        this.state = 'attacking';
        this.speed = 3; // increase speed during attack phase
      }
    } else if (this.state === 'attacking') {
      // Simple attack movement: move horizontally toward left
      this.x -= this.speed;
    }
  }

  render(ctx) {
    ctx.fillStyle = '#c94d4d';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  collidesWith(player) {
    return !(player.x + player.width/2 < this.x - this.width/2 ||
             player.x - player.width/2 > this.x + this.width/2 ||
             player.y + player.height/2 < this.y - this.height/2 ||
             player.y - player.height/2 > this.y + this.height/2);
  }

  isOffscreen(canvasWidth, canvasHeight) {
    return (this.x + this.width < 0 || this.x - this.width > canvasWidth || this.y - this.height > canvasHeight);
  }
}
