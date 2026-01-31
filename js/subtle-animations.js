/* ===================================
   SUBTLE SCROLL ANIMATIONS
   Simple fade-in on scroll without libraries
   NOTE: Modern interactions handled by modern-interactions.js
   =================================== */

// Legacy support - kept for backwards compatibility
// Modern animations are now handled by modern-interactions.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if modern-interactions.js is loaded
    const modernInteractionsLoaded = window.modernInteractionsLoaded;

    if (modernInteractionsLoaded) {
        console.log('✨ Subtle animations (legacy mode - modern interactions active)');
        return; // Modern interactions will handle everything
    }

    // Fallback for pages without modern-interactions.js
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    console.log('✨ Subtle animations initialized (fallback mode)');
});
