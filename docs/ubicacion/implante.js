// implante.js - Funcionalidades específicas para la página de Campañas Auditivas

document.addEventListener('DOMContentLoaded', function() {
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

    // ================= BOTONES FLOTANTES ESPECÍFICOS =================
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

    // ================= FUNCIONES DE AGENDADO =================
    window.scheduleAppointment = function(location, service) {
        const message = `Hola, me gustaría agendar una cita para ${service} en ${location}`;
        const whatsappUrl = `https://wa.link/cetggt?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Agregar eventos a los botones de agendar
    const agendarButtons = document.querySelectorAll('a[href*="wa.link/cetggt"]');
    agendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.hasAttribute('target')) {
                e.preventDefault();
                const location = this.closest('.campaign-section').querySelector('h2').textContent;
                const service = "campaña auditiva";
                scheduleAppointment(location, service);
            }
        });
    });

    console.log('Página de Campañas Auditivas cargada correctamente');
});