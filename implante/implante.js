// Seleccionar elementos del DOM
const toggler = document.querySelector('.navbar-toggler');
const navLinks = document.querySelector('.navbar-nav');

// Evento click para abrir/cerrar el menú
toggler.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animación de los spans del toggler
    toggler.classList.toggle('open');
});
