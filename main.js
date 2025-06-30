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

    // Initialize accordion
    const accordionButtons = document.querySelectorAll('.accordion__button');
    
    for (const button of accordionButtons) {
        const content = button.nextElementSibling;
        if (content?.classList.contains('accordion__content')) {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !isExpanded);
                content.classList.toggle('is-open');
            });
        }
    }

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

    // Initialize explanation functionality for bullets
    initExplanations();
});

/**
 * Explanation functionality for bullet elements
 */
const initExplanations = () => {
    const bullets = document.querySelectorAll('.bullet');
    const explanations = document.querySelectorAll('.explanation');
    const closeButtons = document.querySelectorAll('.explanation__close');

    // Function to close all explanations
    const closeAllExplanations = () => {
        for (const explanation of explanations) {
            explanation.classList.remove('is-open');
        }
    };

    // Function to open specific explanation
    const openExplanation = (explanation) => {
        closeAllExplanations(); // Close any open explanations first
        explanation.classList.add('is-open');
    };

    // Function to find corresponding explanation for a bullet
    const findCorrespondingExplanation = (clickedBullet) => {
        // First try to match using data-bullet-id attribute
        const bulletId = clickedBullet.getAttribute('data-bullet-id');
        if (bulletId) {
            const matchingExplanation = document.querySelector(`.explanation[data-bullet-id="${bulletId}"]`);
            if (matchingExplanation) {
                return matchingExplanation;
            }
        }
        
        // Fallback to text-based matching
        const bulletText = clickedBullet.textContent.trim();
        
        // First try to find explanation in the same parent container
        const parentFigure = clickedBullet.closest('figure');
        if (parentFigure) {
            const explanationInSameContainer = parentFigure.querySelector('.explanation');
            if (explanationInSameContainer) {
                // Check if the explanation has a matching bullet inside
                const explanationBullet = explanationInSameContainer.querySelector('.bullet');
                if (explanationBullet) {
                    const explanationText = explanationBullet.textContent.trim();
                    // Check if explanation bullet starts with the clicked bullet text
                    if (explanationText.startsWith(bulletText) || bulletText.startsWith(explanationText)) {
                        return explanationInSameContainer;
                    }
                }
            }
        }
        
        // Fallback: find any explanation with matching bullet text (partial match)
        for (const explanation of explanations) {
            const explanationBullet = explanation.querySelector('.bullet');
            if (explanationBullet) {
                const explanationText = explanationBullet.textContent.trim();
                // Check if either text starts with the other (partial matching)
                if (explanationText.startsWith(bulletText) || bulletText.startsWith(explanationText)) {
                    return explanation;
                }
            }
        }
        
        return null;
    };

    // Add click listeners to bullets (only absolute positioned ones that are clickable)
    for (const bullet of bullets) {
        // Only add click listener to bullets that are not inside explanations
        if (!bullet.closest('.explanation')) {
            bullet.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                
                const explanation = findCorrespondingExplanation(bullet);
                if (explanation) {
                    openExplanation(explanation);
                }
            });
            
            // Add cursor pointer style to indicate clickability
            bullet.style.cursor = 'pointer';
        }
    }

    // Add click listeners to close buttons
    for (const closeButton of closeButtons) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const explanation = closeButton.closest('.explanation');
            if (explanation) {
                explanation.classList.remove('is-open');
            }
        });
    }

    // Close explanation when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.bullet') && !e.target.closest('.explanation')) {
            closeAllExplanations();
        }
    });

    // Close explanation on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllExplanations();
        }
    });
};

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
                const parallaxOffset = scrolled * 0.9;
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

// Map legend toggle
const toggleBtn = document.querySelector('.map__legend-toggle');
const legendPanel = document.querySelector('#map-legend');
const closeBtn = document.querySelector('.map__legend-close');

if (toggleBtn && legendPanel && closeBtn) {
  toggleBtn.addEventListener('click', () => {
    legendPanel.classList.toggle('active');
  });

  closeBtn.addEventListener('click', () => {
    legendPanel.classList.remove('active');
  });
}

let scrollPosition = 0;
let targetScrollPosition = 0;
let isScrolling = false;

const smoothScroll = () => {
    if (!isScrolling) return;

    scrollPosition += (targetScrollPosition - scrollPosition) * 0.1;

    window.scrollTo(0, scrollPosition);

    if (Math.abs(targetScrollPosition - scrollPosition) > 0.5) {
        requestAnimationFrame(smoothScroll);
    } else {
        isScrolling = false;
    }
};

let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

window.addEventListener('wheel', (e) => {
    if (e.target.closest('.modal')) return; // Exclude modal from smooth scrolling
    maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollPosition = Math.min(Math.max(targetScrollPosition + e.deltaY, 0), maxScroll);
    if (!isScrolling) {
        isScrolling = true;
        smoothScroll();
    }
    e.preventDefault();
}, { passive: false });