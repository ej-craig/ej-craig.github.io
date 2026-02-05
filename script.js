const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const player = document.getElementById('player');

let score = 0;
let playerX = gameArea.clientWidth / 2 - 40; // starting position
const playerSpeed = 20; // pixels per key press
const fallSpeed = 2; // pixels per frame

// Keyboard controls
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    playerX = Math.max(0, playerX - playerSpeed);
  } else if (e.key === 'ArrowRight') {
    playerX = Math.min(gameArea.clientWidth - 80, playerX + playerSpeed);
  }
  player.style.left = playerX + 'px';
});

// Random position for elements
function randomX() {
  return Math.floor(Math.random() * (gameArea.clientWidth - 50));
}

// Spawn falling elements
function spawnElement() {
  const el = document.createElement('div');
  el.classList.add('element');

  if (Math.random() < 0.6) {
    el.classList.add('accessible');
    el.textContent = "✅";
    el.dataset.type = "accessible";
  } else {
    el.classList.add('inaccessible');
    el.textContent = "❌";
    el.dataset.type = "inaccessible";
  }

  el.style.left = randomX() + 'px';
  el.style.top = '0px';
  gameArea.appendChild(el);

  function fall() {
    const top = parseInt(el.style.top);
    if (top < gameArea.clientHeight - 50) {
      el.style.top = top + fallSpeed + 'px';

      // Check collision with player
      const elRect = el.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();
      if (
        elRect.bottom >= playerRect.top &&
        elRect.left < playerRect.right &&
        elRect.right > playerRect.left
      ) {
        if (el.dataset.type === "accessible") {
          score++;
        } else {
          score = Math.max(score - 1, 0);
        }
        scoreDisplay.textContent = `Score: ${score}`;
        el.remove();
        return;
      }

      requestAnimationFrame(fall);
    } else {
      el.remove();
    }
  }

  fall();
}

// Spawn elements every second
setInterval(spawnElement, 1000);
