/**
 * Core Portfolio Logic
 * Handles smooth scrolling, custom cursor, and global state.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initCustomCursor();
    initNavigation();
});

function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'power3.out'
        });
    });

    // Expand cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .glass, .magnetic-btn');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: 40,
                height: 40,
                backgroundColor: 'rgba(0, 229, 255, 0.2)',
                borderColor: 'transparent',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
                borderColor: '#00E5FF',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

function initNavigation() {
    const nav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-4', 'bg-deep-black/80', 'backdrop-blur-md', 'border-b', 'border-white/10');
            nav.classList.remove('py-6');
        } else {
            nav.classList.remove('py-4', 'bg-deep-black/80', 'backdrop-blur-md', 'border-b', 'border-white/10');
            nav.classList.add('py-6');
        }
    });

    // Mobile menu trigger
    const menuBtn = document.getElementById('mobile-menu-btn');
    menuBtn.addEventListener('click', () => {
        alert('Mobile menu coming soon in refined version!');
    });
}
