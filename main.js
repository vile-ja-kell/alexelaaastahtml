/**
 * Lazy loading with fade-in and slide-up animation for images in image-text-content-block
 */
/* 
document.addEventListener('DOMContentLoaded', () => {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.image-text-content-block img.block__img');
        console.log('Found lazy images:', lazyImages.length);

        // Create observer options
        const options = {
            root: null, // viewport
            rootMargin: '150px', // Increased margin to load images before they enter viewport
            threshold: 0.1
        };

        // Function to calculate and set image height based on aspect ratio
        const calculateImageHeight = (img) => {
            const width = img.clientWidth || img.parentElement.clientWidth;
            if (width) {
                // Aspect ratio is 4:2.9, so height = width * (2.9/4)
                const height = width * (2.9/4);
                img.style.height = `${height}px`;
            }
        };

        // Function to preload and animate image
        const preloadAndAnimate = (img, delay = 100) => {
            if (!img.dataset.src) return;
            
            // Store original src for fallback
            const originalSrc = img.dataset.src;
            
            // Set a timeout for the animation to start
            setTimeout(() => {
                // Set the src directly
                img.src = originalSrc;
                
                // Add animation classes after a small delay to ensure the browser has time to process
                setTimeout(() => {
                    img.classList.add('fade-in');
                    img.classList.add('slide-up');
                }, 50);
                
                // Fallback in case the image doesn't load properly
                img.onerror = () => {
                    console.error('Failed to load image:', originalSrc);
                    img.classList.add('fade-in');
                    img.classList.add('slide-up');
                };
                
                // Remove data-src to mark as processed
                img.removeAttribute('data-src');
            }, delay);
        };

        // Create the observer
        const observer = new IntersectionObserver((entries, observer) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    console.log('Image in view:', img.alt);
                    
                    // Preload and animate the image
                    preloadAndAnimate(img);
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            }
        }, options);

        // Process each image
        for (const img of lazyImages) {
            // Save the original src to data-src
            img.dataset.src = img.getAttribute('src');
            
            // Add the lazy-image class to all images first
            img.classList.add('lazy-image');
            
            // Calculate and set initial height based on aspect ratio and current width
            calculateImageHeight(img);
            
            // Make the placeholder transparent
            img.style.backgroundColor = 'transparent';
            
            // Clear the src to prevent immediate loading
            img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
            
            // Check if image is already in viewport
            const rect = img.getBoundingClientRect();
            const isInViewport = (
                rect.top >= -150 && // Consider images slightly above viewport
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight + 150) && // Consider images slightly below viewport
                rect.right <= window.innerWidth
            );
            
            if (isInViewport) {
                // Image is already visible, preload with longer delay
                console.log('Image already in viewport, loading with animation:', img.alt);
                preloadAndAnimate(img, 3000); // 3 second delay for initial viewport images
            } else {
                // Start observing
                observer.observe(img);
                console.log('Prepared image for lazy loading:', img.dataset.src);
            }
        }

        // Add resize event listener to recalculate image heights when window is resized
        let resizeTimeout;
        window.addEventListener('resize', () => {
            // Debounce the resize event to avoid excessive calculations
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Recalculate heights for all images that haven't loaded yet
                for (const img of lazyImages) {
                    if (img.classList.contains('lazy-image') && !img.classList.contains('fade-in')) {
                        calculateImageHeight(img);
                    }
                }
            }, 100);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        console.log('IntersectionObserver not supported, loading images immediately');
        const fallbackImages = document.querySelectorAll('.image-text-content-block img.block__img');
        for (const img of fallbackImages) {
            img.src = img.getAttribute('data-src') || img.src;
            img.classList.add('fade-in');
            img.classList.add('slide-up');
        }
    }
});
*/

/**
 * Tabs functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    // Find tab elements
    const tabsContainer = document.querySelector('.tabs');
    
    // Exit if no tabs container exists
    if (!tabsContainer) return;
    
    const tabButtons = tabsContainer.querySelectorAll('.tabs__btn');
    const tabContents = tabsContainer.querySelectorAll('.tabs__content');
    
    // Function to activate a specific tab
    const activateTab = (index) => {
        // Remove active class from all tabs
        for (const btn of tabButtons) {
            btn.classList.remove('tabs__btn--active');
        }
        
        for (const content of tabContents) {
            content.classList.remove('tabs__content--active');
        }
        
        // Add active class to selected tab
        tabButtons[index].classList.add('tabs__btn--active');
        tabContents[index].classList.add('tabs__content--active');
    };
    
    // Add click event listeners to tab buttons
    let index = 0;
    for (const button of tabButtons) {
        const currentIndex = index;
        button.addEventListener('click', () => activateTab(currentIndex));
        index++;
    }
    
    // Initialize first tab as active
    activateTab(0);
});
