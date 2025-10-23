// ✅ List of games
const games = [
  { name: "Tiny Fishing", url: "games/tinyfishing/index.html" }
];

// ✅ Get DOM elements
const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");

// ✅ Function to display games as buttons
function displayGames(list) {
  gameList.innerHTML = ""; // Clear existing buttons
  list.forEach((game) => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `<h3>${game.name}</h3>`;

    // Hover effect: smooth scale
    div.addEventListener("mouseenter", () => {
      div.style.transform = "scale(1.05)";
      div.style.transition = "transform 0.2s";
    });
    div.addEventListener("mouseleave", () => {
      div.style.transform = "scale(1)";
      div.style.transition = "transform 0.2s";
    });

    // Click effect + load game
    div.addEventListener("click", () => {
      div.style.transform = "scale(0.95)";
      setTimeout(() => div.style.transform = "scale(1)", 100);
      loadGame(game);
    });

    gameList.appendChild(div);
  });
}

// ✅ Function to load a game in the iframe
function loadGame(game) {
  gameList.style.display = "none";
  searchInput.style.display = "none";
  gameFrame.src = game.url;
  gameFrame.style.display = "block";
  backButton.style.display = "block";
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

// ✅ Debugging: make sure games array is loaded
console.log("Games loaded:", games);
