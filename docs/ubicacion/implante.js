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
    const scrollTopBtn = document.getElementById('btntop');
    
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

    // ================= FUNCIÓN PARA ENVIAR UBICACIÓN POR WHATSAPP =================
    function enviarWhatsAppConUbicacion(ciudad, direccion, servicio = '') {
        // Crear mensaje con información detallada
        let mensaje = `Hola Áurea, me gustaría contactarlos.\n\n`;
        mensaje += `📍 *Ubicación que me interesa:* ${ciudad}\n`;
        mensaje += `🏢 *Dirección:* ${direccion}\n`;
        
        if (servicio) {
            mensaje += `📋 *Servicio de interés:* ${servicio}\n`;
        }
        
        mensaje += `\nPor favor, me pueden brindar más información.`;
        
        // Codificar el mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);
        
        // Crear URL de WhatsApp
        const urlWhatsApp = `https://wa.me/59177534284?text=${mensajeCodificado}`;
        
        // Abrir en nueva ventana
        window.open(urlWhatsApp, '_blank');
    }

    // ================= BOTONES DE WHATSAPP CON UBICACIÓN =================
    const botonesWhatsApp = document.querySelectorAll('.contact-whatsapp');
    
    botonesWhatsApp.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener datos del botón
            const ciudad = this.getAttribute('data-ciudad');
            const direccion = this.getAttribute('data-direccion');
            
            // Enviar mensaje con ubicación
            enviarWhatsAppConUbicacion(ciudad, direccion);
        });
    });

    // ================= BOTÓN FLOTANTE DE WHATSAPP INTELIGENTE =================
    const whatsappFlotante = document.getElementById('whatsapp-flotante');
    
    if (whatsappFlotante) {
        whatsappFlotante.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Detectar en qué sección está el usuario
            let ciudadDetectada = 'Áurea Centro Auditivo';
            let direccionDetectada = 'Av. Arce Nro. 2652 Edif. MILA Mezanine 1 Of. L21';
            
            // Verificar si está en alguna sección específica
            const sections = document.querySelectorAll('.location-section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                    // El usuario está en esta sección
                    const h2 = section.querySelector('h2');
                    const direccionElement = section.querySelector('.location-content p i.fa-map-marker-alt').parentElement;
                    
                    if (h2) ciudadDetectada = h2.textContent;
                    if (direccionElement) {
                        direccionDetectada = direccionElement.textContent.replace('📍', '').trim();
                    }
                }
            });
            
            // Enviar mensaje con la ubicación detectada
            enviarWhatsAppConUbicacion(ciudadDetectada, direccionDetectada, 'información general');
        });
    }

    // ================= FUNCIONES DE AGENDADO CON UBICACIÓN =================
    window.scheduleAppointment = function(location, service, direccion) {
        const message = `Hola Áurea, me gustaría agendar una cita.\n\n`;
        message += `📍 *Ubicación:* ${location}\n`;
        message += `🏢 *Dirección:* ${direccion}\n`;
        message += `📋 *Servicio:* ${service}\n\n`;
        message += `Por favor, me pueden indicar horarios disponibles.`;
        
        const whatsappUrl = `https://wa.me/59177534284?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Agregar eventos a los botones de agendar
    const agendarButtons = document.querySelectorAll('a[href*="wa.me/59177534284"]');
    agendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.hasAttribute('target')) {
                e.preventDefault();
                const location = this.closest('.campaign-section').querySelector('h2').textContent;
                const direccion = this.closest('.campaign-section').querySelector('.location-content p i.fa-map-marker-alt').parentElement.textContent;
                const service = "campaña auditiva";
                scheduleAppointment(location, service, direccion);
            }
        });
    });

    console.log('Página de Campañas Auditivas cargada correctamente');
    console.log('Número de contacto: +591 77534284');
    console.log('Funcionalidad de WhatsApp con ubicación activada');
});