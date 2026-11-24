#!/bin/sh
set -eu
mkdir -p dist
cp -R index.html playlist.html favicon.png artwork-192.png artwork-512.png _headers css js audio dist/
cat playlist-parts/part-* > dist/audio/playlist-v6.mp3
printf '%s  %s\n' 'c314e5fc937424659034297943b7053c4316f5b622a2714ce9e124906f88710c' 'dist/audio/playlist-v6.mp3' | sha256sum -c -
