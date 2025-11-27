// Script para el servicio técnico de audífonos

// Scroll to top functionality
window.onscroll = function() {
    const btnTop = document.getElementById("btntop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
};

document.getElementById("btntop").onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// Animación de números para estadísticas
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.getAttribute('data-count') === '98' ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.getAttribute('data-count') === '98' ? '%' : '+');
        }
    }, 16);
}

// Inicializar contadores cuando la sección sea visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(statsSection);
}

// Función para solicitar servicio - ENLACE CORREGIDO
function solicitarServicio() {
    const servicio = confirm('¿Desea solicitar un servicio técnico para su audífono?');
    if (servicio) {
        window.open('https://wa.link/aqglwn', '_blank');
    }
}

// Función para llamada de emergencia
function llamarEmergencia() {
    const confirmar = confirm('¿Desea llamar al servicio de emergencia?\nTeléfono: +591 70111673');
    if (confirmar) {
        window.location.href = 'tel:+59170111673';
    }
}

// Función para contacto por WhatsApp
function contactarWhatsApp() {
    const mensaje = encodeURIComponent('Hola, necesito servicio técnico urgente para mi audífono');
    window.open(`https://wa.me/59170111673?text=${mensaje}`, '_blank');
}

// Efectos hover mejorados para las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.servicio-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos con clase 'fade-in'
document.querySelectorAll('.servicio-card, .proceso-step, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Preload de imágenes importantes
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar preload cuando la página cargue
window.addEventListener('load', preloadImages);

// Manejo de formularios (si se añaden en el futuro)
function handleFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica para enviar el formulario
            alert('Formulario enviado correctamente. Nos pondremos en contacto pronto.');
            form.reset();
        });
    }
}

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Servicio Técnico Aurea - Página cargada correctamente');
});