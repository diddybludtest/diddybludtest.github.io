const games = [
  { name: "Tiny Fishing", url: "games/tinyfishing/index.html", image: "games/tinyfishing/tiny-fishing.png" },
  { name: "Slope", url: "games/slope/index.html", image: "games/slope/thumb.png" },
  { name: "Retro Bowl", url: "games/retro-bowl/index.html", image: "games/retro-bowl/thumby.jpg" },
];

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameView = document.getElementById("gameView");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");
const fullScreenButton = document.getElementById("fullScreenButton");
const overlay = document.getElementById("overlay");
const updatesButton = document.getElementById("updatesButton");
const updatesOverlay = document.getElementById("updatesOverlay");
const closeUpdates = document.getElementById("closeUpdates");

// Display games
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
  gameList.style.opacity = 0;
  setTimeout(() => { gameList.style.display = "none"; }, 400);

  searchInput.style.opacity = 0;
  setTimeout(() => { searchInput.style.display = "none"; }, 400);

  overlay.style.opacity = 1;
  overlay.style.pointerEvents = "auto";

  gameView.style.display = "flex";
  gameView.style.opacity = 0;
  setTimeout(() => { gameView.style.opacity = 1; }, 50);

  gameFrame.src = game.url;
  gameFrame.style.width = "80%";
  gameFrame.style.height = "80%";
  fullScreenButton.textContent = "Full Screen";
}

// Back to menu
backButton.addEventListener("click", exitGameView);

function exitGameView() {
  gameFrame.src = "";
  gameView.style.opacity = 0;
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = "none";
  setTimeout(() => { gameView.style.display = "none"; }, 400);

  gameList.style.display = "flex";
  searchInput.style.display = "block";
  setTimeout(() => {
    gameList.style.opacity = 1;
    searchInput.style.opacity = 1;
  }, 50);

  fullScreenButton.textContent = "Full Screen";
  gameFrame.style.width = "80%";
  gameFrame.style.height = "80%";

  if (document.fullscreenElement) document.exitFullscreen();
}

// Fullscreen
fullScreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    gameView.requestFullscreen();
    overlay.style.pointerEvents = "none";
    gameFrame.style.width = "100%";
    gameFrame.style.height = "100%";
    fullScreenButton.textContent = "Exit Full Screen";
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    overlay.style.pointerEvents = "auto";
    gameFrame.style.width = "80%";
    gameFrame.style.height = "80%";
    fullScreenButton.textContent = "Full Screen";
  } else {
    overlay.style.pointerEvents = "none";
    gameFrame.style.width = "100%";
    gameFrame.style.height = "100%";
    fullScreenButton.textContent = "Exit Full Screen";
  }
});

// Search
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  Array.from(gameList.children).forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(value) ? "flex" : "none";
  });
});

// Updates overlay
updatesButton.addEventListener("click", () => {
  updatesOverlay.classList.add("show");
});

closeUpdates.addEventListener("click", () => {
  updatesOverlay.classList.remove("show");
});
