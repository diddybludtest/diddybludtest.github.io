const games = [
  { name: "Tiny Fishing", url: "games/tinyfishing/index.html" },
];


const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");
const gameFrame = document.getElementById("gameFrame");
const backButton = document.getElementById("backButton");

function displayGames(list) {
  gameList.innerHTML = "";
  list.forEach((game) => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `<h3>${game.name}</h3>`;
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
  gameFrame.style.display = "none";
  backButton.style.display = "none";
  searchInput.style.display = "block";
  gameList.style.display = "grid";
  gameFrame.src = "";
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter((g) => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

// Load all games on start
displayGames(games);
