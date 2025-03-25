/**
 * Main JavaScript functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize tabs
    initTabs();
    
    // Initialize parallax and sticky behavior
    initParallax();
    
    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize nav wave effect
    initNavWave();

    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu__container');
    const menuLinks = document.querySelectorAll('.menu__link');

    menuToggle.addEventListener('click', () => {
        menuContainer.classList.toggle('is-open');
        menuToggle.classList.toggle('is-open');
    });

    for (const link of menuLinks) {
        link.addEventListener('click', () => {
            menuContainer.classList.remove('is-open');
            menuToggle.classList.remove('is-open');
        });
    }

    const menuButtons = document.querySelectorAll('.menu__button');

    for (const button of menuButtons) {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            
            // Update chevron icon
            const chevronImg = button.querySelector('.menu__chevron img');
            chevronImg.src = !isExpanded ? 'img/icons/chevron-up.svg' : 'img/icons/chevron-down.svg';
            
            // Toggle the menu list visibility with smooth transition
            const menuSection = button.closest('.menu__section');
            const menuList = menuSection.querySelector('.menu__list');
            
            if (menuList) {
                menuList.classList.toggle('is-open');
            }

            // Close other open menus
            const otherOpenMenus = document.querySelectorAll('.menu__list.is-open');
            for (const openMenu of otherOpenMenus) {
                if (openMenu !== menuList) {
                    openMenu.classList.remove('is-open');
                    const parentSection = openMenu.closest('.menu__section');
                    const parentButton = parentSection.querySelector('.menu__button');
                    parentButton.setAttribute('aria-expanded', 'false');
                    const parentChevron = parentButton.querySelector('.menu__chevron img');
                    parentChevron.src = 'img/icons/chevron-down.svg';
                }
            }
        });
    }
});

/**
 * Lazy loading with fade-in and slide-up animation for images
 */
function initLazyLoading() {
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported, loading images immediately');
        const fallbackImages = document.querySelectorAll('.image-text-content-block img.block__img');
        for (const img of fallbackImages) {
            img.src = img.getAttribute('data-src') || img.src;
            img.classList.add('fade-in', 'slide-up');
        }
        return;
    }

    const lazyImages = document.querySelectorAll('.image-text-content-block img.block__img');
    console.log('Found lazy images:', lazyImages.length);

    const options = {
        root: null,
        rootMargin: '150px',
        threshold: 0.1
    };

    const calculateImageHeight = (img) => {
        const width = img.clientWidth || img.parentElement.clientWidth;
        if (width) {
            const height = width * (2.9/4);
            img.style.height = `${height}px`;
        }
    };

    const preloadAndAnimate = (img, delay = 100) => {
        if (!img.dataset.src) return;
        
        const originalSrc = img.dataset.src;
        
        setTimeout(() => {
            img.src = originalSrc;
            
            setTimeout(() => {
                img.classList.add('fade-in', 'slide-up');
            }, 50);
            
            img.onerror = () => {
                console.error('Failed to load image:', originalSrc);
                img.classList.add('fade-in', 'slide-up');
            };
            
            img.removeAttribute('data-src');
        }, delay);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const img = entry.target;
                console.log('Image in view:', img.alt);
                preloadAndAnimate(img);
                observer.unobserve(img);
            }
        }
    }, options);

    for (const img of lazyImages) {
        img.dataset.src = img.getAttribute('src');
        img.classList.add('lazy-image');
        calculateImageHeight(img);
        img.style.backgroundColor = 'transparent';
        img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
        
        const rect = img.getBoundingClientRect();
        const isInViewport = (
            rect.top >= -150 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight + 150) &&
            rect.right <= window.innerWidth
        );
        
        if (isInViewport) {
            console.log('Image already in viewport, loading with animation:', img.alt);
            preloadAndAnimate(img, 3000);
        } else {
            observer.observe(img);
            console.log('Prepared image for lazy loading:', img.dataset.src);
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            for (const img of lazyImages) {
                if (img.classList.contains('lazy-image') && !img.classList.contains('fade-in')) {
                    calculateImageHeight(img);
                }
            }
        }, 100);
    });
}

/**
 * Tabs functionality
 */
function initTabs() {
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) return;
    
    const tabButtons = tabsContainer.querySelectorAll('.tabs__btn');
    const tabContents = tabsContainer.querySelectorAll('.tabs__content');
    
    const activateTab = (index) => {
        for (const btn of tabButtons) {
            btn.classList.remove('tabs__btn--active');
        }
        
        for (const content of tabContents) {
            content.classList.remove('tabs__content--active');
        }
        
        tabButtons[index].classList.add('tabs__btn--active');
        tabContents[index].classList.add('tabs__content--active');
    };
    
    let index = 0;
    for (const button of tabButtons) {
        const currentIndex = index;
        button.addEventListener('click', () => activateTab(currentIndex));
        index++;
    }
    
    activateTab(0);
}

/**
 * Parallax effect and sticky behavior
 */
function initParallax() {
    const main = document.querySelector('main');
    if (!main) return;

    let lastScrollTop = 0;
    let ticking = false;

    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const heroHeight = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hero-height'));
                
                if (scrollTop >= heroHeight) {
                    main.classList.add('sticky');
                } else {
                    main.classList.remove('sticky');
                }

                const scrolled = scrollTop - heroHeight;
                const parallaxOffset = scrolled * 0.5;
                main.style.backgroundPosition = `center ${parallaxOffset}px`;

                lastScrollTop = scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * Smooth scrolling functionality
 */
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (const link of anchorLinks) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just '#'
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Initialize nav wave effect on scroll
 */
function initNavWave() {
    const nav = document.querySelector('.nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;
                const viewportHeight = window.innerHeight;
                const triggerHeight = viewportHeight * 0.75; // 75vh

                if (scrollPosition >= triggerHeight) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
