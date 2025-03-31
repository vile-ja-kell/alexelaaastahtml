document.addEventListener('DOMContentLoaded', () => {
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
}); 