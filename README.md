# meli18

Site d'anniversaire pour les 18 ans de Mélissa — musiques, vidéos et réflexions.

Site statique (HTML / CSS / JavaScript) déployé sur Netlify : [meli18.fr](https://meli18.fr)

## Structure

- `index.html` — page d'accueil (lecteurs audio personnalisés, lien Vidéographie)
- `css/style.css` — styles principaux
- `css/gift-cards.css` — styles des cartes cadeaux
- `js/main.js` — lecteurs audio, défilement fluide, déverrouillage par mot de passe
- `audio/` — les 4 musiques (Œuvre d'art, Nouvelles couleurs, Ma passion, Big Bang)
- `favicon.png` — icône du site

## Déploiement

Netlify exécute `sh build.sh` et publie `dist/`. Le script reconstitue le fichier
continu `audio/playlist-v3.mp3` depuis les segments binaires `playlist-parts/part-*`
et vérifie son SHA-256. Ces segments servent uniquement au stockage du fichier
dans le dépôt : le navigateur reçoit toujours un seul MP3 complet, jamais des
morceaux séparés, afin de conserver la lecture téléphone verrouillé.

La playlist comporte six titres, avec Gris en dernière position (début à
573,8515625 s, durée 156,52620833333333 s). Les commandes Media Session et le
lecteur permanent sont conservés. Pour remplacer le fichier continu, utiliser
un nouveau nom afin de respecter le cache immutable des fichiers audio.
