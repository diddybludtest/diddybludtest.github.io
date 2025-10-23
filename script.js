const games = [
  { name: "1v1.lol", url: "https://1v1.lol" },
  { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/" },
  { name: "Run 3", url: "https://sites.google.com/site/unblockedgames66ez/run-3" },
  { name: "Retro Bowl", url: "https://now.gg/play/new-star-games/2647/retro-bowl" },
  { name: "Slope", url: "https://mathgames66.github.io/slope/" },
  { name: "Drift Hunters", url: "https://drifthunters.io/" },
  { name: "Minecraft Classic", url: "https://classic.minecraft.net/" },
  { name: "Tetris", url: "https://tetris.com/play-tetris" },
  { name: "Shell Shockers", url: "https://shellshock.io/" },
  { name: "Subway Surfers", url: "https://now.gg/play/2753/subway-surfers" },
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
  backButton.style.display = "inline-block";
}

backButton.addEventListener("click", () => {
  gameFrame.style.display = "none";
  backButton.style.display = "none";
  searchInput.style.display = "inline-block";
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
