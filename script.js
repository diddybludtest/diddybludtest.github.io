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

// Render game cards
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
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  gameList.style.opacity = 0;
  searchInput.style.opacity = 0;

  setTimeout(() => {
    gameList.style.display = "none";
    searchInput.style.display = "none";
    gameView.style.display = "flex";
    gameFrame.src = game.url;
    gameFrame.style.opacity = 0;
    backButton.style.display = "inline-block";
    fullScreenButton.style.display = "inline-block";

    setTimeout(() => gameFrame.style.opacity = 1, 50);
  }, 400);
}

// Exit game
function exitGameView() {
  gameFrame.style.opacity = 0;
  setTimeout(() => {
    gameFrame.src = "";
    gameView.style.display = "none";
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";
    gameList.style.display = "flex";
    searchInput.style.display = "block";
    gameList.style.opacity = 1;
    searchInput.style.opacity = 1;
    backButton.style.display = "none";
    fullScreenButton.textContent = "Full Screen";
    gameFrame.style.width = "90vw";
    gameFrame.style.height = "80vh";
    if (document.fullscreenElement) document.exitFullscreen();
  }, 300);
}

// Fullscreen toggle
fullScreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (gameView.requestFullscreen) gameView.requestFullscreen();
    overlay.style.pointerEvents = "none";
    gameFrame.style.width = "100vw";
    gameFrame.style.height = "100vh";
    fullScreenButton.textContent = "Exit Full Screen";
  } else {
    document.exitFullscreen();
    overlay.style.pointerEvents = "auto";
    gameFrame.style.width = "90vw";
    gameFrame.style.height = "80vh";
    fullScreenButton.textContent = "Full Screen";
  }
});

// Detect exit fullscreen
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    overlay.style.pointerEvents = "auto";
    gameFrame.style.width = "90vw";
    gameFrame.style.height = "80vh";
    fullScreenButton.textContent = "Full Screen";
  } else {
    overlay.style.pointerEvents = "none";
    gameFrame.style.width = "100vw";
    gameFrame.style.height = "100vh";
    fullScreenButton.textContent = "Exit Full Screen";
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

// Back button
backButton.addEventListener("click", exitGameView);

// Updates overlay
updatesButton.addEventListener("click", () => updatesOverlay.classList.add("show"));
closeUpdates.addEventListener("click", () => updatesOverlay.classList.remove("show"));
