const games = [
  { name: "Idle Breakout", url: "games/idle-breakout/index.html", image: "games/idle-breakout/thumy.png" },
  { name: "Tiny Fishing", url: "games/tinyfishing/index.html", image: "games/tinyfishing/tiny-fishing.png" },
  { name: "Slope", url: "games/slope/index.html", image: "games/slope/thumb.png" },
  { name: "Basketball Stars", url: "games/basketball-stars/index.html", image: "games/basketball-stars/basketball-stars.jpg" },
  { name: "Retro Bowl", url: "games/retro-bowl/index.html", image: "games/retro-bowl/thumby.jpg" },
  { name: "The Worlds Hardest Game", url: "games/worlds-hardest-game/index.html", image: "games/worlds-hardest-game/thh.jpg" },
];

// Elements
const gameList = document.getElementById("gameList");
const overlay = document.getElementById("overlay");
const gameView = document.getElementById("gameView");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");
const fullScreenButton = document.getElementById("fullScreenButton");
const updatesButton = document.getElementById("updatesButton");
const updatesOverlay = document.getElementById("updatesOverlay");
const closeUpdates = document.getElementById("closeUpdates");
const searchInput = document.getElementById("search");

// Populate game list
function loadGames() {
  gameList.innerHTML = "";
  games.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
    `;
    div.addEventListener("click", () => openGame(game.url)); // ✅ fixed here
    gameList.appendChild(div);
  });
}

// Open game with fade
function openGame(url) {
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  setTimeout(() => {
    gameFrame.src = url;
    gameView.style.display = "flex";
    setTimeout(() => gameView.style.opacity = "1", 50);
  }, 300);
}

// Close game view
backButton.addEventListener("click", () => {
  gameView.style.opacity = "0";
  setTimeout(() => {
    gameView.style.display = "none";
    gameFrame.src = "";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
  }, 400);
});

// Fullscreen handling
fullScreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    gameFrame.requestFullscreen().catch(err => console.warn(err));
  } else {
    document.exitFullscreen();
  }
});

// Updates Overlay
updatesButton.addEventListener("click", () => {
  updatesOverlay.classList.add("show");
});

closeUpdates.addEventListener("click", () => {
  updatesOverlay.classList.remove("show");
});

// Search
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".game").forEach(game => {
    const name = game.querySelector("h3").textContent.toLowerCase();
    game.style.display = name.includes(value) ? "flex" : "none";
  });
});

// Init
loadGames();
