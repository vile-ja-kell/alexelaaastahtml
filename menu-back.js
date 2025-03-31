document.addEventListener('DOMContentLoaded', () => {
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
        });
    }
}); 