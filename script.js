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
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");
const overlay = document.getElementById("overlay");
const fullScreenButton = document.getElementById("fullScreenButton");
const gameView = document.getElementById("gameView");

// Display game cards
function displayGames(list) {
  gameList.innerHTML = "";
  list.forEach((game, index) => {
    const div = document.createElement("div");
    div.className = "game";
    div.style.animationDelay = `${index * 0.1}s`; // stagger fade

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

// Fade helpers
function fadeOut(element, callback) {
  element.style.opacity = 1;
  element.style.transition = "opacity 0.4s ease";
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.display = "none";
    if (callback) callback();
  }, 400);
}

function fadeIn(element, display = "block") {
  element.style.display = display;
  element.style.opacity = 0;
  element.style.transition = "opacity 0.4s ease";
  setTimeout(() => element.style.opacity = 1, 10);
}

// Load game
function loadGame(game) {
  fadeOut(gameList, () => fadeOut(searchInput));
  fadeIn(overlay, "block");
  overlay.style.pointerEvents = "auto";
  gameFrame.src = game.url;
  fadeIn(gameView, "flex");
}

// Back button
backButton.addEventListener("click", () => {
  fadeOut(gameView, () => gameFrame.src = "");
  fadeOut(overlay, () => overlay.style.pointerEvents = "none");
  fadeIn(searchInput, "block");
  fadeIn(gameList, "grid");
});

// Full screen button
fullScreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    gameView.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
  } else {
    document.exitFullscreen();
  }
});

// Search
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter(g => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

// Initial load
displayGames(games);
