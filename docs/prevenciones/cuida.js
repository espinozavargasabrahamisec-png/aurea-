// cuida.js - Funcionalidades específicas para la página de Servicio Técnico

document.addEventListener('DOMContentLoaded', function() {
    // Número de WhatsApp actualizado
    const whatsappNumber = '59177534284';
    const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;
    
    // ================= FUNCIONES DE WHATSAPP ESPECÍFICAS =================
    function enviarWhatsApp(mensaje) {
        const message = encodeURIComponent(mensaje);
        window.open(`${whatsappBaseUrl}?text=${message}`, '_blank');
    }
    
    // ================= FUNCIONES DE BOTONES =================
    window.solicitarServicio = function() {
        enviarWhatsApp("Hola, me gustaría solicitar un SERVICIO TÉCNICO para mis audífonos. ¿Podrían ayudarme?");
    };

    window.llamarEmergencia = function() {
        const confirmar = confirm("¿Desea llamar al servicio de emergencias 24/7?\n\n📞 Teléfono: +591 70111673\n\nPresione 'Aceptar' para llamar o 'Cancelar' para enviar un WhatsApp.");
        if (confirmar) {
            window.location.href = "tel:+59170111673";
        } else {
            enviarWhatsApp("URGENTE: Necesito servicio técnico de EMERGENCIA para mis audífonos");
        }
    };

    window.contactarWhatsApp = function() {
        enviarWhatsApp("URGENTE: Necesito servicio técnico de EMERGENCIA para mis audífonos");
    };

    // ================= CONFIGURACIÓN DE BOTONES =================
    
    // Botón Hero "Solicitar Servicio"
    const btnHeroServicio = document.getElementById('btnHeroServicio');
    if (btnHeroServicio) {
        btnHeroServicio.addEventListener('click', function(e) {
            e.stopPropagation();
            enviarWhatsApp("Hola, me gustaría solicitar un SERVICIO TÉCNICO para mis audífonos. ¿Podrían ayudarme?");
        });
    }

    // Botón Hero "Emergencia 24/7"
    const btnHeroEmergencia = document.getElementById('btnHeroEmergencia');
    if (btnHeroEmergencia) {
        btnHeroEmergencia.addEventListener('click', function(e) {
            e.stopPropagation();
            llamarEmergencia();
        });
    }

    // Botón "Solicitar Reparación" - Primera tarjeta
    const btnReparacion = document.getElementById('btnReparacion');
    if (btnReparacion) {
        btnReparacion.addEventListener('click', function(e) {
            e.stopPropagation();
            enviarWhatsApp("Hola, necesito REPARACIÓN de audífonos. ¿Podrían ayudarme?");
        });
    }

    // Botón "Programar Mantenimiento" - Segunda tarjeta
    const btnMantenimiento = document.getElementById('btnMantenimiento');
    if (btnMantenimiento) {
        btnMantenimiento.addEventListener('click', function(e) {
            e.stopPropagation();
            enviarWhatsApp("Hola, necesito MANTENIMIENTO preventivo para mis audífonos. ¿Podrían ayudarme?");
        });
    }

    // Botón "Llamar Emergencia" - Sección emergencias
    const btnEmergenciaLlamar = document.getElementById('btnEmergenciaLlamar');
    if (btnEmergenciaLlamar) {
        btnEmergenciaLlamar.addEventListener('click', function(e) {
            e.stopPropagation();
            llamarEmergencia();
        });
    }

    // Botón "WhatsApp Urgente" - Sección emergencias
    const btnEmergenciaWhatsApp = document.getElementById('btnEmergenciaWhatsApp');
    if (btnEmergenciaWhatsApp) {
        btnEmergenciaWhatsApp.addEventListener('click', function(e) {
            e.stopPropagation();
            enviarWhatsApp("URGENTE: Necesito servicio técnico de EMERGENCIA para mis audífonos");
        });
    }

    // ================= CONTADOR DE ESTADÍSTICAS ANIMADO =================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const step = Math.ceil(target / (duration / 16)); // 60fps
        
        let current = 0;
        const timer = setInterval(function() {
            current += step;
            if (current >= target) {
                element.textContent = target + (element.getAttribute('data-count') === '5000' ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = current + (element.getAttribute('data-count') === '5000' ? '+' : '');
            }
        }, 16);
    }

    // Observador para animar contadores cuando son visibles
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        observer.observe(number);
    });

    // ================= ANIMACIONES DE TARJETAS =================
    const cards = document.querySelectorAll('.servicio-card, .proceso-step');
    
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardsObserver.observe(card);
    });

    console.log('Página de Servicio Técnico cargada correctamente');
    console.log('WhatsApp configurado para: +59177534284');
    console.log('Mensajes específicos configurados:');
    console.log('1. Botón Hero "Solicitar Servicio": SERVICIO TÉCNICO general');
    console.log('2. Botón "Solicitar Reparación": REPARACIÓN específica');
    console.log('3. Botón "Programar Mantenimiento": MANTENIMIENTO preventivo');
    console.log('4. Botón "WhatsApp Urgente": EMERGENCIA urgente');
    console.log('5. Botón flotante WhatsApp: Enlace directo sin mensaje');
});

// Función auxiliar global para manejar clics en cualquier botón de servicio
function manejarClickServicio(tipoServicio) {
    const whatsappNumber = '59177534284';
    const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;
    
    let mensaje = "";
    
    switch(tipoServicio) {
        case 'reparacion':
            mensaje = "Hola, necesito REPARACIÓN de audífonos. ¿Podrían ayudarme?";
            break;
        case 'mantenimiento':
            mensaje = "Hola, necesito MANTENIMIENTO preventivo para mis audífonos. ¿Podrían ayudarme?";
            break;
        case 'servicio-general':
            mensaje = "Hola, me gustaría solicitar un SERVICIO TÉCNICO para mis audífonos. ¿Podrían ayudarme?";
            break;
        case 'emergencia':
            mensaje = "URGENTE: Necesito servicio técnico de EMERGENCIA para mis audífonos";
            break;
        default:
            mensaje = "Hola, necesito servicio técnico para mis audífonos. ¿Podrían ayudarme?";
    }
    
    const message = encodeURIComponent(mensaje);
    window.open(`${whatsappBaseUrl}?text=${message}`, '_blank');
}