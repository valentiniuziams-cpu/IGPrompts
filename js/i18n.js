/* ===================================
   i18next Configuration
   Professional Multilingual Solution
   =================================== */

// Language configurations
const languages = {
    en: { name: 'EN', nativeName: 'English', flag: 'EN' },
    ro: { name: 'RO', nativeName: 'Română', flag: 'RO' },
    es: { name: 'ES', nativeName: 'Español', flag: 'ES' },
    fr: { name: 'FR', nativeName: 'Français', flag: 'FR' },
    de: { name: 'DE', nativeName: 'Deutsch', flag: 'DE' }
};

// Initialize i18next
async function initializeI18n() {
    try {
        // Load translations - try multiple paths
        let translationsResponse;

        try {
            // Try root-relative path first (for pages in root like index.html)
            translationsResponse = await fetch('js/translations.json');
            console.log('✅ Loaded translations from: js/translations.json');
        } catch (e) {
            // Try parent-relative path (for pages in subdirectories like blog/)
            translationsResponse = await fetch('../js/translations.json');
            console.log('✅ Loaded translations from: ../js/translations.json');
        }

        if (!translationsResponse.ok) {
            throw new Error(`Failed to load translations: ${translationsResponse.status}`);
        }

        const translations = await translationsResponse.json();

        // Initialize i18next
        await i18next
            .use(i18nextBrowserLanguageDetector)
            .init({
                debug: false,
                fallbackLng: 'en',
                supportedLngs: ['en', 'ro', 'es', 'fr', 'de'],
                load: 'languageOnly',

                // Detection options
                detection: {
                    order: ['localStorage', 'navigator'],
                    caches: ['localStorage'],
                    lookupLocalStorage: 'i18nextLng'
                },

                // Resources
                resources: Object.keys(translations).reduce((acc, lang) => {
                    acc[lang] = { translation: translations[lang] };
                    return acc;
                }, {}),

                // Interpolation
                interpolation: {
                    escapeValue: false
                },

                // React options (not needed but good practice)
                react: {
                    useSuspense: false
                }
            });

        console.log('✅ i18next initialized successfully');
        console.log('🌍 Current language:', i18next.language);

        // Apply translations to page
        translatePage();

        // Create language selector
        createLanguageSelector();

        // Listen for language changes
        i18next.on('languageChanged', (lng) => {
            console.log('🌍 Language changed to:', lng);
            translatePage();
            updateLanguageSelector();
            document.documentElement.setAttribute('lang', lng);
        });

    } catch (error) {
        console.error('❌ Failed to initialize i18next:', error);
        console.error('Error details:', error.message, error.stack);

        // Still create a basic language selector even if translations fail
        createLanguageSelector();
    }
}

// Translate all elements on the page
function translatePage() {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = i18next.t(key);

        if (translation && translation !== key) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                // Check for emoji prefix
                const emoji = element.getAttribute('data-emoji');
                // Check for suffix
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

    console.log('✅ Page translated to:', i18next.language);
}

// Create language selector UI
function createLanguageSelector() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) {
        console.warn('⚠️ Navigation menu not found');
        return;
    }

    // Check if already exists
    if (document.querySelector('.language-selector')) {
        console.log('⚠️ Language selector already exists');
        return;
    }

    const currentLang = i18next.language.split('-')[0]; // Handle 'en-US' -> 'en'
    const currentLangData = languages[currentLang] || languages.en;

    // Create container
    const container = document.createElement('div');
    container.className = 'language-selector';

    // Create toggle button
    const toggle = document.createElement('button');
    toggle.className = 'language-toggle';
    toggle.setAttribute('aria-label', 'Select language');
    toggle.setAttribute('title', 'Change Language');
    toggle.innerHTML = `
        <span class="flag-icon">${currentLangData.flag}</span>
        <span class="arrow-icon">▼</span>
    `;

    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';

    // Add language options
    Object.entries(languages).forEach(([code, lang]) => {
        const option = document.createElement('button');
        option.className = 'language-option';
        option.setAttribute('data-lang', code);
        if (code === currentLang) option.classList.add('active');

        option.innerHTML = `
            <span class="flag-icon">${lang.flag}</span>
            <div class="lang-details">
                <div class="lang-native">${lang.nativeName}</div>
            </div>
            <span class="check-icon">✓</span>
        `;

        option.addEventListener('click', async (e) => {
            e.stopPropagation();
            await i18next.changeLanguage(code);
            dropdown.classList.remove('active');
            toggle.classList.remove('active');
        });

        dropdown.appendChild(option);
    });

    // Toggle dropdown
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
        toggle.classList.remove('active');
    });

    container.appendChild(toggle);
    container.appendChild(dropdown);

    // Add to nav menu - append at the end (right side)
    navMenu.appendChild(container);
    console.log('✅ Language selector created');
}

// Update language selector UI
function updateLanguageSelector() {
    const currentLang = i18next.language.split('-')[0];
    const currentLangData = languages[currentLang] || languages.en;

    // Update toggle button
    const toggle = document.querySelector('.language-toggle');
    if (toggle) {
        const flagIcon = toggle.querySelector('.flag-icon');
        if (flagIcon) flagIcon.textContent = currentLangData.flag;
    }

    // Update active option
    document.querySelectorAll('.language-option').forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Helper function to change language programmatically
window.changeLanguage = async function(lang) {
    await i18next.changeLanguage(lang);
};

// Helper to get current language
window.getCurrentLanguage = function() {
    return i18next.language.split('-')[0];
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeI18n);
} else {
    initializeI18n();
}

// Re-translate when navigating back/forward
window.addEventListener('pageshow', (event) => {
    if (event.persisted && window.i18next && i18next.isInitialized) {
        translatePage();
    }
});

console.log('📦 i18n module loaded');
