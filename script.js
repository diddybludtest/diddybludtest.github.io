const games = [
  { 
    name: "Tiny Fishing", 
    url: "games/tinyfishing/index.html", 
    image: "games/tinyfishing/thumbnail.jpg" // optional image
  },
  { 
    name: "Baldi's Basics", 
    url: "games/baldisbasics/index.html", 
    image: "games/baldisbasics/thumbnail.jpg" // optional image
  },
];

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");

// Display game buttons
function displayGames(list) {
  gameList.innerHTML = "";
  list.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";

    // if image exists, show it — otherwise show name
    if (game.image) {
      div.innerHTML = `
        <img src="${game.image}" alt="${game.name}" class="game-thumb">
        <h3>${game.name}</h3>
      `;
    } else {
      div.innerHTML = `
        <div class="no-thumb"><h3>${game.name}</h3></div>
      `;
    }

    // hover tween
    div.addEventListener("mouseenter", () => {
      div.style.transform = "scale(1.05)";
      div.style.transition = "transform 0.2s";
    });
    div.addEventListener("mouseleave", () => {
      div.style.transform = "scale(1)";
    });

    // click → load game
    div.addEventListener("click", () => {
      loadGame(game);
    });

    gameList.appendChild(div);
  });
}

// Load the game inside iframe
function loadGame(game) {
  gameList.style.display = "none";
  searchInput.style.display = "none";
  gameFrame.src = game.url;
  gameFrame.style.display = "block";
  backButton.style.display = "block";
}

// Back to menu
backButton.addEventListener("click", () => {
  gameFrame.src = "";
  gameFrame.style.display = "none";
  backButton.style.display = "none";
  searchInput.style.display = "block";
  gameList.style.display = "grid";
});

// Search
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter(g => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

// Initial load
displayGames(games);
