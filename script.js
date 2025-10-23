const games = [
  { name: "Tiny Fishing", url: "games/tinyfishing/index.html", image: "games/tinyfishing/tiny-fishing.png" },
  { name: "Slope", url: "games/slope/index.html", image: "games/slope/thumb.png" },
  { name: "Retro Bowl", url: "games/retro-bowl/index.html", image: "games/retro-bowl/thumby.jpg" },
];

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameView = document.getElementById("gameView");
const gameFrame = document.getElementById("gameFrame");
const overlay = document.getElementById("overlay");
const backButton = document.getElementById("backButton");
const fullScreenButton = document.getElementById("fullScreenButton");
const updatesButton = document.getElementById("updatesButton");
const updatesOverlay = document.getElementById("updatesOverlay");
const closeUpdates = document.getElementById("closeUpdates");

// DISPLAY GAME CARDS
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

// LOAD GAME
function loadGame(game) {
  gameList.style.opacity = "0";
  setTimeout(() => gameList.style.display = "none", 400);
  searchInput.style.display = "none";
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
  gameView.style.display = "flex";
  gameFrame.src = game.url;
  gameFrame.style.width = "80%";
  gameFrame.style.height = "80%";
  fullScreenButton.textContent = "Full Screen";
}

// EXIT GAME VIEW
function exitGameView() {
  gameFrame.src = "";
  gameView.style.display = "none";
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  gameList.style.display = "flex";
  setTimeout(() => gameList.style.opacity = "1", 10);
  searchInput.style.display = "block";
  gameFrame.style.width = "80%";
  gameFrame.style.height = "80%";
  fullScreenButton.textContent = "Full Screen";
  if (document.fullscreenElement) document.exitFullscreen();
}

backButton.addEventListener("click", exitGameView);

// FULLSCREEN TOGGLE
fullScreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    gameView.requestFullscreen();
    fullScreenButton.textContent = "Exit Full Screen";
    overlay.style.pointerEvents = "none";
    gameFrame.style.width = "100%";
    gameFrame.style.height = "100%";
  } else {
    document.exitFullscreen();
    fullScreenButton.textContent = "Full Screen";
    overlay.style.pointerEvents = "auto";
    gameFrame.style.width = "80%";
    gameFrame.style.height = "80%";
  }
});

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

// SEARCH FILTER
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  Array.from(gameList.children).forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(value) ? "flex" : "none";
  });
});

// UPDATES BUTTON
updatesButton.addEventListener("click", () => {
  updatesOverlay.classList.add("show");
});

closeUpdates.addEventListener("click", () => {
  updatesOverlay.classList.remove("show");
});
