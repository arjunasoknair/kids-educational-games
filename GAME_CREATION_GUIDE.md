# Game Creation Guide for Kids Educational Games Monorepo

This guide documents best practices and required steps for creating a new game in this monorepo, ensuring consistency, reliability, and ease of deployment.

---

## 1. Styling Consistency & Responsiveness
- **Use Tailwind CSS** for all styling. Ensure `tailwind.config.cjs` and `postcss.config.cjs` match those in existing games.
- **Component Structure:**
  - Use React functional components.
  - Organize code in a `src/` directory with `components/`, `utils/`, and `data/` as needed.
- **Responsiveness:**
  - Use Tailwind's responsive classes (`sm:`, `md:`, etc.) to ensure layouts work on all screen sizes.
  - Test on both desktop and mobile.
- **UI Consistency:**
  - Match button, card, and control styles to existing games (see `memory-flashcard-game` and `numbers-game`).
  - Use the same color palette and font (Fredoka, sans-serif).
  - Add a styled back button at the top left, linking to `/kids-educational-games/`.

---

## 2. Ensuring Local & Deployed Compatibility
- **Vite Base Path:**
  - In `vite.config.js`, set the `base` option to the correct subdirectory, e.g.:
    ```js
    export default defineConfig({
      plugins: [react()],
      base: '/kids-educational-games/your-game-folder/',
    });
    ```
- **Asset Paths:**
  - Use a `getBaseUrl()` utility in your audio/image loaders to prepend the correct base path for both local and GitHub Pages deployment.
- **Deployment Script:**
  - Update `deploy.sh` to build and copy your new game's `dist/` folder to `.gh-pages-tmp/your-game-folder/`.
- **Test:**
  - Always test both locally (`npm run dev` and `npm run build && npm run preview`) and after deployment to GitHub Pages.

---

## 3. Managing Audio Files
- **Audio Asset Structure:**
  - Place audio files in `public/audio_assets/{language}/{category}/` (e.g., `public/audio_assets/en/numbers/`).
  - Use consistent naming: `category_item_language.wav` (e.g., `numbers_021_en.wav`).
- **Audio Utilities:**
  - Use a utility function to generate audio paths using the base URL and correct subdirectory.
  - For games supporting multiple languages, support sequential playback (e.g., English then Malayalam if "both" is selected).
- **Feedback Audio:**
  - Place feedback audio in `public/audio_assets/{language}/feedback/`.
  - Use `feedback_correct_{lang}.wav` and `feedback_wrong_{lang}.wav`.
- **Preloading:**
  - Optionally preload audio for smoother UX.

---

## 4. Package Consistency
- **Dependencies:**
  - Ensure your `package.json` matches the exact versions of dependencies and devDependencies used in other games (see `numbers-game/package.json`).
  - This avoids version conflicts and ensures consistent builds.

---

## 5. General Tips
- **Navigation:**
  - Add your game to the main landing page (`main-landing-page/src/App.jsx`) with a styled card/button.
- **Testing:**
  - Test all flows, including audio, navigation, and responsiveness, both locally and after deployment.
- **Accessibility:**
  - Use `aria-label`s and ensure controls are keyboard accessible.

---

_This guide will help you create new games that are visually consistent, robust, and easy to deploy in the Kids Educational Games monorepo._ 