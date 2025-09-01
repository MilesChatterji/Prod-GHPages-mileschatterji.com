// Main JavaScript for Jekyll Site

document.addEventListener('DOMContentLoaded', function() {
    // Initialize site functionality
    initializeSite();
    
    // Add smooth page transitions
    initializePageTransitions();
    
    // Initialize image lazy loading
    initializeLazyLoading();
    
    // Add scroll effects
    initializeScrollEffects();
    
    // Initialize typewriter animation
    initializeTypewriterAnimation();

    // Initialize theme switcher
    new ThemeSwitcher();
    
    // Initialize portfolio carousel
    new PortfolioCarousel();
    
    // Initialize video carousel
    new VideoCarousel();
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

// Typewriter Animation
function initializeTypewriterAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const pageTitle = document.querySelector('.page-title');

    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        typeText(heroTitle, titleText, 0, () => {
            setTimeout(() => {
                typeText(heroSubtitle, subtitleText, 0, () => {
                    // After hero subtitle, animate page title if present
                    if (pageTitle) animateSingle(pageTitle);
                });
            }, 500);
        });
    } else if (pageTitle) {
        // If no hero elements, animate page title directly
        animateSingle(pageTitle);
    }
}

function animateSingle(element) {
    const text = element.textContent;
    element.textContent = '';
    typeText(element, text, 0);
}

function typeText(element, text, index, callback) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => {
            typeText(element, text, index + 1, callback);
        }, 100); // Adjust speed here (lower = faster)
    } else {
        // Remove the cursor after typing is complete
        element.style.borderRight = 'none';
        if (callback) callback();
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

// Portfolio Carousel - Complete Rewrite
class PortfolioCarousel {
    constructor() {
        this.carousel = document.querySelector('.portfolio-carousel');
        if (!this.carousel) return;
        
        this.viewport = this.carousel.querySelector('.carousel-viewport');
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.prevBtn = this.carousel.querySelector('.carousel-prev');
        this.nextBtn = this.carousel.querySelector('.carousel-next');
        this.largeImage = document.getElementById('large-display-image');
        this.largeCaption = document.getElementById('large-display-caption');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.visibleSlides = 3;
        
        console.log(`Carousel initialized with ${this.slideCount} slides`);
        
        this.init();
    }
    
    init() {
        if (this.slideCount === 0) return;
        
        console.log(`Initializing carousel with ${this.slideCount} slides`);
        
        // Set initial state
        this.updateCarousel();
        this.updateLargeDisplay();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add slide click events for large display
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.selectSlide(index));
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.carousel.matches(':focus-within') || this.carousel.contains(document.activeElement)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                }
            }
        });
        
        // Add touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    updateCarousel() {
        // Calculate the slide width (33.333% + margin)
        const slideWidth = 33.333 + (1 / 3); // 33.333% + margin adjustment
        const transformValue = -(this.currentIndex * slideWidth);
        
        // Apply transform to move the track
        this.track.style.transform = `translateX(${transformValue}%)`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= Math.max(0, this.slideCount - this.visibleSlides);
        
        // Add visual feedback for disabled state
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= Math.max(0, this.slideCount - this.visibleSlides) ? '0.5' : '1';
        
        console.log(`Carousel: ${this.slideCount} slides, current index: ${this.currentIndex}, transform: ${transformValue}%`);
    }
    

    
    updateLargeDisplay(index = null) {
        if (!this.largeImage || !this.largeCaption) return;
        
        const targetIndex = index !== null ? index : this.currentIndex;
        const targetSlide = this.slides[targetIndex];
        const targetImage = targetSlide.querySelector('.carousel-image');
        const targetCaption = targetSlide.querySelector('.carousel-caption');
        
        this.largeImage.src = targetImage.src;
        this.largeImage.alt = targetImage.alt;
        this.largeCaption.textContent = targetCaption ? targetCaption.textContent : '';
    }
    
    previousSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - this.visibleSlides);
            this.updateCarousel();
            console.log(`Previous: index ${this.currentIndex}`);
        }
    }
    
    nextSlide() {
        const maxIndex = Math.max(0, this.slideCount - this.visibleSlides);
        if (this.currentIndex < maxIndex) {
            this.currentIndex = Math.min(maxIndex, this.currentIndex + this.visibleSlides);
            this.updateCarousel();
            console.log(`Next: index ${this.currentIndex}`);
        }
    }
    
    selectSlide(index) {
        this.updateLargeDisplay(index);
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: true });
    }
}

// Video Carousel - Complete Rewrite
class VideoCarousel {
    constructor() {
        this.carousel = document.querySelector('.video-carousel');
        if (!this.carousel) return;
        
        this.viewport = this.carousel.querySelector('.carousel-viewport');
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.prevBtn = this.carousel.querySelector('.carousel-prev');
        this.nextBtn = this.carousel.querySelector('.carousel-next');
        this.videoPlayer = document.getElementById('video-player');
        this.videoTitle = document.getElementById('video-title');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.visibleSlides = 3;
        
        console.log(`Video carousel initialized with ${this.slideCount} videos`);
        
        this.init();
    }
    
    init() {
        if (this.slideCount === 0) return;
        
        console.log(`Initializing video carousel with ${this.slideCount} videos`);
        
        // Set initial state
        this.updateCarousel();
        this.updateVideoPlayer();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add slide click events for video player
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.selectVideo(index));
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.carousel.matches(':focus-within') || this.carousel.contains(document.activeElement)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                }
            }
        });
        
        // Add touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    updateCarousel() {
        // Calculate the slide width (33.333% + margin)
        const slideWidth = 33.333 + (1 / 3); // 33.333% + margin adjustment
        const transformValue = -(this.currentIndex * slideWidth);
        
        // Apply transform to move the track
        this.track.style.transform = `translateX(${transformValue}%)`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= Math.max(0, this.slideCount - this.visibleSlides);
        
        // Add visual feedback for disabled state
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= Math.max(0, this.slideCount - this.visibleSlides) ? '0.5' : '1';
        
        // Update active slide highlighting
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === this.currentIndex) {
                slide.classList.add('active');
            }
        });
        
        console.log(`Video carousel: ${this.slideCount} videos, current index: ${this.currentIndex}, transform: ${transformValue}%`);
    }
    
    updateVideoPlayer() {
        if (!this.videoPlayer || !this.videoTitle) return;
        
        const currentSlide = this.slides[this.currentIndex];
        const videoId = currentSlide.dataset.videoId;
        const videoTitle = currentSlide.querySelector('.carousel-caption')?.textContent || '';
        
        // Update video player
        this.videoPlayer.src = `https://www.youtube.com/embed/${videoId}?rel=0`;
        this.videoTitle.textContent = videoTitle;
        
        console.log(`Video player updated: ${videoId} - ${videoTitle}`);
    }
    
    previousSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - this.visibleSlides);
            this.updateCarousel();
            this.updateVideoPlayer();
            console.log(`Previous video: index ${this.currentIndex}`);
        }
    }
    
    nextSlide() {
        const maxIndex = Math.max(0, this.slideCount - this.visibleSlides);
        if (this.currentIndex < maxIndex) {
            this.currentIndex = Math.min(maxIndex, this.currentIndex + this.visibleSlides);
            this.updateCarousel();
            this.updateVideoPlayer();
            console.log(`Next video: index ${this.currentIndex}`);
        }
    }
    
    selectVideo(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.updateVideoPlayer();
        console.log(`Selected video: index ${index}`);
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: true });
    }
    
    // Utility function to extract YouTube ID from URL
    static extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
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
