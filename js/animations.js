/* ===================================
   Smart Animations & Interactions
   =================================== */

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Auto-add animation classes to common elements
function autoAnimateElements() {
    // Animate category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll', 'fade-in-up', `delay-${Math.min(index, 5) * 100}`);
    });

    // Animate prompt cards
    const promptCards = document.querySelectorAll('.prompt-card');
    promptCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll', 'fade-in-up', `delay-${Math.min(index % 3, 2) * 100}`);
    });

    // Animate steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.add('animate-on-scroll', 'fade-in-up', `delay-${index * 100}`);
    });

    // Animate benefits
    const benefits = document.querySelectorAll('.benefit');
    benefits.forEach((benefit, index) => {
        benefit.classList.add('animate-on-scroll', 'fade-in-up', `delay-${Math.min(index, 5) * 100}`);
    });

    // Animate tools
    const tools = document.querySelectorAll('.tool-card');
    tools.forEach((tool, index) => {
        tool.classList.add('animate-on-scroll', 'scale-in', `delay-${Math.min(index, 5) * 100}`);
    });

    // Animate sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const subtitle = section.querySelector('.section-subtitle');

        if (title) title.classList.add('animate-on-scroll', 'fade-in-up');
        if (subtitle) subtitle.classList.add('animate-on-scroll', 'fade-in-up', 'delay-100');
    });
}

// Reading Progress Bar
function initProgressBar() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;

        progressBar.style.transform = `scaleX(${progress / 100})`;
    });
}

// Enhanced Copy Button Animation
function enhanceCopyButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.copy-btn')) {
            const button = e.target.closest('.copy-btn');

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: 100px;
                height: 100px;
                margin-top: -50px;
                margin-left: -50px;
                animation: ripple 0.6s;
                pointer-events: none;
            `;

            const rect = button.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';

            button.style.position = 'relative';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        });
    }
}

// Intersection Observer for Counting Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateCounter(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Add Ripple Effect to Elements
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    handleNavbarScroll();
    initScrollAnimations();
    autoAnimateElements();
    initProgressBar();

    // Enhanced interactions
    enhanceCopyButtons();
    initSmoothScroll();

    // Optional effects
    // initParallax(); // Uncomment for parallax effect
    // initCounterAnimation(); // Uncomment for counter animations

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.classList.contains('copy-btn')) {
            addRippleEffect(btn);
        }
    });

    console.log('✨ Smart animations initialized');
});

// Re-initialize animations for dynamically loaded content
window.reinitAnimations = function() {
    autoAnimateElements();
    initScrollAnimations();
};
