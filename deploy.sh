#!/bin/bash
# Deploy all games and the landing page to the gh-pages branch

set -e

# Build each app
echo "Building main landing page..."
cd main-landing-page
npm run build
cd ..

echo "Building memory flashcard game..."
cd memory-flashcard-game
npm run build
cd ..

# Prepare worktree for gh-pages branch
rm -rf .gh-pages-tmp
git worktree add .gh-pages-tmp gh-pages || git worktree add .gh-pages-tmp --orphan gh-pages

# Clean out old files
rm -rf .gh-pages-tmp/*

# Copy new build files
cp -r main-landing-page/dist/* .gh-pages-tmp/
mkdir -p .gh-pages-tmp/memory-flashcard-game
cp -r memory-flashcard-game/dist/* .gh-pages-tmp/memory-flashcard-game/

# Commit and push
cd .gh-pages-tmp
git add .
git commit -m "Deploy to GitHub Pages" || echo "Nothing to commit"
git push origin gh-pages
cd ..

# Clean up
git worktree remove .gh-pages-tmp

echo "Deployment complete!" 