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