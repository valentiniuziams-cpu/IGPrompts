/* ===================================
   Advanced Animations JavaScript 2026
   Modern Interactive Effects
   =================================== */

// ========================================
// 1. 3D CARD TILT EFFECT
// ========================================
function init3DCardTilt() {
    const cards = document.querySelectorAll('.prompt-card, .category-card, .tool-card');

    cards.forEach(card => {
        card.classList.add('card-3d');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ========================================
// 2. MAGNETIC BUTTON EFFECT
// ========================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .cta-button');

    buttons.forEach(button => {
        button.classList.add('btn-magnetic');

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic pull effect (within 100px range)
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;

            if (distance < maxDistance) {
                const pull = 1 - (distance / maxDistance);
                const moveX = x * pull * 0.3;
                const moveY = y * pull * 0.3;

                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// ========================================
// 3. GRADIENT TEXT ANIMATION
// ========================================
function initGradientText() {
    // Apply gradient animation to main titles
    const titles = document.querySelectorAll('.hero-title, .page-title');

    titles.forEach(title => {
        // Wrap each word in a span for individual animation
        const words = title.textContent.split(' ');
        title.innerHTML = words.map(word =>
            `<span class="gradient-text" style="display: inline-block; margin-right: 0.3em;">${word}</span>`
        ).join('');
    });
}

// ========================================
// 4. ADVANCED PARALLAX SCROLLING
// ========================================
function initAdvancedParallax() {
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.classList.add('parallax-container');

        // Create parallax layers
        const content = hero.querySelector('.container');
        if (content) {
            content.classList.add('parallax-layer');
        }

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;

            // Only apply parallax while hero is visible
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                const offset = scrolled * parallaxSpeed;

                if (content) {
                    content.style.setProperty('--parallax-offset', `${offset}px`);
                    content.classList.add('parallax-slow');
                }

                // Fade out effect
                const opacity = 1 - (scrolled / heroHeight);
                hero.style.opacity = Math.max(opacity, 0);
            }
        });
    }
}

// ========================================
// 5. BLOB BACKGROUND ANIMATION
// ========================================
function initBlobBackground() {
    // Add decorative blobs to hero section
    const hero = document.querySelector('.hero');

    if (hero && !hero.querySelector('.blob-1')) {
        const blob1 = document.createElement('div');
        blob1.className = 'blob-animate blob-1';
        blob1.style.cssText = `
            position: absolute;
            width: 300px;
            height: 300px;
            top: 10%;
            right: -50px;
            z-index: 0;
            pointer-events: none;
        `;

        const blob2 = document.createElement('div');
        blob2.className = 'blob-animate blob-2';
        blob2.style.cssText = `
            position: absolute;
            width: 250px;
            height: 250px;
            bottom: 10%;
            left: -50px;
            z-index: 0;
            pointer-events: none;
        `;

        hero.style.position = 'relative';
        hero.style.overflow = 'hidden';
        hero.appendChild(blob1);
        hero.appendChild(blob2);

        // Make sure content is above blobs
        const container = hero.querySelector('.container');
        if (container) {
            container.style.position = 'relative';
            container.style.zIndex = '1';
        }
    }
}

// ========================================
// 6. INTERSECTION OBSERVER FOR STAGGER
// ========================================
function initStaggerAnimations() {
    // Group elements for stagger effect
    const categoryGrid = document.querySelector('.category-grid');
    const promptsGrid = document.querySelector('.browse-grid, .prompts-list');
    const benefitsGrid = document.querySelector('.benefits-grid');

    [categoryGrid, promptsGrid, benefitsGrid].forEach(grid => {
        if (grid) {
            grid.classList.add('stagger-group');
        }
    });

    // Observe when stagger groups enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Re-trigger animation
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.stagger-group').forEach(group => {
        observer.observe(group);
    });
}

// ========================================
// 7. SKELETON LOADING (For Dynamic Content)
// ========================================
function showSkeleton(container, count = 3) {
    const skeletons = Array.from({ length: count }, () => `
        <div class="skeleton" style="padding: 1.5rem; border-radius: 12px;">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 80%;"></div>
        </div>
    `).join('');

    container.innerHTML = skeletons;
}

function hideSkeleton(container, content) {
    setTimeout(() => {
        container.innerHTML = content;
    }, 500);
}

// ========================================
// 8. SCROLL-BASED PROGRESS ANIMATION
// ========================================
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');

    if (progressBar) {
        // Add gradient animation
        progressBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe)';
        progressBar.style.backgroundSize = '200% 100%';
        progressBar.style.animation = 'gradientFlow 3s linear infinite';
    }
}

// ========================================
// 9. ELASTIC BOUNCE ON INTERACTION
// ========================================
function initElasticElements() {
    // Add elastic effect to interactive elements
    const elasticElements = document.querySelectorAll(
        '.copy-btn, .tag, .badge'
    );

    elasticElements.forEach(el => {
        el.classList.add('elastic-hover', 'bounce-on-click');
    });
}

// ========================================
// 10. GLASSMORPHISM EFFECTS
// ========================================
function initGlassmorphism() {
    // Apply glass effect to specific sections
    const infoBoxes = document.querySelectorAll('.info-box, .browse-info-box');

    infoBoxes.forEach(box => {
        box.classList.add('glass-card');
    });

    // Add glass border to CTA sections
    const ctaBoxes = document.querySelectorAll('.cta-box');
    ctaBoxes.forEach(box => {
        box.classList.add('glass-border');
    });
}

// ========================================
// 11. SMOOTH REVEAL ON SCROLL
// ========================================
function initSmoothReveal() {
    const revealElements = document.querySelectorAll(
        'section, .cta-section, .how-it-works, .benefits'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        revealObserver.observe(el);
    });
}

// ========================================
// 12. PARTICLE SYSTEM (Lightweight)
// ========================================
function initParticles() {
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) { // Only on desktop
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
        `;

        // Create 10 particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${10 + Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }

        hero.appendChild(particlesContainer);
    }
}

// ========================================
// 13. COPY BUTTON ENHANCED FEEDBACK
// ========================================
function enhanceCopyFeedback() {
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.copy-btn');

        if (copyBtn) {
            // Add success animation
            copyBtn.classList.add('copied');

            // Create success particles
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: #10b981;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particleBurst 0.6s ease-out forwards;
                `;

                const angle = (i / 5) * Math.PI * 2;
                const velocity = 50;
                const x = Math.cos(angle) * velocity;
                const y = Math.sin(angle) * velocity;

                particle.style.setProperty('--x', `${x}px`);
                particle.style.setProperty('--y', `${y}px`);

                copyBtn.appendChild(particle);

                setTimeout(() => particle.remove(), 600);
            }

            // Add burst animation if not exists
            if (!document.getElementById('particle-burst-style')) {
                const style = document.createElement('style');
                style.id = 'particle-burst-style';
                style.textContent = `
                    @keyframes particleBurst {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(var(--x), var(--y)) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            setTimeout(() => {
                copyBtn.classList.remove('copied');
            }, 2000);
        }
    });
}

// ========================================
// 14. MOUSE TRAIL EFFECT
// ========================================
function initMouseTrail() {
    let trails = [];
    const maxTrails = 20;

    document.addEventListener('mousemove', (e) => {
        // Only on desktop and not over interactive elements
        if (window.innerWidth <= 768) return;
        if (e.target.closest('button, a, input, select')) return;

        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            animation: trailFade 0.6s ease-out forwards;
        `;

        document.body.appendChild(trail);
        trails.push(trail);

        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            oldTrail.remove();
        }

        setTimeout(() => {
            trail.remove();
            trails = trails.filter(t => t !== trail);
        }, 600);
    });

    // Add animation
    if (!document.getElementById('trail-fade-style')) {
        const style = document.createElement('style');
        style.id = 'trail-fade-style';
        style.textContent = `
            @keyframes trailFade {
                to {
                    opacity: 0;
                    transform: scale(2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// 15. FLOATING ACTION BUTTON (FAB)
// ========================================
function initFloatingCTA() {
    // Create a floating CTA that appears after scrolling
    const fab = document.createElement('a');
    fab.href = 'generator.html';
    fab.className = 'floating-fab';
    fab.innerHTML = '✨ Get Prompts';
    fab.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        z-index: 999;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        text-decoration: none;
        font-size: 0.9375rem;
    `;

    document.body.appendChild(fab);

    // Show after scrolling 500px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            fab.style.opacity = '1';
            fab.style.transform = 'translateY(0)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'translateY(100px)';
        }
    });

    // Hover effect
    fab.addEventListener('mouseenter', () => {
        fab.style.transform = 'translateY(-4px) scale(1.05)';
        fab.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
    });

    fab.addEventListener('mouseleave', () => {
        fab.style.transform = 'translateY(0) scale(1)';
        fab.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
    });

    // Add pulse animation
    fab.classList.add('pulse-ring');
}

// ========================================
// INITIALIZE ALL ADVANCED ANIMATIONS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Initialize all animations
        init3DCardTilt();
        initMagneticButtons();
        initGradientText();
        initAdvancedParallax();
        initBlobBackground();
        initStaggerAnimations();
        initScrollProgress();
        initElasticElements();
        initGlassmorphism();
        initSmoothReveal();
        initParticles();
        enhanceCopyFeedback();
        // initMouseTrail(); // Optional - uncomment if desired
        initFloatingCTA();

        console.log('🎨 Advanced animations 2026 initialized!');
    } else {
        console.log('⚡ Animations disabled - user prefers reduced motion');
    }
});

// Export for dynamic content
window.advancedAnimations = {
    reinit3DTilt: init3DCardTilt,
    reinitStagger: initStaggerAnimations,
    showSkeleton,
    hideSkeleton
};
