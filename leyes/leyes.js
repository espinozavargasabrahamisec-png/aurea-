document.addEventListener('DOMContentLoaded', () => {
    const fadeElems = document.querySelectorAll('.welcome');

    fadeElems.forEach(el => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, 300);
    });
});