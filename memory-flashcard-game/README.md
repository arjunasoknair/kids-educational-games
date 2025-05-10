# Memory Flash Card Game

A fun, educational memory flash card game for young children, built with React and Vite. Supports multiple topics (animals, numbers, planets, flags) and language modes (English, Malayalam, or both). Easily extensible for new topics and countries.

## Features
- Select from topics: Animals, Numbers (11–100), Planets, Flags (US, India, Canada, Italy, Portugal, Singapore, Germany, UAE)
- Choose language mode: English only, Malayalam only, or both
- Large, touch-friendly cards and simple navigation
- Works on desktop and mobile browsers
- No user data collection or tracking
- Built with open assets (images, icons, etc.)

## Project Structure
- `src/components/` — React components (MemoryGame, Card, TopicSelector, LanguageSelector, GameStats)
- `src/data/` — Topic and card data (animals, numbers, planets, flags, topics)
- `src/assets/` — Images and icons for cards (add open assets here)

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Build for production:
   ```sh
   npm run build
   ```
4. Deploy the `dist` folder to GitHub Pages.

## Extending the Game
- Add new topics or countries by updating the files in `src/data/`
- Add new images/icons to `src/assets/`

## License
Open source assets only. No user data is collected.
