#!/bin/sh
# Rebuilds publish/ — the clean bundle Cloudflare Pages serves.
# Run from the project root after changing any page or asset.
set -e
rm -rf publish && mkdir -p publish/assets
cp index.html educate.html empower.html create-legacy.html publish/
for f in hero.jpg logo-rs.png ruth-portrait.jpg scorecard.png \
         card-educate.jpg card-empower.jpg card-legacy.jpg; do
  cp "assets/$f" publish/assets/
done
cat > publish/robots.txt <<'ROBOTS'
# Client preview — not for indexing.
User-agent: *
Disallow: /
ROBOTS
echo "publish/ rebuilt"
