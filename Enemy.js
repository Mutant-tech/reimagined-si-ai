class Enemy {
  constructor(startX, startY, targetY) {
    this.x = startX;
    this.y = startY;
    this.targetY = targetY;
    this.state = 'descending';
    this.speed = 1; // initial slow descent speed
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
      // Attack movement logic can be defined here
      this.x += this.speed;
    }
  }
}

module.exports = Enemy;