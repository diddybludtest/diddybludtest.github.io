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

// Display game cards
function displayGames(list) {
  gameList.innerHTML = "";
  list.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `
      <div class="game-inner">
        <div class="game-front">
          ${game.image ? `<img src="${game.image}" alt="${game.name}" class="game-thumb">` : ""}
          <h3>${game.name}</h3>
        </div>
        <div class="game-back">
          Play ${game.name}
        </div>
      </div>
    `;
    div.addEventListener("click", () => {
      loadGame(game);
    });
    gameList.appendChild(div);
  });
}

// Smooth fade-out helper
function fadeOut(element, callback) {
  element.style.opacity = 1;
  element.style.transition = "opacity 0.4s ease";
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.display = "none";
    if (callback) callback();
  }, 400);
}

// Smooth fade-in helper
function fadeIn(element, display = "block") {
  element.style.display = display;
  element.style.opacity = 0;
  element.style.transition = "opacity 0.4s ease";
  setTimeout(() => {
    element.style.opacity = 1;
  }, 10);
}

// Load game with fade transition
function loadGame(game) {
  fadeOut(gameList, () => {
    fadeOut(searchInput);
    gameFrame.src = game.url;
    fadeIn(gameFrame, "block");
    fadeIn(backButton, "block");
  });
}

// Back to menu with fade transition
backButton.addEventListener("click", () => {
  fadeOut(gameFrame, () => {
    gameFrame.src = "";
    fadeOut(backButton);
    fadeIn(searchInput, "block");
    fadeIn(gameList, "grid");
  });
});

// Search bar
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter(g => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

// Initial load
displayGames(games);
