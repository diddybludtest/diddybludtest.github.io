<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unblocked Games Hub</title>
  <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/1006/1006771.png">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: #0f172a;
      color: white;
      text-align: center;
      margin: 0;
    }

    header {
      background: #1e293b;
      padding: 20px;
      box-shadow: 0 0 10px #000;
    }

    h1 { margin: 0; font-size: 2rem; }

    input[type="text"] {
      width: 60%;
      padding: 10px;
      margin-top: 15px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
    }

    .games {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      padding: 30px;
    }

    .game {
      background: #1e293b;
      border-radius: 10px;
      padding: 10px;
      transition: 0.2s;
    }

    .game:hover {
      transform: scale(1.05);
      background: #334155;
      cursor: pointer;
    }

    iframe {
      width: 90%;
      height: 600px;
      border: none;
      border-radius: 10px;
      margin-top: 20px;
      display: none;
    }

    #backButton {
      display: none;
      margin-top: 15px;
      background: #38bdf8;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }

    #backButton:hover { background: #0ea5e9; }

    footer {
      background: #1e293b;
      padding: 15px;
      font-size: 14px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <header>
    <h1>🎮 Unblocked Games Hub</h1>
    <input type="text" id="search" placeholder="Search for a game...">
  </header>

  <div id="gameList" class="games"></div>

  <iframe id="gameFrame"></iframe>
  <br>
  <button id="backButton">🔙 Back to Menu</button>

  <footer>
    <p>Made by <a href="https://github.com/YOUR-USERNAME" target="_blank">YOUR NAME</a> | Hosted on GitHub Pages</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
