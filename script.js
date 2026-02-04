document.addEventListener('DOMContentLoaded', () => {
    // Variable Declarations
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.querySelector('.back-to-top');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top Visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Mobile Menu
    const closeMenu = document.querySelector('.close-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.add('active');
        // Prevent background scrolling when menu is open
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Portfolio Accordion
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            removeActiveClasses();
            item.classList.add('active');
        });

        // Also handling click for touch devices
        item.addEventListener('click', () => {
            removeActiveClasses();
            item.classList.add('active');
        });
    });

    function removeActiveClasses() {
        portfolioItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.innerHTML = '☰';
                }
            }
        });
    });

    // Back to Top Click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If it's a stat item, trigger the number count
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('h3');
                    if (counter && !counter.classList.contains('counted')) {
                        animateValue(counter, 0, parseInt(counter.getAttribute('data-target')), 2000);
                        counter.classList.add('counted');
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Number Counter Animation Function
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
