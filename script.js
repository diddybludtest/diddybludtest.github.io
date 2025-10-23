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
const updatesButton = document.getElementById("updatesButton");
const updatesOverlay = document.getElementById("updatesOverlay");
const closeUpdates = document.getElementById("closeUpdates");

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

// Fade helper
function fadeIn(el) {
  el.style.display = "flex";
  el.style.opacity = 0;
  requestAnimationFrame(() => {
    el.style.transition = "opacity 0.4s";
    el.style.opacity = 1;
  });
}

function fadeOut(el, callback) {
  el.style.opacity = 0;
  el.addEventListener("transitionend", function handler() {
    el.style.display = "none";
    el.removeEventListener("transitionend", handler);
    if (callback) callback();
  });
}

// Load game
function loadGame(game) {
  fadeOut(gameList);
  fadeOut(searchInput);
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  gameFrame.src = game.url;
  gameFrame.style.width = "80%";  
  gameFrame.style.height = "80%";
  fullScreenButton.textContent = "Full Screen";
  fadeIn(gameView);
}

// Exit game view
function exitGameView() {
  gameFrame.src = "";
  fadeOut(gameView, () => {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    fadeIn(gameList);
    fadeIn(searchInput);
    gameFrame.style.width = "80%";
    gameFrame.style.height = "80%";
    fullScreenButton.textContent = "Full Screen";
    if (document.fullscreenElement) document.exitFullscreen();
  });
}

// Back button
backButton.addEventListener("click", exitGameView);

// Fullscreen button
fullScreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    if (gameView.requestFullscreen) gameView.requestFullscreen();
    fullScreenButton.textContent = "Exit Full Screen";
    overlay.style.pointerEvents = "none";
    gameFrame.style.width = "100%";
    gameFrame.style.height = "100%";
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    fullScreenButton.textContent = "Full Screen";
    overlay.style.pointerEvents = "auto";
    gameFrame.style.width = "80%";
    gameFrame.style.height = "80%";
  }
});

// Fullscreen exit detection
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullScreenButton.textContent = "Full Screen";
    overlay.style.pointerEvents = "auto";
    gameFrame.style.width = "80%";
    gameFrame.style.height = "80%";
  } else {
    overlay.style.pointerEvents = "none";
    gameFrame.style.width = "100%";
    gameFrame.style.height = "100%";
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

// Updates button
updatesButton.addEventListener("click", () => {
  fadeIn(updatesOverlay);
});

// Close updates overlay
closeUpdates.addEventListener("click", () => {
  fadeOut(updatesOverlay);
});
