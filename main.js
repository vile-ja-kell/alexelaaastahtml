/**
 * Main JavaScript functionality
 */
document.addEventListener('DOMContentLoaded', () => {
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
    const menuButtons = document.querySelectorAll('.menu__button');

    menuToggle.addEventListener('click', () => {
        menuContainer.classList.toggle('is-open');
        menuToggle.classList.toggle('is-open');
    });

    for (const button of menuButtons) {
        button.addEventListener('click', () => {
            menuContainer.classList.remove('is-open');
            menuToggle.classList.remove('is-open');
        });
    }

    // Modal functionality
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal__content');
    const modalOpenBtn = document.querySelector('.btn-modal');
    const modalCloseBtn = document.querySelector('.modal__close');

    // Function to open modal
    const openModal = () => {
        modal.style.display = 'block';
        // Trigger reflow to ensure the transition works
        modal.offsetHeight;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('is-open');
        // Wait for the animation to finish before hiding the modal
        setTimeout(() => {
            if (!modal.classList.contains('is-open')) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        }, 300); // Match this with the CSS transition duration
    };

    // Event listeners
    modalOpenBtn.addEventListener('click', openModal);
    modalCloseBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
});



/**
 * Tabs functionality
 */
const initTabs = () => {
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
};

/**
 * Parallax effect and sticky behavior
 */
const initParallax = () => {
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
};

/**
 * Smooth scrolling functionality
 */
const initSmoothScrolling = () => {
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
};

/**
 * Initialize nav wave effect on scroll
 */
const initNavWave = () => {
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
};
