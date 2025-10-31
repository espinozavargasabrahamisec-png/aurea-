// Animación simple de fade-in al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const fadeElems = document.querySelectorAll('.text-content, .image-box, .card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease';
            }
        });
    }, { threshold: 0.2 });

    fadeElems.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
});
