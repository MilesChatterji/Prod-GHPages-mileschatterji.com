// Main JavaScript for Jekyll Site

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme switcher
    new ThemeSwitcher();
    
    // Initialize sound manager
    window.soundManager = new SoundManager();
    
    // Initialize typewriter animation
    initializeTypewriterAnimation();
});

function initializeSite() {
    // Add loading animation to page
    document.body.classList.add('loaded');
    
    // Initialize tooltips for social links
    initializeTooltips();
    
    // Add copy functionality for code blocks
    initializeCodeCopy();
    
    // Initialize search functionality
    initializeSearch();
}

function initializePageTransitions() {
    // Add page transition effects
    const links = document.querySelectorAll('a[href^="/"], a[href^="http"]');
    
    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                // Don't intercept if it's a download or external link
                if (link.hasAttribute('download') || 
                    link.target === '_blank' || 
                    link.rel === 'external') {
                    return;
                }
                
                e.preventDefault();
                
                // Add loading state
                document.body.classList.add('page-loading');
                
                // Navigate to the new page
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        }
    });
}

function initializeLazyLoading() {
    // Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function initializeScrollEffects() {
    // Add scroll-based animations
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function initializeTooltips() {
    // Simple tooltip system for social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = link.getAttribute('aria-label');
        
        link.addEventListener('mouseenter', function() {
            document.body.appendChild(tooltip);
            
            const rect = link.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = rect.top - 40 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.opacity = '1';
        });
        
        link.addEventListener('mouseleave', function() {
            tooltip.remove();
        });
    });
}

function initializeCodeCopy() {
    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        copyButton.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                copyButton.textContent = 'Failed';
            }
        });
    });
}

function initializeSearch() {
    // Simple search functionality for portfolio items
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        portfolioItems.forEach(item => {
            const title = item.querySelector('.portfolio-title')?.textContent.toLowerCase() || '';
            const content = item.querySelector('.portfolio-content')?.textContent.toLowerCase() || '';
            const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(query) || 
                           content.includes(query) || 
                           tags.some(tag => tag.includes(query));
            
            item.style.display = matches ? 'block' : 'none';
        });
    });
}

// Typewriter Animation Function
function typewriterEffect(element, text, speed = 100, callback = null) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            
            // Play typewriter sound for each character
            if (window.soundManager) {
                window.soundManager.playTypewriterSound();
            }
            
            i++;
            setTimeout(typeChar, speed);
        } else {
            if (callback) callback();
        }
    }
    
    typeChar();
}

// Initialize Typewriter Animation
function initializeTypewriterAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const pageTitle = document.querySelector('.page-title');

    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        // Start with hero title
        typewriterEffect(heroTitle, titleText, 100, () => {
            // After hero title completes, start subtitle
            setTimeout(() => {
                typewriterEffect(heroSubtitle, subtitleText, 100, () => {
                    // After hero subtitle, animate page title if present
                    if (pageTitle) {
                        const pageTitleText = pageTitle.textContent;
                        typewriterEffect(pageTitle, pageTitleText, 100);
                    }
                });
            }, 500);
        });
    } else if (pageTitle) {
        // If no hero elements, animate page title directly
        const pageTitleText = pageTitle.textContent;
        typewriterEffect(pageTitle, pageTitleText, 100);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Theme Switcher Functionality
class ThemeSwitcher {
    constructor() {
        this.themeSwitcher = document.querySelector('.theme-switcher');
        this.themeOptions = document.querySelectorAll('.theme-option');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listeners
        this.themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.setTheme(theme);
            });
        });
        
        // Add keyboard navigation
        this.themeSwitcher.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const activeOption = this.themeSwitcher.querySelector('.theme-option:focus');
                if (activeOption) {
                    const theme = activeOption.dataset.theme;
                    this.setTheme(theme);
                }
            }
        });
    }
    
    setTheme(theme) {
        // Update data attribute on body
        document.body.setAttribute('data-theme', theme);
        
        // Update active state on buttons
        this.themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === theme) {
                option.classList.add('active');
            }
        });
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        
        // Update theme switcher background to match current theme
        this.updateThemeSwitcherStyle();
    }
    
    updateThemeSwitcherStyle() {
        // Update theme switcher background and border to match current theme
        const computedStyle = getComputedStyle(document.documentElement);
        this.themeSwitcher.style.background = computedStyle.getPropertyValue('--bg-secondary');
        this.themeSwitcher.style.borderColor = computedStyle.getPropertyValue('--border-color');
        this.themeSwitcher.style.boxShadow = `0 2px 8px ${computedStyle.getPropertyValue('--shadow-color')}`;
    }
}

// Sound Manager for Typewriter Effects
class SoundManager {
    constructor() {
        this.soundEnabled = localStorage.getItem('sound') !== 'off';
        this.audioContext = null;
        this.fallbackAudio = null;
        this.soundToggle = document.querySelector('.sound-toggle');
        this.soundOptions = document.querySelectorAll('.sound-option');
        
        this.init();
    }
    
    init() {
        // Set initial sound state
        this.updateSoundState();
        
        // Add event listeners
        this.soundOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const soundState = e.currentTarget.dataset.sound;
                this.setSoundState(soundState === 'on');
            });
        });
        
        // Add keyboard navigation
        this.soundToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const activeOption = this.soundToggle.querySelector('.sound-option:focus');
                if (activeOption) {
                    const soundState = activeOption.dataset.sound;
                    this.setSoundState(soundState === 'on');
                }
            }
        });
        
        // Initialize audio context on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.initAudioContext();
            }
        }, { once: true });
        
        // Initialize fallback audio
        this.initFallbackAudio();
    }
    
    initFallbackAudio() {
        try {
            // Create a simple beep sound using HTML5 Audio
            this.fallbackAudio = new Audio();
            this.fallbackAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
            this.fallbackAudio.load();
            console.log('Fallback audio initialized');
        } catch (e) {
            console.log('Fallback audio not supported:', e);
        }
    }
    
    initAudioContext() {
        try {
            // Try to resume existing audio context first
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
                return;
            }
            
            // Create new audio context with better compatibility
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume the context (required by some browsers)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            console.log('Audio context initialized successfully');
        } catch (e) {
            console.log('Web Audio API not supported:', e);
        }
    }
    
    setSoundState(enabled) {
        this.soundEnabled = enabled;
        localStorage.setItem('sound', enabled ? 'on' : 'off');
        this.updateSoundState();
        
        // Add visual feedback
        this.soundToggle.classList.add('sound-changing');
        setTimeout(() => {
            this.soundToggle.classList.remove('sound-changing');
        }, 300);
        
        // Test sound when enabling
        if (enabled) {
            setTimeout(() => this.playTypewriterSound(), 100);
        }
    }
    
    updateSoundState() {
        this.soundOptions.forEach(option => {
            option.classList.remove('active');
            if ((option.dataset.sound === 'on' && this.soundEnabled) ||
                (option.dataset.sound === 'off' && !this.soundEnabled)) {
                option.classList.add('active');
            }
        });
    }
    
    playTypewriterSound() {
        if (!this.soundEnabled) return;
        
        // Try Web Audio API first
        if (this.audioContext && this.audioContext.state === 'running') {
            this.playWebAudioSound();
        } else if (this.fallbackAudio) {
            // Fallback to HTML5 Audio
            this.playFallbackSound();
        } else {
            console.log('No audio system available');
        }
    }
    
    playWebAudioSound() {
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Add slight randomization for more realistic typewriter sound
            const baseFreq = 800 + (Math.random() * 200 - 100); // 700-900 Hz
            const duration = 0.03 + (Math.random() * 0.02); // 0.03-0.05 seconds
            
            // Typewriter sound characteristics
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, this.audioContext.currentTime + duration);
            
            gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
            
            console.log('Web Audio typewriter sound played successfully');
        } catch (e) {
            console.log('Error playing Web Audio sound:', e);
            // Fallback to HTML5 Audio
            this.playFallbackSound();
        }
    }
    
    playFallbackSound() {
        try {
            if (this.fallbackAudio) {
                this.fallbackAudio.currentTime = 0;
                this.fallbackAudio.play();
                console.log('Fallback typewriter sound played successfully');
            }
        } catch (e) {
            console.log('Error playing fallback sound:', e);
        }
    }
    
    // Debug function to check audio system status
    debugAudioSystem() {
        console.log('=== Audio System Debug ===');
        console.log('Sound enabled:', this.soundEnabled);
        console.log('Audio context state:', this.audioContext ? this.audioContext.state : 'Not initialized');
        console.log('Fallback audio available:', !!this.fallbackAudio);
        console.log('Browser supports Web Audio API:', !!window.AudioContext || !!window.webkitAudioContext);
        console.log('Browser supports HTML5 Audio:', !!window.Audio);
        
        // Test both audio systems
        if (this.soundEnabled) {
            console.log('Testing audio systems...');
            setTimeout(() => this.playTypewriterSound(), 100);
        }
    }
}

// Add CSS for additional functionality
const additionalStyles = `
    .tooltip {
        position: absolute;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        white-space: nowrap;
    }
    
    .copy-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: var(--accent-primary);
        color: var(--bg-primary);
        border: none;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .copy-button:hover {
        background: var(--accent-hover);
        transform: scale(1.05);
    }
    
    .copy-button.copied {
        background: #28a745;
    }
    
    .page-loading {
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .parallax {
        will-change: transform;
    }
    
    .search-input {
        width: 100%;
        padding: 0.75rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-primary);
        font-size: 1rem;
        margin-bottom: 1rem;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 2px rgba(255, 140, 0, 0.2);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
