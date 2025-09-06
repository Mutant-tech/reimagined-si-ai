export function attachHomeUI(container, game, skins) {
  const div = document.createElement('div');
  div.className = 'overlay';
  div.id = 'homeOverlay';

  const panel = document.createElement('div');
  panel.className = 'panel';

  const title = document.createElement('h1');
  title.innerText = 'Reimagined';
  panel.appendChild(title);

  const desc = document.createElement('p');
  desc.innerText = 'Select a skin and start the game.';
  panel.appendChild(desc);

  const skinsRow = document.createElement('div');
  skins.forEach((s) => {
    const sw = document.createElement('div');
    sw.className = 'skin-swatch';
    sw.style.background = s.color;
    sw.title = s.name;
    sw.addEventListener('click', () => {
      // mark selected
      skinsRow.querySelectorAll('.skin-swatch').forEach(el => el.classList.remove('selected'));
      sw.classList.add('selected');
      game.setSkin(s.color);
    });
    skinsRow.appendChild(sw);
  });
  panel.appendChild(skinsRow);

  const startBtn = document.createElement('button');
  startBtn.className = 'button';
  startBtn.innerText = 'Start Game';
  startBtn.addEventListener('click', () => {
    div.remove();
    game.startGame();
  });
  panel.appendChild(startBtn);

  const livesLabel = document.createElement('div');
  livesLabel.style.marginTop = '12px';
  livesLabel.innerHTML = 'Lives: ';
  const livesInput = document.createElement('input');
  livesInput.type = 'number';
  livesInput.value = game.startLives || 3;
  livesInput.min = 1;
  livesInput.max = 9;
  livesInput.style.width = '50px';
  livesInput.addEventListener('change', () => {
    game.startLives = Math.max(1, Math.min(9, parseInt(livesInput.value) || 3));
  });
  livesLabel.appendChild(livesInput);
  panel.appendChild(livesLabel);

  div.appendChild(panel);
  container.appendChild(div);
}