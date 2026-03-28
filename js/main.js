(function () {
    'use strict';

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================================================
    // HEADER — Glassmorphism on scroll
    // ==========================================================================
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ==========================================================================
    // ACTIVE NAV LINK — Intersection Observer
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -60% 0px' }
    );

    sections.forEach((section) => navObserver.observe(section));

    // ==========================================================================
    // MOBILE MENU
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        // Close menu when clicking a link
        mainNav.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mainNav.classList.remove('open');
            });
        });
    }

    // ==========================================================================
    // GSAP — Register ScrollTrigger
    // ==========================================================================
    gsap.registerPlugin(ScrollTrigger);

    // Skip all GSAP animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    // ==========================================================================
    // GSAP — Hero entrance animation
    // ==========================================================================
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .from('.hero-subtitle', {
            opacity: 0,
            y: -30,
            duration: 0.6,
        })
        .from(
            '.hero-title',
            {
                opacity: 0,
                y: 50,
                duration: 0.6,
            },
            '-=0.3'
        )
        .from(
            '.hero-description',
            {
                opacity: 0,
                y: 30,
                duration: 0.5,
            },
            '-=0.2'
        )
        .from(
            '.hero-buttons',
            {
                opacity: 0,
                y: 30,
                duration: 0.5,
            },
            '-=0.2'
        );

    // ==========================================================================
    // GSAP — Hero parallax
    // ==========================================================================
    gsap.to('.hero-section', {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });

    // ==========================================================================
    // GSAP — Services bento grid
    // ==========================================================================
    gsap.from('.services-section .section-heading', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
    });

    gsap.from('.bento-card', {
        scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
    });

    // ==========================================================================
    // GSAP — Catalog cards
    // ==========================================================================
    gsap.from('.catalog-section .section-title', {
        scrollTrigger: {
            trigger: '.catalog-section',
            start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
    });

    // Only animate cards on desktop (mobile has carousel)
    if (window.innerWidth >= 768) {
        gsap.from('.catalog-card', {
            scrollTrigger: {
                trigger: '.catalog-grid',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
        });
    }

    // ==========================================================================
    // GSAP — Contact section
    // ==========================================================================
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 0.6,
        ease: 'power3.out',
    });

    gsap.from('.contact-map', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        duration: 0.6,
        ease: 'power3.out',
    });
})();
