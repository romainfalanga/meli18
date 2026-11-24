#!/bin/sh
set -eu
mkdir -p dist
cp -R index.html playlist.html favicon.png artwork-192.png artwork-512.png _headers css js audio dist/
cat playlist-parts/part-* > dist/audio/playlist-v5.mp3
printf '%s  %s\n' '6d274f9ceb97d24cb63f75c841d76ad27031a2717f17a27615dbbc819d3c8c11' 'dist/audio/playlist-v5.mp3' | sha256sum -c -
