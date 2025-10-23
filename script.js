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
    const card = document.createElement("div");
    card.className = "game-card";

    // Front (image or name)
    const front = document.createElement("div");
    front.className = "card-front";

    if (game.image) {
      front.innerHTML = `<img src="${game.image}" alt="${game.name}" class="game-thumb">`;
    } else {
      front.innerHTML = `<div class="no-thumb"><h3>${game.name}</h3></div>`;
    }

    // Back (game name)
    const back = document.createElement("div");
    back.className = "card-back";
    back.innerHTML = `<h3>${game.name}</h3><p>Click to Play</p>`;

    // Card structure
    const inner = document.createElement("div");
    inner.className = "card-inner";
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // Flip animation
    card.addEventListener("mouseenter", () => inner.classList.add("flipped"));
    card.addEventListener("mouseleave", () => inner.classList.remove("flipped"));

    // Load game on click
    card.addEventListener("click", () => loadGame(game));

    gameList.appendChild(card);
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
