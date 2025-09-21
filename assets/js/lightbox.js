// Simplified Lightbox JavaScript
class SimpleLightbox {
    constructor() {
        this.currentIndex = 0;
        this.isOpen = false;
        this.images = [];
        this.init();
    }

    init() {
        // Get images from the gallery data
        this.images = window.galleryImages || [];
        
        // Setup event listeners
        this.setupEventListeners();
    }

    open(index) {
        if (index < 0 || index >= this.images.length) return;
        
        this.currentIndex = index;
        this.isOpen = true;
        
        const modal = document.getElementById('lightboxModal');
        const image = document.getElementById('lightboxImage');
        const caption = document.getElementById('lightboxCaption');
        const counter = document.getElementById('lightboxCounter');
        
        if (!modal || !image) return;
        
        // Get current image data
        const currentImage = this.images[index];
        
        // Set image source and attributes
        image.src = currentImage.src;
        image.alt = currentImage.alt;
        
        // Update caption
        if (caption) {
            caption.textContent = currentImage.caption;
        }
        
        // Update counter
        if (counter) {
            counter.textContent = `${index + 1} / ${this.images.length}`;
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Focus management
        modal.focus();
    }

    close() {
        const modal = document.getElementById('lightboxModal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        this.isOpen = false;
    }

    navigate(direction) {
        if (!this.isOpen) return;
        
        if (direction === 'prev') {
            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
        } else {
            this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
        }
        
        this.open(this.currentIndex);
    }

    setupEventListeners() {
        // Gallery item clicks
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.open(index);
            });
        });

        // Close button
        const closeBtn = document.getElementById('lightboxClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Navigation buttons
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigate('prev'));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigate('next'));
        }

        // Overlay click to close
        const overlay = document.getElementById('lightboxOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.navigate('prev');
                    break;
                case 'ArrowRight':
                    this.navigate('next');
                    break;
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        
        const modal = document.getElementById('lightboxModal');
        if (modal) {
            modal.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
            
            modal.addEventListener('touchend', (e) => {
                if (!this.isOpen) return;
                
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = startX - endX;
                const diffY = startY - endY;
                
                // Only handle horizontal swipes
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        this.navigate('next');
                    } else {
                        this.navigate('prev');
                    }
                }
            });
        }
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lightbox = new SimpleLightbox();
});
