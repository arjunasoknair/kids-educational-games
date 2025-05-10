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

# Create a temp deploy directory
deploy_dir=".deploy-gh-pages"
rm -rf $deploy_dir
mkdir $deploy_dir

# Copy landing page build to root of deploy dir
cp -r main-landing-page/dist/* $deploy_dir/

# Copy memory game build to subdirectory
mkdir -p $deploy_dir/memory-flashcard-game
cp -r memory-flashcard-game/dist/* $deploy_dir/memory-flashcard-game/

# (Add more games here as needed)

# Commit and push to gh-pages branch
echo "Deploying to gh-pages branch..."
git checkout gh-pages || git checkout --orphan gh-pages
git rm -rf .
cp -r $deploy_dir/* .
git add .
git commit -m "Deploy to GitHub Pages" || echo "Nothing to commit"
git push origin gh-pages

git checkout main
rm -rf $deploy_dir

echo "Deployment complete!" 