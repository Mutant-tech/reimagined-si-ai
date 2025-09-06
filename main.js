import Game from './Game.js';
import { SKINS } from './Skins.js';
import { attachHomeUI } from './HomeScreen.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ui = document.getElementById('ui');
  const game = new Game(canvas);

  // default skin selection mark
  // attach home UI
  attachHomeUI(document.body, game, SKINS);

  // simple keyboard to move player for testing
  window.addEventListener('keydown', (e) => {
    if (game.state !== 'playing') return;
    const step = 12;
    if (e.key === 'ArrowLeft') game.player.x = Math.max(game.player.width/2, game.player.x - step);
    if (e.key === 'ArrowRight') game.player.x = Math.min(canvas.width - game.player.width/2, game.player.x + step);
    if (e.key === 'ArrowUp') game.player.y = Math.max(game.player.height/2, game.player.y - step);
    if (e.key === 'ArrowDown') game.player.y = Math.min(canvas.height - game.player.height/2, game.player.y + step);
  });
});
