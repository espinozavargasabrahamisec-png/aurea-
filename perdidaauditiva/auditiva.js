// Navbar toggle responsive
const toggler = document.querySelector('.navbar-toggler');
const nav = document.querySelector('.navbar-nav');

toggler.addEventListener('click', () => {
    nav.classList.toggle('active');
});
