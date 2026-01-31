/* ===================================
   MODERN INTERACTIONS & ANIMATIONS
   2025-2026 Web Design Trends
   Performance-optimized with RAF
   =================================== */

(function() {
    'use strict';

    // Signal that modern interactions are loaded
    window.modernInteractionsLoaded = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ===================================
       MAGNETIC BUTTONS
       =================================== */
    function initMagneticButtons() {
        if (prefersReducedMotion) return;

        const magneticButtons = document.querySelectorAll('.btn-primary');

        magneticButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.classList.add('magnetic');
            });

            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Limit movement to max 10px
                const moveX = Math.max(-10, Math.min(10, x * 0.3));
                const moveY = Math.max(-10, Math.min(10, y * 0.3));

                this.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            button.addEventListener('mouseleave', function() {
                this.classList.remove('magnetic');
                this.style.transform = '';
            });
        });
    }

    /* ===================================
       BUTTON RIPPLE EFFECT
       =================================== */
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    /* ===================================
       3D CARD TILT EFFECT
       =================================== */
    function initCardTilt() {
        if (prefersReducedMotion) return;

        const cards = document.querySelectorAll('.category-card, .benefit-card, .prompt-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('tilt-active');
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
                const rotateY = ((x - centerX) / centerX) * 5;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

                // Update glow position
                const mouseX = (x / rect.width) * 100;
                const mouseY = (y / rect.height) * 100;
                this.style.setProperty('--mouse-x', mouseX + '%');
                this.style.setProperty('--mouse-y', mouseY + '%');
            });

            card.addEventListener('mouseleave', function() {
                this.classList.remove('tilt-active');
                this.style.transform = '';
            });
        });
    }

    /* ===================================
       HERO TITLE WORD ANIMATION
       =================================== */
    function initHeroTitleAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle || prefersReducedMotion) return;

        const text = heroTitle.textContent;
        const words = text.split(' ');

        heroTitle.innerHTML = words.map((word, index) =>
            `<span class="hero-title-word" style="animation-delay: ${index * 100}ms">${word}</span>`
        ).join(' ');
    }

    /* ===================================
       STATS COUNTER ANIMATION
       =================================== */
    function animateCounter(element, target, duration = 1500) {
        const start = 0;
        const isPercentage = target.toString().includes('%');
        const numericTarget = parseFloat(target);

        // Check if parsing was successful
        if (isNaN(numericTarget)) {
            element.textContent = target;
            return;
        }

        const increment = numericTarget / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
                element.classList.add('counting');
                setTimeout(() => element.classList.remove('counting'), 500);
            } else {
                if (isPercentage) {
                    element.textContent = Math.floor(current) + '%';
                } else {
                    element.textContent = Math.floor(current);
                }
            }
        }, 16);
    }

    function initStatsCounter() {
        if (prefersReducedMotion) return;

        const stats = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    const target = entry.target.textContent;
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    }

    /* ===================================
       STAGGERED CARD REVEAL
       =================================== */
    function initCardReveal() {
        const cards = document.querySelectorAll('.category-card, .benefit-card, .prompt-card');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => observer.observe(card));
    }

    /* ===================================
       SCROLL PROGRESS INDICATOR
       =================================== */
    function initScrollProgress() {
        // Show on all pages
        const progressBar = document.createElement('div');
        progressBar.classList.add('reading-progress');
        document.body.appendChild(progressBar);

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (window.pageYOffset / windowHeight) * 100;
                    progressBar.style.width = scrolled + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ===================================
       GRADIENT TEXT ANIMATION
       =================================== */
    function initGradientText() {
        if (prefersReducedMotion) return;

        const sectionTitles = document.querySelectorAll('.section-title');
        // Apply to every other title for variety
        sectionTitles.forEach((title, index) => {
            if (index % 2 === 0) {
                title.classList.add('gradient-text');
            }
        });
    }

    /* ===================================
       CURSOR TRAIL EFFECT (Hero Only)
       =================================== */
    function initCursorTrail() {
        if (prefersReducedMotion) return;

        const hero = document.querySelector('.hero');
        if (!hero) return;

        let lastTime = 0;
        const throttleDelay = 50; // Only create trail every 50ms

        hero.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTime < throttleDelay) return;
            lastTime = now;

            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';

            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 600);
        });
    }

    /* ===================================
       PARALLAX HERO EFFECT
       =================================== */
    function initParallaxHero() {
        if (prefersReducedMotion) return;

        const hero = document.querySelector('.hero');
        if (!hero) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallaxSpeed = 0.3;
                    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ===================================
       ENHANCED STEP HOVER
       =================================== */
    function initStepAnimations() {
        const steps = document.querySelectorAll('.step');

        steps.forEach(step => {
            step.addEventListener('mouseenter', function() {
                this.querySelector('.step-number').style.transform = 'scale(1.15) rotate(5deg)';
            });

            step.addEventListener('mouseleave', function() {
                this.querySelector('.step-number').style.transform = '';
            });
        });
    }

    /* ===================================
       GLOW PULSE ON PRIMARY CTA
       =================================== */
    function initGlowPulse() {
        if (prefersReducedMotion) return;

        // Add pulse glow to hero CTA buttons only
        const heroCTAs = document.querySelectorAll('.hero-cta .btn-primary');
        heroCTAs.forEach(btn => {
            btn.classList.add('pulse-glow');
        });
    }

    /* ===================================
       SCROLL REVEAL FOR SECTIONS
       =================================== */
    function initScrollReveal() {
        const sections = document.querySelectorAll('section');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            // Check if section is already visible on page load
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                // Section is already visible, show it immediately
                section.classList.add('scroll-reveal', 'revealed');
            } else {
                // Section is below the fold, animate on scroll
                section.classList.add('scroll-reveal');
                observer.observe(section);
            }
        });
    }

    /* ===================================
       ENHANCED NAVBAR SCROLL
       =================================== */
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.pageYOffset > 100) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* ===================================
       PERFORMANCE OPTIMIZATION
       =================================== */
    function optimizeForPerformance() {
        // Add will-change to elements that will animate
        const animatedElements = document.querySelectorAll('.btn-primary, .category-card, .benefit-card');

        // Only add will-change when hovering
        animatedElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform';
            }, { passive: true });

            el.addEventListener('mouseleave', function() {
                this.style.willChange = 'auto';
            }, { passive: true });
        });
    }

    /* ===================================
       WOW FLOATING ACTION BUTTON (FAB)
       =================================== */
    function initFAB() {
        const fab = document.querySelector('.wow-fab-container');
        if (!fab) return;

        let lastScroll = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;

                    // Hide FAB when scrolling down past 400px, show when scrolling up
                    if (currentScroll > 400) {
                        if (currentScroll > lastScroll) {
                            // Scrolling down
                            fab.style.transform = 'translateX(400px)';
                            fab.style.opacity = '0';
                        } else {
                            // Scrolling up
                            fab.style.transform = 'translateX(0)';
                            fab.style.opacity = '1';
                        }
                    } else {
                        // Near top, always show
                        fab.style.transform = 'translateX(0)';
                        fab.style.opacity = '1';
                    }

                    lastScroll = currentScroll;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Add enhanced click animation
        const fabButton = fab.querySelector('.wow-fab-button');
        if (fabButton) {
            fabButton.addEventListener('click', () => {
                // Create explosion effect on click
                for (let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'fixed';
                    particle.style.width = '8px';
                    particle.style.height = '8px';
                    particle.style.background = 'linear-gradient(135deg, #667eea, #f093fb)';
                    particle.style.borderRadius = '50%';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '9999';

                    const rect = fabButton.getBoundingClientRect();
                    particle.style.left = rect.left + rect.width / 2 + 'px';
                    particle.style.top = rect.top + rect.height / 2 + 'px';

                    document.body.appendChild(particle);

                    const angle = (Math.PI * 2 * i) / 8;
                    const velocity = 100;
                    const vx = Math.cos(angle) * velocity;
                    const vy = Math.sin(angle) * velocity;

                    let x = 0, y = 0, opacity = 1;
                    const animate = () => {
                        x += vx * 0.016;
                        y += vy * 0.016;
                        opacity -= 0.02;

                        particle.style.transform = `translate(${x}px, ${y}px)`;
                        particle.style.opacity = opacity;

                        if (opacity > 0) {
                            requestAnimationFrame(animate);
                        } else {
                            particle.remove();
                        }
                    };
                    animate();
                }
            });
        }
    }

    /* ===================================
       INITIALIZE ALL ANIMATIONS
       =================================== */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all interactions
        console.log('🎨 Initializing modern interactions...');

        // Phase 1: Micro-interactions
        initMagneticButtons();
        initRippleEffect();
        initCardTilt();

        // Phase 2: Text & Typography
        initHeroTitleAnimation();
        initStatsCounter();
        initGradientText();

        // Phase 3: Scroll Animations
        initCardReveal();
        initScrollProgress();
        initParallaxHero();
        initScrollReveal();

        // Phase 4: Interactive Elements
        initCursorTrail();
        initStepAnimations();
        initGlowPulse();
        initFAB();

        // Phase 5: Enhanced Features
        initNavbarScroll();
        optimizeForPerformance();

        console.log('✨ Modern interactions initialized successfully!');
    }

    // Start initialization
    init();

})();
