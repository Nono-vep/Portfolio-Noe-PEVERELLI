document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
});

/* =========================================
   AJOUTS PERSONNALISÉS (Diaporama & Animation)
   ========================================= */

/* --- 1. Animation Oscilloscope (PWM) --- */
.scope-container {
  width: 100%;
  height: 60px; /* Hauteur de la zone d'animation */
  background-color: transparent; 
  position: absolute; /* Pour se superposer ou se placer dans le header */
  bottom: 100px; /* Ajuste cette valeur pour monter/descendre l'anim dans la section Accueil */
  left: 0;
  overflow: hidden;
  opacity: 0.8;
  z-index: 0; /* Derrière le texte si possible */
}

.scope-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 200%;
  height: 3px;
  background: transparent;
  /* Création du signal carré vert fluo */
  background-image: linear-gradient(90deg, 
      var(--first-color) 0%, var(--first-color) 50%, 
      transparent 50%, transparent 100%
  );
  background-size: 100px 100%; 
  box-shadow: 0 0 8px var(--first-color); /* Lueur utilisant ta couleur principale */
  animation: signalMove 1.5s linear infinite;
}

@keyframes signalMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100px); }
}

/* --- 2. Diaporama (Carrousel) --- */
.carousel-container {
  position: relative;
  max-width: 100%;
  margin: auto;
  overflow: hidden;
  border-radius: 1rem; /* Pour garder le style arrondi de tes images */
}

.carousel-slide {
  display: none;
}

.carousel-slide img {
  width: 100%;
  border-radius: 1rem;
}

/* Les flèches suivant/précédent */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 10px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.3s;
  background-color: rgba(0,0,0,0.3);
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover, .next:hover {
  background-color: var(--first-color); /* Devient ta couleur principale au survol */
}

/* Utile pour forcer l'affichage de la première slide par défaut si JS plante */
.carousel-slide:first-child {
  display: block; 
}
