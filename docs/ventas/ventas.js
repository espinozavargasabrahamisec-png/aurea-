
// ================= FUNCIONES GLOBALES =================
// Funciones básicas que deben estar disponibles inmediatamente

// Cambiar color de audífonos (USANDO event delegation)
document.addEventListener('click', function(e) {
    // Cambio de color
    if (e.target.classList.contains('color-option')) {
        const productId = e.target.getAttribute('data-product');
        const color = e.target.getAttribute('data-color');
        changeColor(productId, color, e.target);
    }
    
    // Botones de audífonos
    if (e.target.classList.contains('boton') && e.target.hasAttribute('data-audifono')) {
        const tipo = e.target.getAttribute('data-audifono');
        mostrarDetallesAudifono(tipo);
    }
});

// Función para cambiar color
function changeColor(productId, color, element) {
    const img = document.getElementById(`producta-img-${productId}`);
    if (!img) return;
    
    const colors = {
        silver: "./ric-plomo.png",
        beige: "./ric-negro.png",
        brown: "./ric-plomo.png",
        black: "./ric-negro.png"
    };
    
    if (colors[color]) {
        img.src = colors[color];
        
        // Resaltar el color seleccionado
        const card = element.closest('.producta-carda');
        if (card) {
            const allSpans = card.querySelectorAll('.color-option');
            allSpans.forEach(span => {
                span.style.border = '2px solid transparent';
                span.style.transform = 'scale(1)';
            });
            
            element.style.border = '2px solid #F4911E';
            element.style.transform = 'scale(1.1)';
        }
    }
}

// Scroll Top
function setupScrollTop() {
    const btn = document.getElementById("btntop");
    if (!btn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            btn.style.display = "block";
            btn.classList.add("show");
        } else {
            btn.style.display = "none";
            btn.classList.remove("show");
        }
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Consultar por WhatsApp
function consultarWhatsApp(modelo) {
    const mensaje = `Hola, estoy interesado en el modelo: ${modelo}. ¿Podrían darme más información?`;
    const whatsappURL = `https://wa.me/59170111673?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappURL, '_blank');
}

// ================= DATOS DE AUDÍFONOS =================
const audifonosData = {
    'compacto': {
        tipo: 'RIC',
        titulo: "Audífono Compacto (RIC)",
        subtitulo: "Diseño minimalista para máxima discreción",
        imagen: "./oidonegro.png",
        descripcion: "Perfecto para quienes buscan una solución auditiva discreta y cómoda sin comprometer la calidad del sonido.",
        caracteristicas: [
            "Tamaño ultra compacto",
            "Procesador digital de 32-bit",
            "Reducción de ruido automática",
            "Batería recargable",
            "Resistente al polvo y salpicaduras"
        ],
        beneficios: [
            "Ideal para uso diario y oficina",
            "Perfecto para primera adaptación",
            "Recomendado para pérdidas leves a moderadas",
            "Excelente relación calidad-precio",
            "Mantenimiento sencillo"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "Digital RIC" },
            { titulo: "Batería", valor: "Hasta 24 horas" },
            { titulo: "Resistencia", valor: "IP67" },
            { titulo: "Peso", valor: "1.2g por unidad" },
            { titulo: "Garantía", valor: "2 años" },
            { titulo: "Colores", valor: "3 opciones" }
        ]
    },
    'estandar': {
        tipo: 'RIC',
        titulo: "Audífono Estándar (RIC)",
        subtitulo: "Tecnología avanzada para sonido superior",
        imagen: "./oidoplomo.png",
        descripcion: "Combina innovación tecnológica con comodidad excepcional para una experiencia auditiva enriquecida.",
        caracteristicas: [
            "Procesador quad-core",
            "Conexión Bluetooth integrada",
            "4 programas de escucha",
            "Micrófono direccional",
            "Carga rápida USB-C"
        ],
        beneficios: [
            "Ideal para actividades sociales",
            "Perfecto para ver TV y escuchar música",
            "Recomendado para pérdidas moderadas",
            "Adaptación automática a entornos",
            "Control mediante app móvil"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "RIC Bluetooth" },
            { titulo: "Batería", valor: "Hasta 30 horas" },
            { titulo: "Resistencia", valor: "IP67" },
            { titulo: "Peso", valor: "1.5g por unidad" },
            { titulo: "Garantía", valor: "3 años" },
            { titulo: "Colores", valor: "5 opciones" }
        ]
    },
    'premium': {
        tipo: 'RIC',
        titulo: "Audífono Premium (RIC)",
        subtitulo: "La excelencia en calidad auditiva",
        imagen: "./D10RIC312Li_P_Pdarkgranite.png",
        descripcion: "La gama más alta de nuestra colección, diseñada para los usuarios más exigentes que buscan lo mejor en tecnología auditiva.",
        caracteristicas: [
            "Procesador octa-core AI",
            "Reducción de ruido inteligente",
            "Conectividad multipunto",
            "Detección de caídas",
            "Traductor en tiempo real"
        ],
        beneficios: [
            "Ideal para viajeros frecuentes",
            "Perfecto para entornos ruidosos",
            "Recomendado para pérdidas severas",
            "Asistente auditivo inteligente",
            "Actualizaciones remotas"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "RIC AI Premium" },
            { titulo: "Batería", valor: "Hasta 40 horas" },
            { titulo: "Conexión", valor: "Bluetooth 5.2" },
            { titulo: "Peso", valor: "1.8g por unidad" },
            { titulo: "Garantía", valor: "5 años" },
            { titulo: "Colores", valor: "7 opciones" }
        ]
    },
    'ileag5': {
        tipo: 'ISEC',
        titulo: "Audífono ISEC Ilea G5",
        subtitulo: "Conectabilidad total con tu mundo digital",
        imagen: "./itc1.png",
        descripcion: "Audífono intrauriculares con conectividad Bluetooth avanzada para una integración perfecta con tus dispositivos digitales.",
        caracteristicas: [
            "Conectividad Bluetooth 5.2",
            "Procesador dual-core",
            "Micrófono direccional adaptativo",
            "Carga rápida inalámbrica",
            "Aplicación de control personalizado"
        ],
        beneficios: [
            "Ideal para usuarios tecnológicos",
            "Perfecto para llamadas y reuniones",
            "Recomendado para pérdidas moderadas",
            "Integración con iOS y Android",
            "Diseño ergonómico personalizado"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "ITC Bluetooth" },
            { titulo: "Batería", valor: "Hasta 28 horas" },
            { titulo: "Conexión", valor: "Bluetooth multipunto" },
            { titulo: "Resistencia", valor: "IP68" },
            { titulo: "Garantía", valor: "3 años" },
            { titulo: "Personalización", valor: "Total" }
        ]
    },
    'quixg4': {
        tipo: 'ISEC',
        titulo: "Audífono ISEC Quix G4",
        subtitulo: "Potencia y resistencia para vida activa",
        imagen: "./itc2.png",
        descripcion: "Diseñado para quienes llevan un estilo de vida activo, con máxima resistencia y potencia auditiva en entornos desafiantes.",
        caracteristicas: [
            "Resistente a agua y polvo IP69",
            "Amplificador de potencia máxima",
            "Reducción de ruido de viento",
            "Batería de larga duración",
            "Diseño robusto y seguro"
        ],
        beneficios: [
            "Ideal para deportistas",
            "Perfecto para actividades al aire libre",
            "Recomendado para pérdidas severas",
            "Resistente a condiciones extremas",
            "Fácil manejo con guantes"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "ITC Potencia" },
            { titulo: "Batería", valor: "Hasta 35 horas" },
            { titulo: "Resistencia", valor: "IP69 (máxima)" },
            { titulo: "Potencia", valor: "140 dB SPL" },
            { titulo: "Garantía", valor: "4 años" },
            { titulo: "Colores", valor: "Opciones deportivas" }
        ]
    },
    'vega': {
        tipo: 'ISEC',
        titulo: "Audífono ISEC Vega",
        subtitulo: "Elegancia y tecnología en un diseño premium",
        imagen: "./itc1.png",
        descripcion: "La combinación perfecta entre diseño elegante y tecnología de vanguardia para usuarios exigentes que buscan discreción y calidad.",
        caracteristicas: [
            "Diseño intrauriculares invisible",
            "Procesador de inteligencia artificial",
            "Cancelación activa de ruido",
            "Carga ultra rápida",
            "Detección automática de entornos"
        ],
        beneficios: [
            "Máxima discreción estética",
            "Ideal para profesionales ejecutivos",
            "Adaptación automática inteligente",
            "Sonido natural en todas situaciones",
            "Mantenimiento mínimo requerido"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "ITC Invisible AI" },
            { titulo: "Batería", valor: "Hasta 32 horas" },
            { titulo: "Tamaño", valor: "Ultra compacto" },
            { titulo: "Procesador", valor: "IA de 4 núcleos" },
            { titulo: "Garantía", valor: "5 años" },
            { titulo: "Material", valor: "Aleación médica" }
        ]
    },
    'bte-marron': {
        tipo: 'BTE',
        titulo: "Audífono BTE Marrón",
        subtitulo: "Comodidad clásica con tecnología moderna",
        imagen: "./negro2.png",
        descripcion: "Audífono retroauricular (BTE) en elegante color marrón, combinando la comodidad del diseño tradicional con tecnología digital avanzada.",
        caracteristicas: [
            "Diseño retroauricular clásico",
            "Procesador digital de alta fidelidad",
            "Amplificación de potencia ajustable",
            "Baterías recargables o desechables",
            "Controles de volumen fáciles de usar"
        ],
        beneficios: [
            "Ideal para usuarios primerizos",
            "Fácil de colocar y quitar",
            "Recomendado para todo tipo de pérdidas",
            "Mantenimiento simple",
            "Opción de baterías intercambiables"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "BTE Digital" },
            { titulo: "Batería", valor: "Hasta 45 horas" },
            { titulo: "Potencia", valor: "Ajustable" },
            { titulo: "Tamaño", valor: "Estándar" },
            { titulo: "Garantía", valor: "2 años" },
            { titulo: "Colores", valor: "Marrón, Beige, Negro" }
        ]
    },
    'bte-beige': {
        tipo: 'BTE',
        titulo: "Audífono BTE Beige",
        subtitulo: "Discreto y natural para piel clara",
        imagen: "./bte.png",
        descripcion: "Color beige diseñado para discretamente fundirse con tonos de piel claros, ofreciendo comodidad y funcionalidad en un diseño tradicional.",
        caracteristicas: [
            "Color discreto beige natural",
            "Amplificador digital programable",
            "Reducción de retroalimentación",
            "Micrófono omnidireccional",
            "Indicador de batería baja"
        ],
        beneficios: [
            "Discreto en piel clara",
            "Ideal para uso prolongado",
            "Perfecto para pérdidas moderadas-severas",
            "Fácil manejo para personas mayores",
            "Durabilidad comprobada"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "BTE Programable" },
            { titulo: "Batería", valor: "Hasta 50 horas" },
            { titulo: "Amplificación", valor: "Hasta 130 dB" },
            { titulo: "Peso", valor: "4.5g por unidad" },
            { titulo: "Garantía", valor: "3 años" },
            { titulo: "Incluye", valor: "Estuche y accesorios" }
        ]
    },
    'bte-negro': {
        tipo: 'BTE',
        titulo: "Audífono BTE Negro",
        subtitulo: "Estilo moderno con máxima resistencia",
        imagen: "./bte1.png",
        descripcion: "Diseño en negro elegante y moderno, construido para durar y ofrecer un rendimiento confiable en todas las condiciones.",
        caracteristicas: [
            "Color negro elegante",
            "Carcasa resistente a impactos",
            "Procesador de ruido adaptativo",
            "Conector universal para accesorios",
            "Sistema de secado automático"
        ],
        beneficios: [
            "Estilo moderno y profesional",
            "Ideal para uso diario exigente",
            "Resistente a golpes y caídas",
            "Compatible con accesorios",
            "Fácil limpieza y mantenimiento"
        ],
        especificaciones: [
            { titulo: "Tecnología", valor: "BTE Resistente" },
            { titulo: "Batería", valor: "Hasta 55 horas" },
            { titulo: "Resistencia", valor: "IP67" },
            { titulo: "Material", valor: "Policarbonato reforzado" },
            { titulo: "Garantía", valor: "4 años" },
            { titulo: "Accesorios", valor: "Kit completo incluido" }
        ]
    }
};

// ================= FUNCIONES DE AUDÍFONOS =================
let audifonoActual = null;

// Mostrar detalles del audífono
function mostrarDetallesAudifono(tipo) {
    const audifono = audifonosData[tipo];
    if (!audifono) {
        console.error('Audífono no encontrado:', tipo);
        return;
    }

    audifonoActual = audifono;

    // Llenar datos en el modal
    document.getElementById('modalAudifonoTitulo').textContent = audifono.titulo;
    document.getElementById('modalAudifonoSubtitulo').textContent = audifono.subtitulo;
    document.getElementById('modalAudifonoDescripcion').textContent = audifono.descripcion;
    document.getElementById('modalAudifonoImagen').src = audifono.imagen;
    
    // Llenar características
    const caracteristicasList = document.getElementById('modalAudifonoCaracteristicas');
    caracteristicasList.innerHTML = '';
    audifono.caracteristicas.forEach(caracteristica => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle me-2 text-aurea-orange"></i>${caracteristica}`;
        li.className = 'mb-2';
        caracteristicasList.appendChild(li);
    });
    
    // Llenar beneficios
    const beneficiosList = document.getElementById('modalAudifonoBeneficios');
    beneficiosList.innerHTML = '';
    audifono.beneficios.forEach(beneficio => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-user-check me-2 text-success"></i>${beneficio}`;
        li.className = 'mb-2';
        beneficiosList.appendChild(li);
    });
    
    // Llenar especificaciones
    const especificacionesContainer = document.getElementById('modalEspecificaciones');
    especificacionesContainer.innerHTML = '';
    audifono.especificaciones.forEach(spec => {
        const div = document.createElement('div');
        div.className = 'spec-item';
        div.innerHTML = `
            <strong>${spec.titulo}</strong>
            <span>${spec.valor}</span>
        `;
        especificacionesContainer.appendChild(div);
    });
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('audifonoModal'));
    modal.show();
}

// Agendar cita
function agendarCita() {
    if (!audifonoActual) return;
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('audifonoModal'));
    if (modal) modal.hide();
    
    mostrarImagenModal(audifonoActual.imagen, 'Agendar Cita - ' + audifonoActual.titulo);
}

// Solicitar prueba
function solicitarPrueba() {
    if (!audifonoActual) return;
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('audifonoModal'));
    if (modal) modal.hide();
    
    mostrarImagenModal(audifonoActual.imagen, 'Solicitar Prueba - ' + audifonoActual.titulo);
}

// Mostrar imagen en modal
function mostrarImagenModal(rutaImagen, titulo) {
    const modalImagen = new bootstrap.Modal(document.getElementById('imagenModal'));
    const modalTitle = document.getElementById('imagenModalLabel');
    const modalBody = document.getElementById('imagenModalBody');
    
    modalTitle.textContent = titulo;
    modalBody.innerHTML = `
        <div class="text-center">
            <img src="${rutaImagen}" alt="${titulo}" class="img-fluid rounded shadow-lg mb-4" style="max-height: 60vh;">
            <div class="info-box bg-light p-4 rounded">
                <h5 class="text-aurea-granate mb-3">${titulo.includes('Agendar') ? 'Proceso para Agendar Cita' : 'Proceso de Prueba Gratuita'}</h5>
                ${titulo.includes('Agendar') ? generarContenidoAgendar() : generarContenidoPrueba()}
            </div>
            <div class="mt-4">
                <button type="button" class="btn btn-aurea" onclick="contactarAhora()">
                    <i class="fas fa-phone me-2"></i>Contactar Ahora
                </button>
                <button type="button" class="btn btn-outline-aurea-granate ms-2" data-bs-dismiss="modal">
                    <i class="fas fa-times me-2"></i>Cerrar
                </button>
            </div>
        </div>
    `;
    
    modalImagen.show();
}

// Funciones auxiliares
function generarContenidoAgendar() {
    return `
        <div class="text-start">
            <p class="mb-2"><i class="fas fa-calendar-check me-2 text-aurea-orange"></i><strong>Paso 1:</strong> Elija fecha y hora conveniente</p>
            <p class="mb-2"><i class="fas fa-user-md me-2 text-aurea-orange"></i><strong>Paso 2:</strong> Evaluación auditiva profesional</p>
            <p class="mb-2"><i class="fas fa-stethoscope me-2 text-aurea-orange"></i><strong>Paso 3:</strong> Diagnóstico personalizado</p>
            <p class="mb-2"><i class="fas fa-cogs me-2 text-aurea-orange"></i><strong>Paso 4:</strong> Selección del modelo adecuado</p>
            <p class="mb-0"><i class="fas fa-clock me-2 text-aurea-orange"></i><strong>Duración:</strong> 60-90 minutos</p>
        </div>
    `;
}

function generarContenidoPrueba() {
    return `
        <div class="text-start">
            <p class="mb-2"><i class="fas fa-hearing me-2 text-aurea-orange"></i><strong>Paso 1:</strong> Prueba auditiva gratuita</p>
            <p class="mb-2"><i class="fas fa-headphones me-2 text-aurea-orange"></i><strong>Paso 2:</strong> Adaptación del audífono</p>
            <p class="mb-2"><i class="fas fa-home me-2 text-aurea-orange"></i><strong>Paso 3:</strong> Prueba en su entorno por 7 días</p>
            <p class="mb-2"><i class="fas fa-chart-line me-2 text-aurea-orange"></i><strong>Paso 4:</strong> Ajustes y seguimiento</p>
            <p class="mb-0"><i class="fas fa-shield-alt me-2 text-aurea-orange"></i><strong>Ventaja:</strong> Sin compromiso de compra</p>
        </div>
    `;
}

function contactarAhora() {
    const modalImagen = bootstrap.Modal.getInstance(document.getElementById('imagenModal'));
    if (modalImagen) modalImagen.hide();
    
    const mensaje = `Puede contactarnos por:\n\n` +
          `📞 Llamada directa: +591 70111673\n` +
          `📧 Email: contacto@aureamed.com.bo\n` +
          `📍 Visita: Av. Arce Nro.2652, La Paz\n\n` +
          `Horarios de atención:\n` +
          `Lunes y Miércoles: 15:00 - 19:00\n` +
          `Martes y Jueves: 10:00 - 18:00\n` +
          `Viernes: 14:00 - 18:00`;
    
    alert(mensaje);
}

// ================= POPUP DE SALIDA =================
function setupExitPopup() {
    let mouseLeaving = false;
    let exitModalShown = false;
    let exitTimeout;
    
    // Detectar cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !mouseLeaving && !exitModalShown) {
            mouseLeaving = true;
            
            exitTimeout = setTimeout(() => {
                if (mouseLeaving && !exitModalShown) {
                    mostrarExitModal();
                }
            }, 500);
        }
    });
    
    // Detectar cuando el mouse vuelve
    document.addEventListener('mouseenter', function() {
        mouseLeaving = false;
        clearTimeout(exitTimeout);
    });
    
    // Detectar tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !exitModalShown) {
            e.preventDefault();
            mostrarExitModal();
        }
    });
    
    // Manejar envío del formulario
    const exitForm = document.getElementById('exitLeadForm');
    if (exitForm) {
        exitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora solo mostramos un mensaje
            alert('¡Gracias! Te enviaremos tu descuento por correo.');
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('exitModal'));
            if (modal) modal.hide();
            exitModalShown = false;
            
            // Resetear formulario
            this.reset();
        });
    }
}

function mostrarExitModal() {
    const exitModalElement = document.getElementById('exitModal');
    if (!exitModalElement) return;
    
    const exitModal = new bootstrap.Modal(exitModalElement);
    exitModal.show();
    exitModalShown = true;
    
    exitModalElement.addEventListener('hidden.bs.modal', function() {
        exitModalShown = false;
    });
}

// ================= INICIALIZACIÓN =================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de ventas AUREA cargada correctamente');
    
    // Configurar funcionalidades
    setupScrollTop();
    setupExitPopup();
    
    // Configurar botones del modal de audífonos
    document.getElementById('btnAgendarCita').addEventListener('click', agendarCita);
    document.getElementById('btnSolicitarPrueba').addEventListener('click', solicitarPrueba);
    
    // Inicializar colores seleccionados
    document.querySelectorAll('.color-option').forEach(option => {
        option.style.border = '2px solid transparent';
        option.style.transform = 'scale(1)';
    });
});
