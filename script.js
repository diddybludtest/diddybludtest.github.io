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

    // Hover Tween
    div.addEventListener("mouseenter", () => {
      gsap.to(div, { scale: 1.05, duration: 0.3 });
    });
    div.addEventListener("mouseleave", () => {
      gsap.to(div, { scale: 1, duration: 0.3 });
    });

    // Click Tween
    div.addEventListener("click", () => {
      gsap.to(div, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
      loadGame(game);
    });

    gameList.appendChild(div);
  });
}

function loadGame(game) {
  gsap.to(gameList, { opacity: 0, duration: 0.3, onComplete: () => gameList.style.display = "none" });
  searchInput.style.display = "none";
  gameFrame.src = game.url;
  gameFrame.style.display = "block";
  gsap.fromTo(backButton, { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(1.7)" });
  backButton.style.display = "block";
}

backButton.addEventListener("click", () => {
  gsap.to(gameFrame, { opacity: 0, duration: 0.3, onComplete: () => gameFrame.style.display = "none" });
  gsap.to(backButton, { scale: 0, duration: 0.3, onComplete: () => backButton.style.display = "none" });
  searchInput.style.display = "block";
  gameList.style.display = "grid";
  gsap.to(gameList, { opacity: 1, duration: 0.3 });
  gameFrame.src = "";
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = games.filter((g) => g.name.toLowerCase().includes(value));
  displayGames(filtered);
});

// Load all games on start
displayGames(games);
