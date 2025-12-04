// ventas.js - Solo consulta por WhatsApp, sin precios

document.addEventListener('DOMContentLoaded', function() {
    // FUNCIÓN PARA CAMBIAR COLORES
    window.changeColor = function(productId, color) {
        const productImage = document.getElementById(`producta-img-${productId}`);
        
        // Mapeo de colores a imágenes
        const colorImages = {
            silver: "./ric-plomo.png",
            beige: "./ric-negro.png",
            
        };
        
        if (colorImages[color]) {
            productImage.src = colorImages[color];
            
            // Resaltar el color seleccionado
            const card = event.target.closest('.producta-carda');
            const allSpans = card.querySelectorAll('.color-option');
            allSpans.forEach(span => {
                span.style.border = '2px solid transparent';
                span.style.transform = 'scale(1)';
            });
            
            event.target.style.border = '2px solid #F4911E';
            event.target.style.transform = 'scale(1.1)';
        }
    };

    

    console.log('Página cargada - Consultas por WhatsApp configuradas');
});

// ventas.js - Actualizado con todos los modelos RIC, ISEC y BTE

document.addEventListener('DOMContentLoaded', function() {
    // ================= DATOS DE TODOS LOS AUDÍFONOS =================
    const audifonos = {
        // AUDÍFONOS RIC (originales)
        'compacto': {
            tipo: 'RIC',
            titulo: "Audífono Compacto (RIC)",
            subtitulo: "Diseño minimalista para máxima discreción",
            imagen: "./oidonegro.png",
            imagenAgendar: "./oidonegro.png",
            imagenPrueba: "./oidonegro.png",
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
            imagenAgendar: "./oidoplomo.png",
            imagenPrueba: "./oidoplomo.png",
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
            imagenAgendar: "./cita-audifono.jpg",
            imagenPrueba: "./prueba-auditiva.jpg",
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
        
        // AUDÍFONOS ISEC
        'ileag5': {
            tipo: 'ISEC',
            titulo: "Audífono ISEC Ilea G5",
            subtitulo: "Conectabilidad total con tu mundo digital",
            imagen: "./itc1.png",
            imagenAgendar: "./cita-audifono.jpg",
            imagenPrueba: "./prueba-auditiva.jpg",
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
            imagenAgendar: "./itc2.png",
            imagenPrueba: "./itc2.png",
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
                { titulo: "Garantía", valor: "1 años" },
                { titulo: "Colores", valor: "Opciones deportivas" }
            ]
        },
        'vega': {
            tipo: 'ISEC',
            titulo: "Audífono ISEC Vega",
            subtitulo: "Elegancia y tecnología en un diseño premium",
            imagen: "./itc1.png",
            imagenAgendar: "./itc1.png",
            imagenPrueba: "./itc1.png",
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
                { titulo: "Garantía", valor: "1 años " },
                { titulo: "Material", valor: "Aleación médica" }
            ]
        },
        
        // AUDÍFONOS BTE (Nuevos modelos)
        'bte-marron': {
            tipo: 'BTE',
            titulo: "Audífono BTE Marrón",
            subtitulo: "Comodidad clásica con tecnología moderna",
            imagen: "./negro2.png",
            imagenAgendar: "./negro2.png",
            imagenPrueba: "./negro2.png",
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
            imagenAgendar: "./bte.png",
            imagenPrueba: "./bte.png",
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
            imagenAgendar: "./bte1.png",
            imagenPrueba: "./bte1.png",
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

    // Variable para almacenar el audífono actual
    let audifonoActual = null;

    // ================= FUNCIONES PRINCIPALES =================

    // FUNCIÓN PARA MOSTRAR DETALLES DEL AUDÍFONO (TODOS LOS MODELOS)
    window.mostrarDetallesAudifono = function(tipo) {
        const audifono = audifonos[tipo];
        if (!audifono) {
            console.error('Audífono no encontrado:', tipo);
            return;
        }

        audifonoActual = audifono; // Guardar referencia al audífono actual

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
    };

    // FUNCIÓN PARA AGENDAR CITA - Muestra imagen
    window.agendarCita = function() {
        if (!audifonoActual) return;
        
        // Cerrar modal actual
        const modal = bootstrap.Modal.getInstance(document.getElementById('audifonoModal'));
        if (modal) modal.hide();
        
        // Mostrar imagen en modal
        mostrarImagenModal(audifonoActual.imagenAgendar, 'Agendar Cita - ' + audifonoActual.titulo);
    };

    // FUNCIÓN PARA SOLICITAR PRUEBA - Muestra imagen
    window.solicitarPrueba = function() {
        if (!audifonoActual) return;
        
        // Cerrar modal actual
        const modal = bootstrap.Modal.getInstance(document.getElementById('audifonoModal'));
        if (modal) modal.hide();
        
        // Mostrar imagen en modal
        mostrarImagenModal(audifonoActual.imagenPrueba, 'Solicitar Prueba - ' + audifonoActual.titulo);
    };

    // FUNCIÓN PARA MOSTRAR IMAGEN EN MODAL
    function mostrarImagenModal(rutaImagen, titulo) {
        // Configurar el modal de imagen
        const modalImagen = new bootstrap.Modal(document.getElementById('imagenModal'));
        const modalTitle = document.getElementById('imagenModalLabel');
        const modalBody = document.getElementById('imagenModalBody');
        
        // Llenar el modal de imagen
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
        
        // Mostrar modal de imagen
        modalImagen.show();
    };

    // FUNCIONES AUXILIARES PARA CONTENIDO
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

    // FUNCIÓN PARA CONTACTAR AHORA
    window.contactarAhora = function() {
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
    };

    // ================= INICIALIZACIÓN =================

    // Configurar eventos para botones del modal
    document.addEventListener('click', function(e) {
        // Detectar clic en botón Agendar Cita
        if (e.target.closest('#btnAgendarCita')) {
            e.preventDefault();
            agendarCita();
        }
        
        // Detectar clic en botón Solicitar Prueba
        if (e.target.closest('#btnSolicitarPrueba')) {
            e.preventDefault();
            solicitarPrueba();
        }
    });

    // Configurar eventos para todos los botones de audífonos
    const botonesAudifonos = document.querySelectorAll('.audifono-item .boton');
    botonesAudifonos.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el tipo del audífono según el texto del botón
            const textoBoton = this.getAttribute('onclick');
            let tipo = '';
            
            // Buscar el tipo en el atributo onclick
            if (textoBoton) {
                if (textoBoton.includes("'compacto'")) tipo = 'compacto';
                else if (textoBoton.includes("'estandar'")) tipo = 'estandar';
                else if (textoBoton.includes("'premium'")) tipo = 'premium';
                else if (textoBoton.includes("'ileag5'")) tipo = 'ileag5';
                else if (textoBoton.includes("'quixg4'")) tipo = 'quixg4';
                else if (textoBoton.includes("'vega'")) tipo = 'vega';
                else if (textoBoton.includes("'bte-marron'")) tipo = 'bte-marron';
                else if (textoBoton.includes("'bte-beige'")) tipo = 'bte-beige';
                else if (textoBoton.includes("'bte-negro'")) tipo = 'bte-negro';
            }
            
            // Si no se encuentra en onclick, intentar por el título o imagen
            if (!tipo) {
                const audifonoItem = this.closest('.audifono-item');
                const titulo = audifonoItem.querySelector('h3').textContent;
                const imgSrc = audifonoItem.querySelector('img').getAttribute('src');
                
                // Detectar por título
                if (titulo.includes('Compacto') || titulo.includes('RIC') && titulo.includes('Compacto')) tipo = 'compacto';
                else if (titulo.includes('Estándar') || titulo.includes('RIC') && titulo.includes('Estándar')) tipo = 'estandar';
                else if (titulo.includes('Premium') || titulo.includes('RIC') && titulo.includes('Premium')) tipo = 'premium';
                else if (titulo.includes('Ilea')) tipo = 'ileag5';
                else if (titulo.includes('Quix')) tipo = 'quixg4';
                else if (titulo.includes('Vega')) tipo = 'vega';
                else if (titulo.includes('BTE') && titulo.includes('Marrón')) tipo = 'bte-marron';
                else if (titulo.includes('BTE') && titulo.includes('Beige')) tipo = 'bte-beige';
                else if (titulo.includes('BTE') && titulo.includes('Negro')) tipo = 'bte-negro';
                
                // Detectar por imagen
                if (!tipo) {
                    if (imgSrc.includes('BTE_HP_Pbrown')) tipo = 'bte-marron';
                    else if (imgSrc.includes('BTE_HP_Pbeige')) tipo = 'bte-beige';
                    else if (imgSrc.includes('BTE_HP_N')) tipo = 'bte-negro';
                }
            }
            
            if (tipo) {
                mostrarDetallesAudifono(tipo);
            } else {
                console.warn('No se pudo identificar el tipo de audífono');
            }
        });
    });

    console.log('Página cargada - Sistema con 9 audífonos configurado (RIC, ISEC, BTE)');
});