import Enemy from './Enemy.js';
import Player from './Player.js';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.enemies = [];
    this.spawnTimer = 0;
    this.spawnInterval = 1200; // ms
    this.lastTime = 0;
    this.running = false;
    this.state = 'home';
    this.player = new Player(canvas.width / 2, canvas.height - 60);
    this.startLives = 3;
    this.currentSkin = this.player.skin;
    this._boundLoop = this.loop.bind(this);
  }

  setSkin(color) {
    this.currentSkin = color;
    this.player.setSkin(color);
  }

  startGame() {
    this.enemies = [];
    this.spawnTimer = 0;
    this.lastTime = performance.now();
    this.player.lives = this.startLives;
    this.state = 'playing';
    this.running = true;
    requestAnimationFrame(this._boundLoop);
  }

  endGame() {
    this.state = 'gameover';
    this.running = false;
    // show a simple overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `<div class="panel"><h2>Game Over</h2><p>Lives depleted</p><button class="button" id="retryBtn">Retry</button></div>`;
    document.body.appendChild(overlay);
    document.getElementById('retryBtn').addEventListener('click', () => {
      overlay.remove();
      this.startGame();
    });
  }

  spawnEnemy() {
    const startX = this.canvas.width + 30;
    const startY = Math.random() * 150 + 20;
    const targetY = Math.random() * (this.canvas.height - 200) + 80;
    this.enemies.push(new Enemy(startX, startY, targetY));
  }

  loseLife() {
    const remaining = this.player.loseLife();
    if (remaining <= 0) {
      this.endGame();
    }
  }

  loop(now) {
    if (!this.running) return;
    const dt = now - (this.lastTime || now);
    this.lastTime = now;

    // spawn logic
    this.spawnTimer += dt;
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnEnemy();
    }

    // update
    this.enemies.forEach(e => e.update());

    // collision detection
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (e.collidesWith(this.player)) {
        // remove enemy and deduct life
        this.enemies.splice(i, 1);
        this.loseLife();
        continue;
      }
      if (e.isOffscreen(this.canvas.width, this.canvas.height)) {
        this.enemies.splice(i, 1);
      }
    }

    // render
    this.render();

    requestAnimationFrame(this._boundLoop);
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw player
    this.player.render(ctx);

    // draw enemies
    this.enemies.forEach(e => e.render(ctx));

    // HUD - lives
    ctx.fillStyle = '#fff';
    ctx.font = '18px sans-serif';
    ctx.fillText('Lives: ' + this.player.lives, 12, 22);
    ctx.fillText('Skin: ', 12, 44);
    ctx.fillStyle = this.player.skin;
    ctx.fillRect(60, 30, 20, 12);
  }
}