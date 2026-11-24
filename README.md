# meli18

Site d'anniversaire pour les 18 ans de Mélissa — musiques, vidéos et réflexions.

Site statique (HTML / CSS / JavaScript) déployé sur Netlify : [meli18.fr](https://meli18.fr)

## Structure

- `index.html` — page unique de la playlist, accessible à la racine du site
- `css/style.css` — styles principaux
- `css/gift-cards.css` — styles des cartes cadeaux
- `js/main.js` — lecteurs audio, défilement fluide, déverrouillage par mot de passe
- `audio/` — les 4 musiques (Œuvre d'art, Nouvelles couleurs, Ma passion, Big Bang)
- `favicon.png` — icône du site

## Déploiement

Netlify exécute `sh build.sh` et publie `dist/`. Le script reconstitue le fichier
continu `audio/playlist-v6.mp3` depuis les segments binaires `playlist-parts/part-*`
et vérifie son SHA-256. Ces segments servent uniquement au stockage du fichier
dans le dépôt : le navigateur reçoit toujours un seul MP3 complet, jamais des
morceaux séparés, afin de conserver la lecture téléphone verrouillé.

La playlist comporte six titres, avec Gris en dernière position (début à
573,8649791666667 s, durée 155,96 s). Les commandes Media Session et le
lecteur permanent sont conservés. Pour remplacer le fichier continu, utiliser
un nouveau nom afin de respecter le cache immutable des fichiers audio.

La version v6 conserve tous les blocs MP3 des cinq titres de playlist-v2.mp3
à l’identique, sans réencodage, normalisation ni compression supplémentaire.
L’audio décodé a été comparé échantillon par échantillon à v2. Gris est ajouté
au niveau du fichier envoyé, sans traitement de volume. Les métadonnées MP3
(durée, index de recherche et délai) sont adaptées à la concaténation.
