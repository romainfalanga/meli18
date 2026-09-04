// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const giftsSection = document.querySelector('#gifts');
        if (giftsSection) {
            giftsSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Fonction pour déverrouiller les cadeaux (page d'accueil)
function unlockGift(button) {
    const card = button.closest('.gift-card');
    const input = card.querySelector('.gift-password');
    const errorMsg = card.querySelector('.password-error');
    const targetPage = input.getAttribute('data-target');
    const password = input.value.trim().toLowerCase();
    
    if (password === 'romain') {
        // Sauvegarder le déverrouillage
        const person = card.getAttribute('data-person');
        localStorage.setItem(`unlocked_${person}`, 'true');
        
        // Rediriger vers la page
        window.location.href = targetPage;
    } else {
        errorMsg.textContent = 'Mot de passe incorrect 🔒';
        input.value = '';
        input.focus();
        
        // Animation shake
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
        
        // Effacer l'erreur après 3s
        setTimeout(() => {
            errorMsg.textContent = '';
        }, 3000);
    }
}

// Permettre de déverrouiller avec la touche Entrée sur les cartes
document.addEventListener('DOMContentLoaded', () => {
    const giftPasswordInputs = document.querySelectorAll('.gift-password');
    giftPasswordInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const button = input.parentElement.querySelector('.unlock-gift-btn');
                if (button) {
                    unlockGift(button);
                }
            }
        });
    });
});

// Password protection pour l'album (page romain.html)
// Code pour l'album supprimé - accès direct via URL /romain2012

// Countdown pour l'IA (2 jours à partir du 18 décembre)
function updateCountdown() {
    // Date de disponibilité de l'IA (22 décembre 2025)
    const targetDate = new Date('2025-12-22T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    
    if (daysEl && hoursEl && minutesEl) {
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
        } else {
            // L'IA est maintenant disponible
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = 
                    '<p style="font-size: 1.5rem; color: var(--accent-gold); font-weight: 600;">✨ Melissia est maintenant disponible ! ✨</p>';
            }
            const ctaBtn = document.querySelector('.cta-btn.disabled');
            if (ctaBtn) {
                ctaBtn.classList.remove('disabled');
                ctaBtn.removeAttribute('disabled');
                ctaBtn.innerHTML = '<i class="fas fa-rocket"></i> Accéder à Melissia';
            }
        }
    }
}

// Mettre à jour le countdown toutes les minutes
updateCountdown();
setInterval(updateCountdown, 60000);

// Animation au scroll (apparition progressive)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments animables
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.gift-card, .music-track, .step-card, .ia-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Annotations data for each track
const trackAnnotations = {
    'Ma passion': [],
    'Le passager': [],
    'Réveille-toi': [
        { time: 45, note: "Moment clé de la prise de conscience" },
        { time: 120, note: "Transition vers l'éveil" }
    ],
    'Rendors-toi': [],
    'Quand je vois je pense': [],
    'Un fil entre 2 infinis': [],
    'Mes galaxies dansent': [],
    'Je pense donc je suis infini': []
};

// Gestion du player audio - CUSTOM CONTROLS avec PLAY/PAUSE
document.addEventListener('DOMContentLoaded', () => {
    // Add custom controls to all audio players that don't have them
    document.querySelectorAll('.audio-player').forEach(audio => {
        const track = audio.closest('.music-track');
        const trackTitle = track.querySelector('.track-title')?.textContent.trim();
        
        if (!track.querySelector('.custom-audio-controls')) {
            const controls = document.createElement('div');
            controls.className = 'custom-audio-controls';
            controls.innerHTML = `
                <button class="play-pause-btn">
                    <i class="fas fa-play"></i>
                </button>
                <div class="audio-progress-container">
                    <div class="audio-progress-bar">
                        <div class="audio-progress-fill"></div>
                    </div>
                    <div class="audio-time">
                        <span class="current-time">0:00</span>
                        <span class="duration">0:00</span>
                    </div>
                </div>
                <div class="volume-control">
                    <button class="volume-btn">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="repeat-btn">
                        <i class="fas fa-repeat"></i>
                    </button>
                </div>
            `;
            audio.after(controls);
            
            // Add annotation markers if available
            if (trackTitle && trackAnnotations[trackTitle]) {
                const progressBar = controls.querySelector('.audio-progress-bar');
                const annotations = trackAnnotations[trackTitle];
                
                audio.addEventListener('loadedmetadata', () => {
                    annotations.forEach(annotation => {
                        const marker = document.createElement('div');
                        marker.className = 'annotation-marker';
                        const percentage = (annotation.time / audio.duration) * 100;
                        marker.style.left = `${percentage}%`;
                        
                        const popup = document.createElement('div');
                        popup.className = 'annotation-popup';
                        popup.innerHTML = `
                            <div class="annotation-time">${formatTime(annotation.time)}</div>
                            <div class="annotation-note">${annotation.note}</div>
                        `;
                        marker.appendChild(popup);
                        
                        // Click to jump to time
                        marker.addEventListener('click', (e) => {
                            e.stopPropagation();
                            audio.currentTime = annotation.time;
                            if (audio.paused) {
                                audio.play();
                                const playBtn = track.querySelector('.play-pause-btn i');
                                if (playBtn) playBtn.className = 'fas fa-pause';
                            }
                        });
                        
                        progressBar.appendChild(marker);
                    });
                });
            }
        }
    });
    
    const musicTracks = document.querySelectorAll('.music-track');
    
    musicTracks.forEach(track => {
        const audio = track.querySelector('.audio-player');
        const playPauseBtn = track.querySelector('.play-pause-btn');
        const playPauseIcon = playPauseBtn?.querySelector('i');
        const progressBar = track.querySelector('.audio-progress-bar');
        const progressFill = track.querySelector('.audio-progress-fill');
        const currentTimeEl = track.querySelector('.current-time');
        const durationEl = track.querySelector('.duration');
        const volumeBtn = track.querySelector('.volume-btn');
        const repeatBtn = track.querySelector('.repeat-btn');
        
        if (!audio || !playPauseBtn) return;
        
        // Format time (sans zéro devant les minutes)
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Synchroniser automatiquement l'icône quand l'audio change d'état
        audio.addEventListener('play', () => {
            if (playPauseIcon) {
                playPauseIcon.className = 'fas fa-pause';
            }
        });
        
        audio.addEventListener('pause', () => {
            if (playPauseIcon) {
                playPauseIcon.className = 'fas fa-play';
            }
        });
        
        // Media Session API pour les contrôles sur écran de verrouillage
        function updateMediaSession() {
            if ('mediaSession' in navigator) {
                const trackTitle = track.querySelector('.track-title')?.textContent || 'Musique';
                
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: trackTitle,
                    artist: 'Romain',
                    album: 'Le meilleur moi - Pour Mélissa',
                    artwork: [
                        { src: 'https://via.placeholder.com/96', sizes: '96x96', type: 'image/png' },
                        { src: 'https://via.placeholder.com/128', sizes: '128x128', type: 'image/png' },
                        { src: 'https://via.placeholder.com/192', sizes: '192x192', type: 'image/png' },
                        { src: 'https://via.placeholder.com/256', sizes: '256x256', type: 'image/png' },
                        { src: 'https://via.placeholder.com/384', sizes: '384x384', type: 'image/png' },
                        { src: 'https://via.placeholder.com/512', sizes: '512x512', type: 'image/png' }
                    ]
                });

                navigator.mediaSession.setActionHandler('play', () => {
                    audio.play();
                });
                
                navigator.mediaSession.setActionHandler('pause', () => {
                    audio.pause();
                });
                
                // Trouver la musique précédente
                navigator.mediaSession.setActionHandler('previoustrack', () => {
                    let prevTrack = track.previousElementSibling;
                    
                    // Si pas trouvé, chercher dans le conteneur précédent
                    if (!prevTrack || !prevTrack.classList.contains('music-track')) {
                        const container = track.closest('.music-player-container');
                        if (container) {
                            const prevContainer = container.previousElementSibling;
                            if (prevContainer && prevContainer.classList.contains('music-player-container')) {
                                prevTrack = prevContainer.querySelector('.music-track');
                            }
                        }
                    }
                    
                    if (prevTrack && prevTrack.classList.contains('music-track')) {
                        const prevBtn = prevTrack.querySelector('.play-pause-btn');
                        if (prevBtn) prevBtn.click();
                    }
                });
                
                // Trouver la musique suivante
                navigator.mediaSession.setActionHandler('nexttrack', () => {
                    let nextTrack = track.nextElementSibling;
                    
                    // Si pas trouvé, chercher dans le conteneur suivant
                    if (!nextTrack || !nextTrack.classList.contains('music-track')) {
                        const container = track.closest('.music-player-container');
                        if (container) {
                            const nextContainer = container.nextElementSibling;
                            if (nextContainer && nextContainer.classList.contains('music-player-container')) {
                                nextTrack = nextContainer.querySelector('.music-track');
                            }
                        }
                    }
                    
                    if (nextTrack && nextTrack.classList.contains('music-track')) {
                        const nextBtn = nextTrack.querySelector('.play-pause-btn');
                        if (nextBtn) nextBtn.click();
                    }
                });
            }
        }
        
        // Play/Pause toggle
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                // Pause all other tracks
                document.querySelectorAll('.audio-player').forEach(otherAudio => {
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                    }
                });
                
                audio.play();
                updateMediaSession(); // Mettre à jour Media Session quand on lance la musique
            } else {
                audio.pause();
            }
        });
        
        // Update duration when loaded
        audio.addEventListener('loadedmetadata', () => {
            if (durationEl) {
                durationEl.textContent = formatTime(audio.duration);
            }
        });
        
        // Update progress bar and time
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
            if (currentTimeEl) {
                currentTimeEl.textContent = formatTime(audio.currentTime);
            }
        });
        
        // Seek functionality - Click direct sur la timeline
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audio.currentTime = percent * audio.duration;
            });
            
            // Variables pour le drag & drop
            let isDragging = false;
            let wasPlaying = false;
            
            // Fonction pour mettre à jour la position
            const updateProgress = (e) => {
                const rect = progressBar.getBoundingClientRect();
                let percent = (e.clientX - rect.left) / rect.width;
                percent = Math.max(0, Math.min(1, percent)); // Limiter entre 0 et 1
                audio.currentTime = percent * audio.duration;
            };
            
            // Fonction pour démarrer le drag (souris et tactile)
            const startDrag = (e) => {
                isDragging = true;
                wasPlaying = !audio.paused;
                
                // Mettre en pause pendant le drag
                if (wasPlaying) {
                    audio.pause();
                }
                
                progressBar.classList.add('dragging');
                progressFill.classList.add('dragging');
                
                // Support tactile
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                updateProgress({ clientX });
                
                e.preventDefault();
            };
            
            // Fonction pour gérer le mouvement
            const onDrag = (e) => {
                if (!isDragging) return;
                
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                updateProgress({ clientX });
                
                e.preventDefault();
            };
            
            // Fonction pour terminer le drag
            const endDrag = (e) => {
                if (!isDragging) return;
                
                isDragging = false;
                progressBar.classList.remove('dragging');
                progressFill.classList.remove('dragging');
                
                // Reprendre la lecture si elle était en cours
                if (wasPlaying) {
                    audio.play();
                }
                
                e.preventDefault();
            };
            
            // Events souris
            progressBar.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', endDrag);
            
            // Events tactiles (mobile)
            progressBar.addEventListener('touchstart', startDrag, { passive: false });
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', endDrag, { passive: false });
        }
        
        // Volume control
        if (volumeBtn) {
            volumeBtn.addEventListener('click', () => {
                if (audio.muted) {
                    audio.muted = false;
                    volumeBtn.querySelector('i').className = 'fas fa-volume-up';
                } else {
                    audio.muted = true;
                    volumeBtn.querySelector('i').className = 'fas fa-volume-mute';
                }
            });
        }
        
        // Repeat control
        if (repeatBtn) {
            repeatBtn.addEventListener('click', () => {
                if (audio.loop) {
                    audio.loop = false;
                    repeatBtn.classList.remove('active');
                } else {
                    audio.loop = true;
                    repeatBtn.classList.add('active');
                }
            });
        }
        
        // When audio ends
        audio.addEventListener('ended', () => {
            // Si le repeat n'est pas activé
            if (!audio.loop) {
                // Pause tous les autres lecteurs
                document.querySelectorAll('.audio-player').forEach(otherAudio => {
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                        const otherTrack = otherAudio.closest('.music-track');
                        if (otherTrack) {
                            const otherIcon = otherTrack.querySelector('.play-pause-btn i');
                            if (otherIcon) otherIcon.className = 'fas fa-play';
                        }
                    }
                });
                
                // AUTO-PLAY next track
                // Chercher d'abord dans la même structure (nextElementSibling direct)
                let nextTrack = track.nextElementSibling;
                
                // Si pas trouvé, chercher dans le conteneur suivant (pour la page d'accueil)
                if (!nextTrack || !nextTrack.classList.contains('music-track')) {
                    const container = track.closest('.music-player-container');
                    if (container) {
                        const nextContainer = container.nextElementSibling;
                        if (nextContainer && nextContainer.classList.contains('music-player-container')) {
                            nextTrack = nextContainer.querySelector('.music-track');
                        }
                    }
                }
                
                // Si on a trouvé une musique suivante
                if (nextTrack && nextTrack.classList.contains('music-track')) {
                    const nextPlayer = nextTrack.querySelector('.audio-player');
                    const nextIcon = nextTrack.querySelector('.play-pause-btn i');
                    if (nextPlayer && nextIcon) {
                        // Scroll to next track (sans smooth pour être plus rapide)
                        nextTrack.scrollIntoView({
                            behavior: 'auto',
                            block: 'center'
                        });
                        
                        // Lancer directement la lecture
                        const playPromise = nextPlayer.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                nextIcon.className = 'fas fa-pause';
                                updateMediaSession();
                            }).catch(error => {
                                console.log('Autoplay bloqué:', error);
                                nextIcon.className = 'fas fa-play';
                            });
                        }
                    }
                } else {
                    // Pas de musique suivante → Revenir à la première musique (mode loop)
                    const allTracks = document.querySelectorAll('.music-track');
                    if (allTracks.length > 0) {
                        const firstTrack = allTracks[0];
                        const firstPlayer = firstTrack.querySelector('.audio-player');
                        const firstIcon = firstTrack.querySelector('.play-pause-btn i');
                        if (firstPlayer && firstIcon) {
                            // Scroll to first track
                            firstTrack.scrollIntoView({
                                behavior: 'auto',
                                block: 'center'
                            });
                            
                            // Lancer directement la lecture
                            const playPromise = firstPlayer.play();
                            if (playPromise !== undefined) {
                                playPromise.then(() => {
                                    firstIcon.className = 'fas fa-pause';
                                    updateMediaSession();
                                }).catch(error => {
                                    console.log('Autoplay bloqué:', error);
                                    firstIcon.className = 'fas fa-play';
                                });
                            }
                        }
                    }
                }
            }
        });
    });
});

// Parallax effect pour le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});



// Message de bienvenue dans la console
console.log('%c🎉 Joyeux Anniversaire Mélissa ! 🎂', 'font-size: 24px; color: #d4a574; font-weight: bold;');
console.log('%cCe site a été créé avec amour par Romain ❤️', 'font-size: 14px; color: #667eea;');