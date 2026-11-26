document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
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
    }

    // Carousels: each .carousel-container holds .carousel-slide items and
    // .prev / .next buttons. Pages without a carousel are left untouched.
    document.querySelectorAll('.carousel-container').forEach(initCarousel);
});

function initCarousel(container) {
    const slides = container.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    let slideIndex = 0;

    function showSlide(n) {
        slideIndex = (n + slides.length) % slides.length;
        slides.forEach(function(slide, i) {
            slide.style.display = (i === slideIndex) ? 'block' : 'none';
        });
    }

    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');
    if (prev) prev.addEventListener('click', function() { showSlide(slideIndex - 1); });
    if (next) next.addEventListener('click', function() { showSlide(slideIndex + 1); });

    showSlide(0);
}
