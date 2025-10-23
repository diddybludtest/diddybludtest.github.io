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

function displayGames(list) {
  gameList.innerHTML = "";
  list.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";

    // try to load the image, fallback to name if it fails
    const img = new Image();
    img.src = game.image;
    img.className = "game-thumb";
    img.alt = game.name;

    img.onerror = () => {
      div.innerHTML = `<div class="no-thumb"><h3>${game.name}</h3></div>`;
    };
    img.onload = () => {
      div.innerHTML = `
        <img src="${game.image}" alt="${game.name}" class="game-thumb">
        <h3>${game.name}</h3>
      `;
    };

    // smooth hover tween
    div.addEventListener("mouseenter", () => {
      div.style.transform = "scale(1.05)";
      div.style.transition = "transform 0.2s";
    });
    div.addEventListener("mouseleave", () => {
      div.style.transform = "scale(1)";
    });

    // load game on click
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
