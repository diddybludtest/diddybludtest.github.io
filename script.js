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
  list.forEach((game, index) => {
    const div = document.createElement("div");
    div.className = "game";
    div.style.animationDelay = `${index * 0.1}s`; // ✨ staggered fade-in delay

    div.innerHTML = `
      <div class="game-inner">
        <div class="game-front">
          ${game.image ? `<img src="${game.image}" alt="${game.name}">` : ""}
          <h3>${game.name}</h3>
        </div>
        <div class="game-back">
          <p>Play ${game.name}</p>
        </div>
      </div>
    `;

    div.addEventListener("click", () => loadGame(game));
    gameList.appendChild(div);
  });
}



function loadGame(game) {
  gameList.style.display = "none";
  searchInput.style.display = "none";
  gameFrame.src = game.url;
  gameFrame.style.display = "block";
  backButton.style.display = "block";
}

backButton.addEventListener("click", () => {
  gameFrame.src = "";
  gameFrame.style.display = "none";
  backButton.style.display = "none";
  searchInput.style.display = "block";
  gameList.style.display = "grid";
});

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter(g => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

displayGames(games);
