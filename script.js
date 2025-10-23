const games = [
  { 
    name: "Tiny Fishing", 
    url: "games/tinyfishing/index.html", 
    image: "games/tinyfishing/tiny-fishing.png"
  },
  { 
    name: "Slope", 
    url: "games/slope/index.html", 
    image: "games/slope/thumb.png"
  },
  { 
    name: "Retro Bowl", 
    url: "games/retro-bowl/index.html", 
    image: "games/retro-bowl/thumby.jpg"
  },
];

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameView = document.getElementById("gameView");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");
const fullScreenButton = document.getElementById("fullScreenButton");
const overlay = document.getElementById("overlay");

// Display all game cards
games.forEach(game => {
  const div = document.createElement("div");
  div.className = "game";
  div.innerHTML = `
    <div class="game-inner">
      <div class="game-front">
        ${game.image ? `<img src="${game.image}" alt="${game.name}">` : ""}
        <h3>${game.name}</h3>
      </div>
      <div class="game-back">Play ${game.name}</div>
    </div>
  `;
  div.addEventListener("click", () => loadGame(game));
  gameList.appendChild(div);
});

// Load game
function loadGame(game) {
  gameList.style.display = "none";
  searchInput.style.display = "none";
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  gameView.style.display = "flex";
  gameFrame.src = game.url;
  fullScreenButton.textContent = "Full Screen";
}

// Back button
backButton.addEventListener("click", () => {
  exitGameView();
});

// Fullscreen button
fullScreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (gameView.requestFullscreen) gameView.requestFullscreen();
    else if (gameView.webkitRequestFullscreen) gameView.webkitRequestFullscreen();
    else if (gameView.msRequestFullscreen) gameView.msRequestFullscreen();
    fullScreenButton.textContent = "Exit Full Screen";
    overlay.style.pointerEvents = "none";
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    fullScreenButton.textContent = "Full Screen";
    overlay.style.pointerEvents = "auto";
  }
});

// Detect fullscreen change (Esc key)
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullScreenButton.textContent = "Full Screen";
    overlay.style.pointerEvents = "auto";
  } else {
    overlay.style.pointerEvents = "none";
  }
});

// Search filter
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  Array.from(gameList.children).forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(value) ? "flex" : "none";
  });
});

// Helper: exit game view
function exitGameView() {
  gameFrame.src = "";
  gameView.style.display = "none";
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  gameList.style.display = "flex";
  searchInput.style.display = "block";
  fullScreenButton.textContent = "Full Screen";
  if (document.fullscreenElement) document.exitFullscreen();
}
