#!/bin/sh
set -eu
mkdir -p dist
cp -R index.html playlist.html favicon.png artwork-192.png artwork-512.png _headers css js audio dist/
cat playlist-parts/part-* > dist/audio/playlist-v3.mp3
printf '%s  %s\n' 'e083a15716cec1b9db6a5d59b14958e3b2a13165b44ccd7a14d19ebf4f269e30' 'dist/audio/playlist-v3.mp3' | sha256sum -c -
