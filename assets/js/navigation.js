// Navigation JavaScript for Jekyll Site

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;
    
    // Create mobile nav toggle button if it doesn't exist
    if (!mobileNavToggle) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-nav-toggle';
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
        document.body.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', toggleMobileNav);
    }
    
    function toggleMobileNav() {
        sidebar.classList.toggle('open');
        const isOpen = sidebar.classList.contains('open');
        
        // Update button text
        const toggleBtn = document.querySelector('.mobile-nav-toggle');
        toggleBtn.innerHTML = isOpen ? '✕' : '☰';
        
        // Prevent body scroll when menu is open
        body.style.overflow = isOpen ? 'hidden' : '';
        
        // Update aria-expanded
        toggleBtn.setAttribute('aria-expanded', isOpen);
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(event.target) && 
            !event.target.classList.contains('mobile-nav-toggle')) {
            toggleMobileNav();
        }
    });
    
    // Close mobile nav on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleMobileNav();
        }
    });
    
    // Handle navigation active states
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .submenu-link');
    const navItems = document.querySelectorAll('.nav-item');
    
    // First, remove all active states
    navItems.forEach(item => {
        item.classList.remove('active-section');
        const itemLinks = item.querySelectorAll('.nav-link, .submenu-link');
        itemLinks.forEach(link => link.classList.remove('active'));
    });
    
    // Find the active section
    let activeSection = null;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove trailing slash for comparison
        const normalizedCurrentPath = currentPath.replace(/\/$/, '');
        const normalizedLinkPath = linkPath.replace(/\/$/, '');
        
        // Check if current page matches this link
        if (normalizedCurrentPath === normalizedLinkPath || 
            (normalizedCurrentPath.startsWith(normalizedLinkPath) && normalizedLinkPath !== '/')) {
            link.classList.add('active');
            
            // If it's a submenu link, mark the parent section as active
            const parentNavItem = link.closest('.nav-item');
            if (parentNavItem) {
                const parentLink = parentNavItem.querySelector('.nav-link');
                if (parentLink) {
                    parentLink.classList.add('active');
                    activeSection = parentNavItem;
                }
            } else {
                // If it's a main nav link, mark this section as active
                activeSection = link.closest('.nav-item');
            }
        }
    });
    
    // Set the active section
    if (activeSection) {
        activeSection.classList.add('active-section');
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects for navigation items
    navItems.forEach(item => {
        const navLink = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');
        
        if (submenu) {
            // Show submenu on hover/focus (but not if it's the active section)
            item.addEventListener('mouseenter', function() {
                if (!item.classList.contains('active-section')) {
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!item.classList.contains('active-section')) {
                    submenu.style.maxHeight = '0';
                }
            });
            
            // Handle focus events for accessibility
            item.addEventListener('focusin', function() {
                if (!item.classList.contains('active-section')) {
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                }
            });
            
            item.addEventListener('focusout', function() {
                // Only hide if focus is not within the submenu and not active section
                if (!submenu.contains(document.activeElement) && !item.classList.contains('active-section')) {
                    submenu.style.maxHeight = '0';
                }
            });
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        const activeElement = document.activeElement;
        
        if (activeElement.classList.contains('nav-link') || 
            activeElement.classList.contains('submenu-link')) {
            
            const navItem = activeElement.closest('.nav-item');
            const allNavLinks = Array.from(navItem.querySelectorAll('.nav-link, .submenu-link'));
            const currentIndex = allNavLinks.indexOf(activeElement);
            
            switch(event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    const nextIndex = (currentIndex + 1) % allNavLinks.length;
                    allNavLinks[nextIndex].focus();
                    break;
                    
                case 'ArrowUp':
                    event.preventDefault();
                    const prevIndex = currentIndex === 0 ? allNavLinks.length - 1 : currentIndex - 1;
                    allNavLinks[prevIndex].focus();
                    break;
                    
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    activeElement.click();
                    break;
            }
        }
    });
    
    // Add loading states for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add loading indicator
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.pointerEvents = 'none';
            
            // Reset after a short delay (or when page loads)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = '';
            }, 2000);
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile nav on large screens
            if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
                toggleMobileNav();
            }
        }, 250);
    });
    
    // Add intersection observer for scroll-based animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe main content sections
        document.querySelectorAll('.page, .post, .portfolio-item').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
});
