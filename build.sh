#!/bin/sh
set -eu
mkdir -p dist
cp -R index.html playlist.html favicon.png artwork-192.png artwork-512.png _headers css js audio dist/
cat playlist-parts/part-* > dist/audio/playlist-v4.mp3
printf '%s  %s\n' '551335594f8367ae96f02c9810284cbccaad79bcb60120a427dc7ea90893dbd6' 'dist/audio/playlist-v4.mp3' | sha256sum -c -
