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

    // "CV" submenu of the desktop menu
    document.querySelectorAll('.nav-dropdown').forEach(initDropdown);

    // Carousels: each .carousel-container holds .carousel-slide items and
    // .prev / .next buttons. Pages without a carousel are left untouched.
    document.querySelectorAll('.carousel-container').forEach(initCarousel);
});

// Disclosure menu: opens on hover (CSS, mouse only), on click/tap and with
// Enter/Space on the button; closes on Escape, on a click outside and when
// keyboard focus leaves it.
function initDropdown(dropdown) {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    function setOpen(open) {
        dropdown.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function(event) {
        event.stopPropagation();
        setOpen(!dropdown.classList.contains('open'));
    });

    dropdown.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && dropdown.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });

    dropdown.addEventListener('focusout', function(event) {
        if (!dropdown.contains(event.relatedTarget)) setOpen(false);
    });

    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) setOpen(false);
    });
}

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
