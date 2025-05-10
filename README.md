# Kids Educational Games

A suite of fun, educational web games for young children, built with React and Vite. Each game is a standalone app, and the main landing page provides a simple menu to access them all. Designed for easy extension as you add more games.

---

## Directory Structure

```
kids-educational-games/
│
├── main-landing-page/           # Vite+React app for the main menu (landing page)
│   ├── src/
│   └── ...
│
├── memory-flashcard-game/       # Standalone Vite+React app for the Memory Flash Card Game
│   ├── src/
│   └── ...
│
├── another-game/                # (Future) Standalone app for another game
│   ├── src/
│   └── ...
│
├── shared-assets/               # (Optional) Shared images, sounds, data
│
├── deploy.sh                    # Script to build and deploy all apps to gh-pages
│
└── README.md                    # Workspace-level documentation (this file)
```

---

## How It Works

- Each game is a separate Vite+React project, built and deployed independently.
- The main landing page is a Vite+React app that links to each game.
- All apps are deployed to GitHub Pages using the `gh-pages` branch, with each game in its own subdirectory.

---

## Local Development

1. **Install dependencies** for each app (e.g., landing page, memory game):
   ```sh
   cd main-landing-page
   npm install
   cd ../memory-flashcard-game
   npm install
   # ...repeat for other games
   ```
2. **Start the development server** for any app:
   ```sh
   npm run dev
   ```

---

## Building and Deploying to GitHub Pages

1. **Run the deploy script from the root of the repo:**
   ```sh
   ./deploy.sh
   ```
   This will:
   - Build each app
   - Copy the build outputs to a temporary directory
   - Switch to the `gh-pages` branch
   - Copy the built files to the correct locations
   - Commit and push to GitHub Pages
   - Switch back to the `main` branch

2. **Configure GitHub Pages** to serve from the `gh-pages` branch and the root directory.

---

## Adding a New Game

1. Scaffold a new Vite+React project in a new folder (e.g., `another-game/`).
2. Add the new game to the `games` array in `main-landing-page/src/App.jsx`.
3. Update `deploy.sh` to build and copy the new game to the deploy directory.
4. Run `./deploy.sh` to deploy.

---

## License
Open source assets only. No user data is collected. 