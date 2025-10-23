// ✅ List of games (local files)
const games = [
  { name: "Tiny Fishing", url: "games/tinyfishing/index.html" }
];

// ✅ DOM Elements
const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");

// ✅ Display games as buttons
function displayGames(list) {
  gameList.innerHTML = ""; // Clear existing buttons

  list.forEach((game) => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `<h3>${game.name}</h3>`;

    // Hover effect: scale up
    div.addEventListener("mouseenter", () => {
      div.style.transform = "scale(1.05)";
      div.style.transition = "transform 0.2s";
    });
    div.addEventListener("mouseleave", () => {
      div.style.transform = "scale(1)";
      div.style.transition = "transform 0.2s";
    });

    // Click effect + load local game
    div.addEventListener("click", () => {
      div.style.transform = "scale(0.95)";
      setTimeout(() => div.style.transform = "scale(1)", 100);
      loadGame(game);
    });

    gameList.appendChild(div);
  });
}

// ✅ Load local game in iframe
function loadGame(game) {
  gameList.style.display = "none";
  searchInput.style.display = "none";

  // Load the local file in iframe
  gameFrame.src = game.url;
  gameFrame.style.display = "block";

  // Show back button with tween
  backButton.style.display = "block";
  backButton.style.transform = "scale(0)";
  setTimeout(() => backButton.style.transform = "scale(1)", 50);
  backButton.style.transition = "transform 0.3s ease-out";
}

// ✅ Back button returns to menu
backButton.addEventListener("click", () => {
  gameFrame.style.display = "none";
  backButton.style.display = "none";
  searchInput.style.display = "block";
  gameList.style.display = "grid";
  gameFrame.src = "";
});

// ✅ Search functionality
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter((g) => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

// ✅ Load all games initially
displayGames(games);

// ✅ Debug: check games array
console.log("Loaded games:", games);
