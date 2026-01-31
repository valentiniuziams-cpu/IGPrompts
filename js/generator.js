/* ===================================
   AI Prompt Generator - Main Logic
   =================================== */

// Configuration
const CONFIG = {
    DAILY_LIMIT: 15, // Daily limit for free users
    STORAGE_KEY: 'promptGeneratorUsage',
    PROMPTS_JSON_PATH: 'data/prompts.json'
};

// State
let promptsDatabase = {
    categories: [],
    niches: [],
    tones: [],
    prompts: []
};
let currentUsage = {
    count: 0,
    date: new Date().toDateString()
};
let displayedPromptIds = []; // Track already displayed prompts

// ===================================
// Initialization
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Generator initializing...');
    console.log('⚙️ Config:', CONFIG);

    // Note: Usage tracking disabled - all prompts are free
    // Will be implemented for Custom Generator API in the future
    // initializeUsageTracking();

    loadPromptsData();
    setupEventListeners();
    checkURLParameters();

    console.log('✅ Generator initialized successfully!');
});

// ===================================
// Usage Tracking (Freemium System)
// ===================================

function initializeUsageTracking() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);

    if (stored) {
        currentUsage = JSON.parse(stored);

        // Reset count if it's a new day
        const today = new Date().toDateString();
        if (currentUsage.date !== today) {
            currentUsage = {
                count: 0,
                date: today
            };
            saveUsage();
        }
    }

    updateUsageDisplay();
}

function incrementUsage() {
    currentUsage.count++;
    saveUsage();
    updateUsageDisplay();

    if (currentUsage.count >= CONFIG.DAILY_LIMIT) {
        showLimitReached();
    }
}

function saveUsage() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(currentUsage));
}

function updateUsageDisplay() {
    const remaining = Math.max(0, CONFIG.DAILY_LIMIT - currentUsage.count);
    const remainingElement = document.getElementById('remainingPrompts');
    const totalElement = document.getElementById('totalPrompts');

    if (remainingElement) {
        remainingElement.textContent = remaining;
    }

    if (totalElement) {
        totalElement.textContent = CONFIG.DAILY_LIMIT;
    }

    // Update counter styling based on remaining prompts
    const usageCounter = document.getElementById('usageCounter');
    if (usageCounter) {
        if (remaining <= 0) {
            usageCounter.style.background = 'rgba(239, 68, 68, 0.1)';
            usageCounter.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        } else if (remaining <= 5) {
            usageCounter.style.background = 'rgba(251, 191, 36, 0.1)';
            usageCounter.style.borderColor = 'rgba(251, 191, 36, 0.3)';
        } else {
            usageCounter.style.background = 'var(--bg-light)';
            usageCounter.style.borderColor = 'var(--border-color)';
        }
    }
}

function hasUsageRemaining() {
    return currentUsage.count < CONFIG.DAILY_LIMIT;
}

function showLimitReached() {
    // Note: This function is disabled - all prompts are free
    // Will be re-enabled for Custom Generator API in the future
    console.log('Note: Limit tracking disabled - all prompts are free');

    /*
    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('emptyState').style.display = 'none';
    const limitState = document.getElementById('limitState');
    if (limitState) {
        limitState.style.display = 'flex';

        // Calculate time until reset (midnight)
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const hoursUntilReset = Math.ceil((tomorrow - now) / (1000 * 60 * 60));

        // Update the description with time info
        const description = limitState.querySelector('.limit-description');
        if (description && hoursUntilReset > 0) {
            description.textContent = `You've viewed 15 prompts today. Your limit will reset in approximately ${hoursUntilReset} hour${hoursUntilReset > 1 ? 's' : ''}.`;
        }
    }
    */
}

// ===================================
// Data Loading
// ===================================

async function loadPromptsData() {
    try {
        console.log('🔄 Loading prompts from:', CONFIG.PROMPTS_JSON_PATH);
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch(CONFIG.PROMPTS_JSON_PATH + '?v=' + Date.now());

        if (!response.ok) {
            throw new Error('Failed to load prompts database - Response status: ' + response.status);
        }

        promptsDatabase = await response.json();
        console.log('✅ Prompts database loaded successfully!');
        console.log('📊 Total prompts:', promptsDatabase.prompts.length);
        console.log('📂 Categories:', promptsDatabase.categories.length);
        console.log('🎯 Niches:', promptsDatabase.niches.length);
        console.log('🎨 Tones:', promptsDatabase.tones.length);
    } catch (error) {
        console.error('❌ Error loading prompts:', error);
        showError('Failed to load prompts. Please refresh the page.');
    }
}

function showError(message) {
    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
        emptyState.innerHTML = `
            <div class="empty-icon">⚠️</div>
            <h3 class="empty-title">Error</h3>
            <p class="empty-description">${message}</p>
        `;
    }
}

// ===================================
// Event Listeners
// ===================================

function setupEventListeners() {
    const generateBtn = document.getElementById('generateBtn');
    const categorySelect = document.getElementById('category');
    const nicheSelect = document.getElementById('niche');
    const toneSelect = document.getElementById('tone');

    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerate);
    }

    // Note: generateMoreBtn listener is set in displayPrompts()
    // because the button only exists after results are shown

    // Reset displayed prompts when filters change
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            console.log('🔄 Category changed - resetting displayed prompts');
            displayedPromptIds = [];
        });
    }

    if (nicheSelect) {
        nicheSelect.addEventListener('change', function() {
            console.log('🔄 Niche changed - resetting displayed prompts');
            displayedPromptIds = [];
        });
    }

    if (toneSelect) {
        toneSelect.addEventListener('change', function() {
            console.log('🔄 Tone changed - resetting displayed prompts');
            displayedPromptIds = [];
        });
    }
}

// ===================================
// URL Parameters
// ===================================

function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        const categorySelect = document.getElementById('category');
        if (categorySelect) {
            categorySelect.value = category;
            console.log('✅ Category set from URL:', category);

            // Highlight the category selector to show it's been pre-selected
            categorySelect.style.borderColor = 'var(--primary-color)';
            categorySelect.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';

            // Optional: Auto-generate prompts after a short delay
            // This gives user time to see the selection before results appear
            setTimeout(() => {
                // Reset highlight
                categorySelect.style.borderColor = '';
                categorySelect.style.boxShadow = '';
            }, 2000);
        }
    }
}

// ===================================
// Main Generation Logic
// ===================================

function handleGenerate() {
    console.log('🎯 Generate button clicked!');

    // Note: Usage tracking disabled - all prompts are free
    // This will be re-enabled for Custom Generator API in the future
    /*
    if (!hasUsageRemaining()) {
        console.log('❌ Daily limit reached');
        showLimitReached();
        return;
    }
    */

    // Get selected filters
    const category = document.getElementById('category').value;
    const niche = document.getElementById('niche').value;
    const tone = document.getElementById('tone').value;

    console.log('📋 Selected filters:', { category, niche, tone });

    // Validate selection
    if (!category) {
        console.log('⚠️ No category selected');
        alert('Please select a content category');
        return;
    }

    // Filter prompts with intelligent fallback
    let filterResult = filterPromptsWithFallback(category, niche, tone);
    let filtered = filterResult.prompts;
    console.log('🔍 Filtered prompts:', filtered.length, 'found (before excluding displayed)');

    // Show fallback message if applicable
    if (filterResult.fallbackUsed) {
        console.log('💡 Fallback strategy used:', filterResult.fallbackMessage);
    }

    // Exclude already displayed prompts
    filtered = filtered.filter(p => !displayedPromptIds.includes(p.id));
    console.log('🔍 After excluding displayed:', filtered.length, 'remaining');

    // If no new prompts available, reset and show all again
    if (filtered.length === 0) {
        console.log('🔄 All prompts shown - resetting for this combination');
        displayedPromptIds = []; // Reset displayed prompts
        filterResult = filterPromptsWithFallback(category, niche, tone);
        filtered = filterResult.prompts;

        if (filtered.length === 0) {
            console.log('❌ No prompts match the filters');
            showNoResults();
            return;
        }
    }

    // Randomly select prompts (3 prompts)
    const selectedPrompts = getRandomPrompts(filtered, 3);
    console.log('✨ Selected', selectedPrompts.length, 'prompts to display');

    // Track displayed prompt IDs
    selectedPrompts.forEach(p => displayedPromptIds.push(p.id));
    console.log('📝 Total displayed so far:', displayedPromptIds.length, 'prompts');

    // Display results with fallback message
    displayPrompts(selectedPrompts, filterResult.fallbackMessage);

    // Note: Usage tracking disabled - all prompts are free
    // incrementUsage();

    // Scroll to results on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('resultsContainer').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function filterPromptsWithFallback(category, niche, tone) {
    // STRATEGY: Intelligent fallback system with user messaging
    // Try exact match first, then progressively relax filters
    // NEW: Ensure we always get at least 3 prompts if available

    const MIN_PROMPTS = 3; // Minimum prompts to display

    // 1. Try exact match (category + niche + tone)
    let filtered = promptsDatabase.prompts.filter(prompt => {
        return prompt.category === category &&
               (!niche || prompt.niche === niche) &&
               (!tone || prompt.tone === tone);
    });

    if (filtered.length >= MIN_PROMPTS) {
        console.log('✅ Found exact match:', filtered.length, 'prompts');
        return {
            prompts: filtered,
            fallbackUsed: false,
            fallbackMessage: null
        };
    }

    // If we found some but not enough, note it for user messaging
    const exactMatchCount = filtered.length;

    // 2. Fallback: category + niche (ignore tone)
    if (niche) {
        filtered = promptsDatabase.prompts.filter(prompt => {
            return prompt.category === category && prompt.niche === niche;
        });

        if (filtered.length >= MIN_PROMPTS) {
            console.log('⚡ Fallback to category + niche:', filtered.length, 'prompts');
            return {
                prompts: filtered,
                fallbackUsed: true,
                fallbackMessage: exactMatchCount > 0
                    ? `Found ${exactMatchCount} exact match${exactMatchCount !== 1 ? 'es' : ''}, showing more ${capitalizeFirst(niche)} prompts with different tones`
                    : `Showing prompts for ${capitalizeFirst(niche)} (all tones)`
            };
        }
    }

    // 3. Fallback: category + tone (ignore niche)
    if (tone) {
        filtered = promptsDatabase.prompts.filter(prompt => {
            return prompt.category === category && prompt.tone === tone;
        });

        if (filtered.length >= MIN_PROMPTS) {
            console.log('⚡ Fallback to category + tone:', filtered.length, 'prompts');
            return {
                prompts: filtered,
                fallbackUsed: true,
                fallbackMessage: exactMatchCount > 0
                    ? `Found ${exactMatchCount} exact match${exactMatchCount !== 1 ? 'es' : ''}, showing more ${capitalizeFirst(tone)} prompts from different niches`
                    : `Showing ${capitalizeFirst(tone)} prompts (all niches)`
            };
        }
    }

    // 4. Final fallback: category only (ignore both niche and tone)
    filtered = promptsDatabase.prompts.filter(prompt => {
        return prompt.category === category;
    });

    if (filtered.length > 0) {
        console.log('⚡ Fallback to category only:', filtered.length, 'prompts');
        return {
            prompts: filtered,
            fallbackUsed: true,
            fallbackMessage: exactMatchCount > 0
                ? `Found ${exactMatchCount} exact match${exactMatchCount !== 1 ? 'es' : ''}, showing more prompts from this category`
                : 'Showing all prompts for this category'
        };
    }

    // No prompts found even for category alone
    console.log('❌ No prompts found for category:', category);
    return {
        prompts: [],
        fallbackUsed: false,
        fallbackMessage: null
    };
}

// Helper function for backwards compatibility
function filterPrompts(category, niche, tone) {
    return filterPromptsWithFallback(category, niche, tone).prompts;
}

function getRandomPrompts(prompts, count) {
    const shuffled = [...prompts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, prompts.length));
}

function showNoResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const emptyState = document.getElementById('emptyState');

    resultsContainer.style.display = 'none';
    emptyState.innerHTML = `
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">No Prompts Found</h3>
        <p class="empty-description">Try adjusting your filters. Select a different category or remove niche/tone filters.</p>
    `;
    emptyState.style.display = 'flex';
}

// ===================================
// Display Prompts
// ===================================

function displayPrompts(prompts, fallbackMessage = null) {
    console.log('🎨 Displaying', prompts.length, 'prompts');

    const resultsContainer = document.getElementById('resultsContainer');
    const promptsList = document.getElementById('promptsList');
    const emptyState = document.getElementById('emptyState');

    // Hide other states
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    // Note: limitState removed - no longer needed for free access

    // Show results
    resultsContainer.style.display = 'block';
    console.log('✅ Results container is now visible');

    // Clear previous prompts
    promptsList.innerHTML = '';

    // Add fallback message if applicable
    if (fallbackMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = 'background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; font-size: 0.9375rem; color: #856404;';
        messageDiv.innerHTML = `
            <span style="font-size: 1.25rem;">💡</span>
            <span><strong>Note:</strong> ${fallbackMessage}. Showing the closest matches to your selection.</span>
        `;
        promptsList.appendChild(messageDiv);
    }

    // Create prompt items
    prompts.forEach((prompt, index) => {
        const promptItem = createPromptElement(prompt, index);
        promptsList.appendChild(promptItem);
    });

    // Setup "Show More" button listener (must be done AFTER button exists in DOM)
    const generateMoreBtn = document.getElementById('generateMoreBtn');
    if (generateMoreBtn) {
        // Remove any existing listeners to avoid duplicates
        generateMoreBtn.replaceWith(generateMoreBtn.cloneNode(true));
        const newGenerateMoreBtn = document.getElementById('generateMoreBtn');

        newGenerateMoreBtn.addEventListener('click', handleGenerate);
        console.log('✅ "Show More" button listener attached');
    }

    console.log('✅ Prompts rendered successfully!');
}

function createPromptElement(prompt, index) {
    const div = document.createElement('div');
    div.className = 'prompt-item';

    // Get category name
    const categoryName = getCategoryName(prompt.category);

    div.innerHTML = `
        <div class="prompt-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
                <span style="font-weight: 600; color: var(--primary-color); font-size: 0.875rem;">${categoryName}</span>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <span class="badge niche-badge" style="font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; background: var(--bg-tertiary); color: var(--text-secondary);">${capitalizeFirst(prompt.niche)}</span>
                    <span class="badge tone-badge" style="font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; background: var(--primary-light); color: white;">${capitalizeFirst(prompt.tone)}</span>
                </div>
            </div>
        </div>
        <p class="prompt-text">${prompt.prompt}</p>
        <div class="prompt-footer">
            <div style="font-size: 0.875rem; color: var(--text-secondary);">
                <span style="font-weight: 600;">Works with:</span> ${prompt.use_with.join(', ')}
            </div>
            <button class="btn btn-small btn-primary copy-btn" data-prompt="${escapeHtml(prompt.prompt)}">
                <span class="copy-icon">📋</span> Copy Prompt
            </button>
        </div>
    `;

    // Add copy button listener
    const copyBtn = div.querySelector('.copy-btn');
    copyBtn.addEventListener('click', function() {
        copyToClipboard(prompt.prompt, this);
    });

    return div;
}

function getCategoryName(categoryId) {
    const names = {
        'caption-ideas': 'Caption Ideas',
        'reel-scripts': 'Reel Scripts',
        'hashtag-research': 'Hashtag Research',
        'bio-generator': 'Bio Generator',
        'hook-ideas': 'Hook Ideas',
        'story-ideas': 'Story Ideas',
        'carousel-content': 'Carousel Content',
        'engagement-prompts': 'Engagement Prompts',
        'content-calendar': 'Content Calendar',
        'trend-analysis': 'Trend Analysis'
    };
    return names[categoryId] || categoryId;
}

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Copy to Clipboard
// ===================================

function copyToClipboard(text, button) {
    // Try modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            // Fallback to older method
            fallbackCopy(text, button);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(text, button);
    }
}

function fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy. Please try again or copy manually.');
    }

    document.body.removeChild(textArea);
}

function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span class="copy-icon">✓</span> Copied!';
    button.classList.add('copied');
    button.style.background = 'var(--success)';

    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
        button.style.background = '';
    }, 2000);
}

// ===================================
// Helper Functions
// ===================================

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===================================
// Analytics (Optional)
// ===================================

function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Console log for debugging
    console.log('Event tracked:', eventName, eventData);
}

// Track generation events
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            trackEvent('generate_prompt', {
                category: document.getElementById('category').value,
                niche: document.getElementById('niche').value,
                tone: document.getElementById('tone').value
            });
        });
    }
});

// ===================================
// Export for testing (optional)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterPrompts,
        getRandomPrompts,
        getCategoryName
    };
}
