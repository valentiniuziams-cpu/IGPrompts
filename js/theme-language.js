/* ===================================
   Language Switcher - Modern & Compact
   No Dark Mode - Fixed Modern Design
   =================================== */

// ========================================
// LANGUAGE MANAGEMENT
// ========================================

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = null;
        this.languages = {
            en: { name: 'EN', native: 'English', flag: '🇬🇧' },
            ro: { name: 'RO', native: 'Română', flag: '🇷🇴' },
            es: { name: 'ES', native: 'Español', flag: '🇪🇸' },
            fr: { name: 'FR', native: 'Français', flag: '🇫🇷' },
            de: { name: 'DE', native: 'Deutsch', flag: '🇩🇪' }
        };
        this.loadTranslations();
        console.log('✅ Language Manager initialized:', this.currentLang);
    }

    async loadTranslations() {
        try {
            const response = await fetch('js/translations.json');
            if (!response.ok) {
                // Try with ../ for blog pages
                const response2 = await fetch('../js/translations.json');
                if (response2.ok) {
                    this.translations = await response2.json();
                } else {
                    throw new Error('Translations not found');
                }
            } else {
                this.translations = await response.json();
            }
            console.log('✅ Translations loaded');
            this.applyLanguage();
        } catch (error) {
            console.warn('⚠️ Translations not loaded:', error);
        }
    }

    setLanguage(lang) {
        if (!this.languages[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);
        this.updateLanguageButton();
        this.applyLanguage();
        console.log('🌍 Language changed to:', lang);
    }

    applyLanguage() {
        if (!this.translations || !this.translations[this.currentLang]) {
            console.warn('⚠️ No translations for:', this.currentLang);
            return;
        }

        const trans = this.translations[this.currentLang];

        // Apply translations to elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(trans, key);

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    // Check if element has emoji attribute
                    const emoji = element.getAttribute('data-emoji');
                    // Check if element has suffix attribute (for dropdown options with counts)
                    const suffix = element.getAttribute('data-i18n-suffix');

                    if (emoji) {
                        element.textContent = emoji + ' ' + translation;
                    } else if (suffix) {
                        element.textContent = translation + suffix;
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });

        console.log('✅ Translations applied for:', this.currentLang);
    }

    getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    updateLanguageButton() {
        const langToggle = document.querySelector('.language-toggle');
        if (langToggle) {
            const currentLangData = this.languages[this.currentLang];
            const flagIcon = langToggle.querySelector('.flag-icon');

            if (flagIcon) flagIcon.textContent = currentLangData.flag;
        }

        document.querySelectorAll('.language-option').forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    createLanguageToggle() {
        const currentLangData = this.languages[this.currentLang];

        const container = document.createElement('div');
        container.className = 'language-selector';
        container.style.position = 'relative';

        const toggle = document.createElement('button');
        toggle.className = 'language-toggle';
        toggle.setAttribute('aria-label', 'Select language');
        toggle.setAttribute('title', 'Change Language');
        toggle.innerHTML = `
            <span class="flag-icon">${currentLangData.flag}</span>
            <span class="arrow-icon">▼</span>
        `;

        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';

        Object.entries(this.languages).forEach(([code, lang]) => {
            const option = document.createElement('button');
            option.className = 'language-option';
            option.setAttribute('data-lang', code);
            if (code === this.currentLang) option.classList.add('active');

            option.innerHTML = `
                <span class="flag-icon">${lang.flag}</span>
                <div class="lang-details">
                    <div class="lang-native">${lang.native}</div>
                </div>
                <span class="check-icon">✓</span>
            `;

            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.setLanguage(code);
                dropdown.classList.remove('active');
                toggle.classList.remove('active');
            });

            dropdown.appendChild(option);
        });

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
            toggle.classList.remove('active');
        });

        container.appendChild(toggle);
        container.appendChild(dropdown);

        return container;
    }
}

// ========================================
// INITIALIZE - IMMEDIATE EXECUTION
// ========================================

let languageManager;

function addControlsToNavbar() {
    console.log('🔧 Adding language selector to navbar...');

    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) {
        console.error('❌ .nav-menu not found!');
        return false;
    }

    // Check if controls already exist
    if (navMenu.querySelector('.nav-controls')) {
        console.log('⚠️ Controls already exist');
        return true;
    }

    try {
        // Initialize language manager
        languageManager = new LanguageManager();

        // Create controls container
        const navControls = document.createElement('div');
        navControls.className = 'nav-controls';

        // Add language toggle
        const languageToggle = languageManager.createLanguageToggle();
        navControls.appendChild(languageToggle);

        // Find where to insert (before "Get Prompts Free" button)
        const allLinks = Array.from(navMenu.children);
        let insertIndex = allLinks.length;

        for (let i = 0; i < allLinks.length; i++) {
            if (allLinks[i].classList.contains('btn') ||
                allLinks[i].classList.contains('btn-primary') ||
                allLinks[i].textContent.includes('Get Prompts')) {
                insertIndex = i;
                break;
            }
        }

        if (insertIndex < allLinks.length) {
            navMenu.insertBefore(navControls, allLinks[insertIndex]);
        } else {
            navMenu.appendChild(navControls);
        }

        console.log('✅ Language selector added successfully!');
        return true;
    } catch (error) {
        console.error('❌ Error adding controls:', error);
        return false;
    }
}

// Try multiple times to add controls
function initializeWithRetry() {
    let attempts = 0;
    const maxAttempts = 5;

    function tryInit() {
        attempts++;
        console.log(`Attempt ${attempts}/${maxAttempts} to add language selector...`);

        if (addControlsToNavbar()) {
            console.log('✅ Language system initialized!');
            return;
        }

        if (attempts < maxAttempts) {
            setTimeout(tryInit, 200);
        } else {
            console.error('❌ Failed to add controls after', maxAttempts, 'attempts');
        }
    }

    tryInit();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWithRetry);
} else {
    initializeWithRetry();
}

// Export for global access
window.languageManager = languageManager;

// Export translations and current language for use in other scripts
Object.defineProperty(window, 'translations', {
    get() { return languageManager?.translations; }
});

Object.defineProperty(window, 'currentLanguage', {
    get() { return languageManager?.currentLang; }
});
