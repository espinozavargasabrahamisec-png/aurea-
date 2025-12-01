// script.js - Funcionalidades para Áurea Centro Auditivo

document.addEventListener('DOMContentLoaded', function() {
    // ================= SCROLL SUAVE =================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================= BOTÓN SCROLL TOP =================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    function toggleScrollTopButton() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleScrollTopButton);
    toggleScrollTopButton(); // Estado inicial

    // ================= ANIMACIONES AL SCROLL =================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.campaign-content, .location-card, .sede-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Establecer estado inicial para animaciones
    document.querySelectorAll('.campaign-content, .location-card, .sede-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar

    // ================= NAVBAR SCROLL EFFECT =================
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 20px';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 20px';
            navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);

    // ================= INTERACCIÓN CON TARJETAS =================
    const cards = document.querySelectorAll('.location-card, .sede-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ================= MODALES INTERACTIVOS =================
    const mapModals = document.querySelectorAll('.map-preview');
    
    mapModals.forEach(modal => {
        modal.addEventListener('click', function() {
            const modalId = this.getAttribute('data-bs-target');
            const modalElement = document.querySelector(modalId);
            
            if (modalElement) {
                const iframe = modalElement.querySelector('iframe');
                if (iframe) {
                    // Recargar iframe para asegurar que se muestre correctamente
                    const src = iframe.src;
                    iframe.src = src;
                }
            }
        });
    });

    // ================= CAROUSEL AUTOPLAY =================
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            pause: 'hover',
            wrap: true
        });
    }

    // ================= CONTADOR DE VISITAS =================
    function updateVisitCounter() {
        let visits = localStorage.getItem('aureaVisits');
        
        if (!visits) {
            visits = 1;
        } else {
            visits = parseInt(visits) + 1;
        }
        
        localStorage.setItem('aureaVisits', visits);
        console.log(`Visitas a la página: ${visits}`);
    }
    
    updateVisitCounter();

    // ================= MEJORA DE ACCESIBILIDAD =================
    function improveAccessibility() {
        // Agregar labels a los botones sin texto
        const iconButtons = document.querySelectorAll('button:not([aria-label])');
        
        iconButtons.forEach(button => {
            if (button.querySelector('i') && !button.textContent.trim()) {
                const iconClass = button.querySelector('i').className;
                
                if (iconClass.includes('fa-whatsapp')) {
                    button.setAttribute('aria-label', 'Contactar por WhatsApp');
                } else if (iconClass.includes('fa-map-marker-alt')) {
                    button.setAttribute('aria-label', 'Ver ubicación en mapa');
                } else if (iconClass.includes('fa-chevron-up')) {
                    button.setAttribute('aria-label', 'Volver al inicio');
                }
            }
        });
    }
    
    improveAccessibility();

    console.log('Áurea Centro Auditivo - Página cargada correctamente');
});

// ================= FUNCIONES GLOBALES =================
function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Áurea Centro Auditivo - Campañas Auditivas');
    
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Función para agendar cita automáticamente
function scheduleAppointment(location, service) {
    const message = `Hola, me gustaría agendar una cita para ${service} en ${location}`;
    const whatsappUrl = `https://wa.link/cetggt?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}