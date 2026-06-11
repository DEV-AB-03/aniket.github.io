/**
 * GSAP Orchestration Engine
 * Handles scroll-triggered animations, text reveals, and micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    initHeroAnimations();
    initBentoAnimations();
    initAwardsAnimations();
    initTimelineAnimations();
    initSkillsAnimations();
    initCertsAnimations();
    initProjectAnimations();
    initConnectAnimations();
    initMagneticButtons();

    // Safety net: after 2.5s, force-show any element that GSAP left invisible
    // (fires if a ScrollTrigger never triggered due to viewport/timing issues)
    setTimeout(() => {
        document.querySelectorAll('.glass, [id$="-title"]').forEach(el => {
            if (parseFloat(getComputedStyle(el).opacity) < 0.1) {
                gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, skewY: 0 });
            }
        });
        ScrollTrigger.refresh();
    }, 2500);
});

function initHeroAnimations() {
    const tl = gsap.timeline();

    tl.from('#hero-name', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        skewY: 7,
    })
        .from('#hero-title', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        }, "-=0.5")
        .from('.magnetic-btn', {
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            duration: 0.5,
            ease: 'back.out(1.7)',
        }, "-=0.3");
}

function initBentoAnimations() {
    const cards = document.querySelectorAll('#about .glass');
    gsap.from(cards, {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 95%',
            toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
    });

    const stats = document.querySelectorAll('[data-target]');
    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';

        let obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2,
            scrollTrigger: {
                trigger: stat,
                start: 'top 95%',
            },
            onUpdate: () => {
                const formatted = target % 1 === 0 ? Math.floor(obj.val) : obj.val.toFixed(1);
                stat.innerText = formatted + suffix;
            }
        });
    });
}

function initAwardsAnimations() {
    gsap.fromTo('#awards-title',
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#awards',
                start: 'top 95%',
                toggleActions: 'play none none none',
            },
        }
    );

    const awards = document.querySelectorAll('#awards .glass');
    gsap.fromTo(awards,
        { scale: 0.8, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#awards',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        }
    );
}

function initTimelineAnimations() {
    gsap.to('#timeline-progress', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#experience',
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: true,
        }
    });

    const expCards = document.querySelectorAll('#experience .glass');
    expCards.forEach((card, i) => {
        const isRight = i % 2 === 0;
        gsap.fromTo(card,
            { x: isRight ? -50 : 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
}

function initSkillsAnimations() {
    gsap.fromTo('#skills-title',
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 95%',
                toggleActions: 'play none none none',
            },
        }
    );

    const skillGroups = document.querySelectorAll('#skills .glass');
    gsap.fromTo(skillGroups,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        }
    );
}

function initCertsAnimations() {
    gsap.fromTo('#certs-title',
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#certs',
                start: 'top 95%',
                toggleActions: 'play none none none',
            },
        }
    );

    gsap.fromTo('#certs .glass',
        { scale: 0.9, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#certs',
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        }
    );
}

function initProjectAnimations() {
    gsap.fromTo('#projects-title',
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 95%',
                toggleActions: 'play none none none',
            },
        }
    );

    const projects = document.querySelectorAll('[data-project]');
    projects.forEach(proj => {
        proj.addEventListener('mousemove', (e) => {
            const rect = proj.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * -20;
            gsap.to(proj, {
                rotateX: -yPercent,
                rotateY: xPercent,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });
        proj.addEventListener('mouseleave', () => {
            gsap.to(proj, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

function initConnectAnimations() {
    gsap.fromTo('#contact-title',
        { scale: 0.8, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 95%',
                toggleActions: 'play none none none',
            },
        }
    );
}

function initMagneticButtons() {
    const btns = document.querySelectorAll('.magnetic-btn');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}c