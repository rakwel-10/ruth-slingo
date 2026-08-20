#!/bin/sh
# Rebuilds docs/ — the clean bundle GitHub Pages serves.
# GitHub Pages can only publish from the repo root or /docs, hence the name.
# Run from the project root after changing any page or asset, then commit.
set -e
rm -rf docs
mkdir -p docs/assets
cp index.html educate.html empower.html create-legacy.html docs/
for f in hero.jpg logo-rs.png ruth-portrait.jpg scorecard.png \
         card-educate.jpg card-empower.jpg card-legacy.jpg; do
  cp "assets/$f" docs/assets/
done
cat > docs/robots.txt <<'ROBOTS'
# Client preview — not for indexing.
User-agent: *
Disallow: /
ROBOTS
# stops GitHub Pages running the files through Jekyll
: > docs/.nojekyll
echo "docs/ rebuilt"
