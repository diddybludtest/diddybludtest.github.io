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
];

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameView = document.getElementById("gameView");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");
const fullScreenButton = document.getElementById("fullScreenButton");
const overlay = document.getElementById("overlay");

// Display games as cards
function displayGames(list) {
  gameList.innerHTML = "";
  list.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";

    div.innerHTML = `
      <div class="game-inner">
        <div class="game-front">
          ${game.image ? `<img src="${game.image}" alt="${game.name}">` : ""}
          <h3>${game.name}</h3>
        </div>
        <div class="game-back">
          Play ${game.name}
        </div>
      </div>
    `;

    div.addEventListener("click", () => loadGame(game));
    gameList.appendChild(div);
  });
}

// Load game
function loadGame(game) {
  gameList.style.display = "none";
  searchInput.style.display = "none";
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  gameView.style.display = "flex";
  gameFrame.src = game.url;
}

// Back button
backButton.addEventListener("click", () => {
  gameFrame.src = "";
  gameView.style.display = "none";
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  gameList.style.display = "flex";
  searchInput.style.display = "block";

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// Fullscreen button
fullScreenButton.addEventListener("click", () => {
  if (gameView.requestFullscreen) {
    gameView.requestFullscreen();
  } else if (gameView.webkitRequestFullscreen) {
    gameView.webkitRequestFullscreen();
  } else if (gameView.msRequestFullscreen) {
    gameView.msRequestFullscreen();
  }
  gameFrame.style.width = "100%";
  gameFrame.style.height = "100%";
});

// Search filter
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter(g => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

// Initial load
displayGames(games);
