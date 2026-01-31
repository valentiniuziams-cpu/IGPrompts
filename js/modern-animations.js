/* ===================================
   MODERN ANIMATIONS SYSTEM 2025
   Scroll Animations, Micro-interactions, Smooth Effects
   =================================== */

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-reveal');
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
        console.log(`✅ Observing ${this.elements.length} elements for scroll reveal`);
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// ========================================
// SMOOTH PARALLAX EFFECTS
// ========================================

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        console.log(`✅ Parallax enabled for ${this.elements.length} elements`);
    }

    handleScroll() {
        const scrolled = window.pageYOffset;

        this.elements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ========================================
// NAVBAR SCROLL BEHAVIOR
// ========================================

class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        if (!this.navbar) return;

        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        console.log('✅ Navbar scroll behavior initialized');
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Optional: Hide on scroll down, show on scroll up
        // if (currentScroll > this.lastScroll && currentScroll > 100) {
        //     this.navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     this.navbar.style.transform = 'translateY(0)';
        // }

        this.lastScroll = currentScroll;
    }
}

// ========================================
// SMOOTH HOVER EFFECTS FOR CARDS
// ========================================

class CardHoverEffects {
    constructor() {
        this.cards = document.querySelectorAll('.card, .prompt-card, .category-card, .benefit-card');
        this.init();
    }

    init() {
        if (this.cards.length === 0) return;

        this.cards.forEach(card => {
            card.addEventListener('mousemove', this.handleMouseMove.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        });

        console.log(`✅ Hover effects enabled for ${this.cards.length} cards`);
    }

    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = '';
    }
}

// ========================================
// ANIMATED COUNTERS (for stats)
// ========================================

class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('[data-counter]');
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;

        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });

        console.log(`✅ Animated counters for ${this.counters.length} elements`);
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ========================================
// GRADIENT ANIMATION ON HOVER
// ========================================

class GradientAnimation {
    constructor() {
        this.elements = document.querySelectorAll('[data-gradient-hover]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        this.elements.forEach(element => {
            element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        });

        console.log(`✅ Gradient animations for ${this.elements.length} elements`);
    }

    handleMouseMove(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    }
}

// ========================================
// SMOOTH SCROLL TO ANCHOR LINKS
// ========================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        if (this.links.length === 0) return;

        this.links.forEach(link => {
            link.addEventListener('click', this.handleClick.bind(this));
        });

        console.log(`✅ Smooth scroll for ${this.links.length} anchor links`);
    }

    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ========================================
// CURSOR TRAIL EFFECT (Optional - Premium)
// ========================================

class CursorTrail {
    constructor() {
        this.enabled = document.body.dataset.cursorTrail === 'true';
        if (!this.enabled) return;

        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
        console.log('✅ Cursor trail effect enabled');
    }

    handleMouseMove(e) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.left = e.pageX + 'px';
        dot.style.top = e.pageY + 'px';
        document.body.appendChild(dot);

        this.trail.push(dot);

        setTimeout(() => {
            dot.remove();
            this.trail.shift();
        }, 500);

        if (this.trail.length > this.maxTrail) {
            this.trail[0].remove();
            this.trail.shift();
        }
    }
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');

        if (!this.toggle || !this.menu) return;

        this.init();
    }

    init() {
        this.toggle.addEventListener('click', this.handleToggle.bind(this));
        console.log('✅ Mobile menu initialized');
    }

    handleToggle() {
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
    }
}

// ========================================
// LOADING ANIMATION
// ========================================

class PageLoader {
    constructor() {
        this.loader = document.querySelector('.page-loader');
        if (!this.loader) return;

        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('hidden');
                setTimeout(() => {
                    this.loader.remove();
                }, 300);
            }, 500);
        });

        console.log('✅ Page loader initialized');
    }
}

// ========================================
// INITIALIZE ALL ANIMATIONS
// ========================================

function initModernAnimations() {
    // Core animations
    new ScrollReveal();
    new ParallaxEffect();
    new NavbarScroll();
    new CardHoverEffects();
    new AnimatedCounter();
    new GradientAnimation();
    new SmoothScroll();
    new MobileMenu();
    new PageLoader();

    // Optional premium effect
    // new CursorTrail();

    console.log('🎨 Modern animations system initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModernAnimations);
} else {
    initModernAnimations();
}

// Re-initialize on page show (for back/forward cache)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        console.log('♻️ Page restored from cache, re-initializing animations');
        initModernAnimations();
    }
});

// Export for external use
window.modernAnimations = {
    ScrollReveal,
    ParallaxEffect,
    NavbarScroll,
    CardHoverEffects,
    AnimatedCounter,
    GradientAnimation,
    SmoothScroll,
    CursorTrail,
    MobileMenu,
    PageLoader
};

console.log('📦 Modern animations module loaded');
