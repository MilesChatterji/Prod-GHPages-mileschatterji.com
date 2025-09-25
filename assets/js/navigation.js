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
    console.log('Current path:', currentPath);
    console.log('Current URL:', window.location.href);
    const navLinks = document.querySelectorAll('.nav-link, .submenu-link');
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Found nav links:', navLinks.length);
    console.log('Found nav items:', navItems.length);
    
    // Normalize current path for comparison (moved outside the loop)
    const normalizedCurrentPath = currentPath.replace(/\/$/, '');
    console.log('Normalized current path:', normalizedCurrentPath);
    
    // Debug: Log all nav links and their hrefs
    navLinks.forEach((link, index) => {
        console.log(`Nav link ${index}:`, link.textContent.trim(), 'href:', link.getAttribute('href'));
    });
    
    // First, remove all active states
    navItems.forEach(item => {
        item.classList.remove('active-section');
        const itemLinks = item.querySelectorAll('.nav-link, .submenu-link');
        itemLinks.forEach(link => link.classList.remove('active'));
    });
    
    // Find the active section based on submenu links only
    let activeSection = null;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Skip links without href (main menu labels)
        if (!linkPath) {
            console.log(`Skipping link without href: "${link.textContent.trim()}"`);
            return;
        }
        
        // Remove trailing slash for comparison
        const normalizedLinkPath = linkPath.replace(/\/$/, '');
        
        // Check if current page matches this link
        console.log(`Checking link: "${link.textContent.trim()}" (${normalizedLinkPath}) against current path: ${normalizedCurrentPath}`);
        
        if (normalizedCurrentPath === normalizedLinkPath || 
            (normalizedCurrentPath.startsWith(normalizedLinkPath) && normalizedLinkPath !== '/')) {
            console.log('MATCH FOUND!', link.textContent.trim());
            link.classList.add('active');
            
            // If it's a submenu link, mark the parent section as active
            const parentNavItem = link.closest('.nav-item');
            if (parentNavItem) {
                const parentLink = parentNavItem.querySelector('.nav-link, .nav-label');
                if (parentLink) {
                    parentLink.classList.add('active');
                    activeSection = parentNavItem;
                    console.log('Found active submenu link:', link.textContent, 'Parent:', parentLink.textContent);
                }
            }
        }
    });
    
    // Note: Removed special case for root page - all submenus should be closed by default
    
    // Set the active section
    if (activeSection) {
        activeSection.classList.add('active-section');
        const sectionName = activeSection.querySelector('.nav-link, .nav-label');
        console.log('Active section set:', sectionName ? sectionName.textContent : 'Unknown');
    } else {
        console.log('No active section found for path:', currentPath);
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
    
    // Note: Hover effects are now handled entirely by CSS
    // JavaScript no longer interferes with submenu visibility
    
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
    
});
