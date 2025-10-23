const games = [
  { name: "Tiny Fishing", url: "games/tinyfishing/index.html" },
  { name: "Baldis Basics", url: "games/baldisbasics/index.html" },
];

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");

// Display games
function displayGames(list) {
  gameList.innerHTML = "";
  list.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `<h3>${game.name}</h3>`;

    // Hover tween
    div.addEventListener("mouseenter", () => {
      div.style.transform = "scale(1.05)";
      div.style.transition = "transform 0.2s";
    });
    div.addEventListener("mouseleave", () => {
      div.style.transform = "scale(1)";
    });

    // Click: load game
    div.addEventListener("click", () => {
      loadGame(game);
    });

    gameList.appendChild(div);
  });
}

// Load game in iframe
function loadGame(game) {
  gameList.style.display = "none";
  searchInput.style.display = "none";

  // Set iframe src
  gameFrame.src = game.url;
  gameFrame.style.display = "block";

  // Show back button
  backButton.style.display = "block";
}

// Back button
backButton.addEventListener("click", () => {
  gameFrame.src = "";           // Stop game
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
