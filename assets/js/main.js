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
