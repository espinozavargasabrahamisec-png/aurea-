// Datos curiosos sobre la audición
const datosCuriosos = [
    "El oído humano puede distinguir más de 1,500 tonos diferentes.",
    "Los bebés pueden escuchar sonidos desde que están en el vientre materno.",
    "La pérdida auditiva afecta a aproximadamente 466 millones de personas en el mundo.",
    "El oído sigue funcionando incluso cuando dormimos, procesando sonidos.",
    "La exposición a ruidos fuertes es la causa más común de pérdida auditiva prevenible."
];

// Función para mostrar dato curioso
function mostrarDatoCurioso() {
    const datoAleatorio = datosCuriosos[Math.floor(Math.random() * datosCuriosos.length)];
    alert(`💡 Dato Curioso:\n\n${datoAleatorio}`);
}

// Función para el scroll suave
function scrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para animaciones al hacer scroll
function animacionesScroll() {
    const elementos = document.querySelectorAll('.contenido');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => {
        elemento.classList.add('fade-in');
        observer.observe(elemento);
    });
}

// Función para el menú móvil
function menuMovil() {
    const toggler = document.querySelector('.navbar-toggler');
    const nav = document.querySelector('.navbar-nav');
    
    if (toggler && nav) {
        toggler.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Animación del botón hamburguesa
            const spans = toggler.querySelectorAll('span');
            spans[0].classList.toggle('active');
            spans[1].classList.toggle('active');
            spans[2].classList.toggle('active');
        });
    }
}

// Función para el año actual en el footer
function actualizarAnio() {
    const anioElement = document.querySelector('footer p:last-child');
    if (anioElement) {
        const anioActual = new Date().getFullYear();
        anioElement.textContent = anioElement.textContent.replace('2025', anioActual);
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Botón de dato curioso
    const btnInfo = document.getElementById('btnInfo');
    if (btnInfo) {
        btnInfo.addEventListener('click', mostrarDatoCurioso);
    }
    
    // Inicializar funcionalidades
    scrollSuave();
    animacionesScroll();
    menuMovil();
    actualizarAnio();
    
    console.log('Sitio de Hipoacusia cargado correctamente 🎧');
});

// Efectos adicionales para las cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});