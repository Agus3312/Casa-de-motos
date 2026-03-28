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

    function closeMenu() {
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            hamburger.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        mainNav.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // ==========================================================================
    // ESTADO HORARIO — Abierto / Cerrado
    // ==========================================================================
    (function () {
        const badge = document.getElementById('estado-horario');
        if (!badge) return;

        // Hora actual en Argentina (UTC-3)
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
        const dia = now.getDay(); // 0=Dom, 1=Lun, ..., 6=Sáb
        const h = now.getHours();
        const m = now.getMinutes();
        const minutos = h * 60 + m;

        const abierto1 = minutos >= 9 * 60 + 30 && minutos < 14 * 60 + 30;  // 9:30 - 14:30
        const abierto2 = minutos >= 16 * 60 + 30 && minutos < 19 * 60 + 30; // 16:30 - 19:30
        const esDiaHabil = dia >= 1 && dia <= 6; // Lun-Sáb

        if (esDiaHabil && (abierto1 || abierto2)) {
            badge.textContent = '● Abierto';
            badge.className = 'abierto';
        } else {
            badge.textContent = '● Cerrado';
            badge.className = 'cerrado';
        }
    })();

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
            clearProps: 'all',
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

    // ==========================================================================
    // GSAP — Testimonials
    // ==========================================================================
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all',
    });
})();
