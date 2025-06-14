# Flags & Countries Explorer: Project Requirements

## Game Overview
A fun, interactive web game to teach children about continents, major countries, flags, capitals, and world geography using an interactive map.

## Learning Goals
- Learn the continents and their major countries
- Recognize country names and flags
- Learn country capitals
- Locate countries on a world map
- Hear country names pronounced in English

## Features
- Interactive world map using MapLibre GL JS + OpenStreetMap
- Playful, simplified map style: hide roads/cities, show only country borders and names, use bright colors
- Modular data: start with major countries per continent, easy to add more later
- Continent selector (zoom to continent)
- Click/tap a country to:
  - Highlight the country on the map
  - Show the flag, name, and capital
  - Hear the country name (TTS or audio)
- Game modes:
  - Free exploration: click any country to learn about it
  - Quiz mode: show a flag and ask to find the country on the map, or highlight a few countries and ask to pick the right one; instant feedback for correct/wrong answers
- Simple session-based progress tracker (e.g., count correct answers, show stars/confetti)
- Large, touch-friendly UI, minimal text, audio cues
- Parental controls: mute, exit, reset

## Accessibility & Compatibility
- Works on desktop and mobile browsers
- High-contrast, child-friendly visuals
- Keyboard navigation support
- No user data collection or tracking

## Map Visualization
- **MapLibre GL JS** for interactive, zoomable, and pannable world map
- **OpenStreetMap** for free, open map tiles
- Custom overlays for country highlighting, clickable markers, and popups
- Custom map style for a playful, simplified look

## Text-to-Speech (TTS)
- Use browser SpeechSynthesis API for English country names (sufficient for most cases; can add custom audio if needed)
- (No Malayalam required for this game)

## Assets
- Open source SVG/PNG flag images (e.g., Wikimedia Commons)
- Country/continent/capital data (JSON, modular for easy updates)
- Audio files or TTS for country names
- Icons: speaker, stars, stickers, navigation

## Deployment
- Built with React + Vite
- Deployable as a static site on GitHub Pages

## Next Steps
- Scaffold project structure
- Integrate MapLibre GL JS and OSM
- Implement modular country/continent data and interactivity
- Add free exploration and quiz modes
- Add session-based progress tracker and fun feedback
- Add basic parental controls (mute, exit, reset) 