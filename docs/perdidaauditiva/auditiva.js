// Botón Scroll Top
const btntop = document.getElementById("btntop");
if (btntop) {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            btntop.style.display = "block";
        } else {
            btntop.style.display = "none";
        }
    });

    btntop.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Animaciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de información auditiva cargada');
    
    // Animación para las tarjetas
    const cards = document.querySelectorAll('.grid-item');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Efectos hover mejorados para imágenes
    const images = document.querySelectorAll('.centered-img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Inicializar tooltips de Bootstrap
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});