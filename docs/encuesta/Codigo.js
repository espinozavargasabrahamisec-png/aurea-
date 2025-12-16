// Función para manejar la selección de "¿Escuchas bien?"
function handleSelection() {
    var hearWell = document.getElementById('hearWell').value;
    var followUp = document.getElementById('followUp');
    
    if (hearWell === 'no') {
        followUp.classList.remove('hidden');
        // Hacer el campo de detalles requerido si es visible
        document.getElementById('details').required = true;
    } else {
        followUp.classList.add('hidden');
        // Quitar el requerido si está oculto
        document.getElementById('details').required = false;
    }
}

// Función para manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();

    // Validar que todos los campos requeridos estén completos
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });

    if (!isValid) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos requeridos.',
        });
        return;
    }

    var hearWell = document.getElementById('hearWell').value;

    if (hearWell === 'no') {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            html: `
                <div style="text-align: left; padding: 10px;">
                    <p style="margin-bottom: 15px; font-size: 16px;">Es recomendable que acudas a un diagnóstico con un profesional de la salud auditiva.</p>
                    <p style="margin-bottom: 20px; font-size: 16px;"><strong>Áurea Centro Auditivo</strong> puede ayudarte con una evaluación completa.</p>
                    
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #8B2C2C;">
                        <p style="margin: 0; font-weight: 600; color: #8B2C2C;">📊 Evaluación recomendada:</p>
                        <p style="margin: 8px 0 0 0; color: #555;">Consulta con nuestros especialistas para una <strong>audiometría completa</strong>.</p>
                    </div>
                    
                    <div style="margin-top: 25px; text-align: center;">
                        <p style="margin-bottom: 15px; color: #555; font-size: 14px;">¿Te gustaría agendar una cita o pedir más información?</p>
                        
                        <a href="https://wa.me/59170111673?text=Hola%20Áurea%20Centro%20Auditivo%2C%20vine%20de%20su%20página%20web%20y%20quiero%20agendar%20una%20audiometría%20completa.%20¿Podrían%20ayudarme%3F" 
                           target="_blank" 
                           style="display: inline-flex; align-items: center; gap: 8px; background-color: #25D366; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; margin-bottom: 10px;">
                            <i class="fab fa-whatsapp" style="font-size: 20px;"></i>
                            <span>Contactar por WhatsApp</span>
                            <span style="font-size: 18px;">→</span>
                        </a>
                        
                        <p style="margin-top: 10px; color: #666; font-size: 13px;">
                            <i class="fas fa-clock"></i> Horario de atención: Lunes a Viernes
                        </p>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Cerrar',
            cancelButtonText: 'Agendar más tarde',
            confirmButtonColor: '#8B2C2C',
            cancelButtonColor: '#6c757d',
            width: '600px'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario cierra, mantener el formulario lleno
                console.log('Formulario completado, datos listos para revisión');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Si el usuario elige "Agendar más tarde", mostrar recordatorio
                Swal.fire({
                    icon: 'info',
                    title: 'No te olvides',
                    text: 'Tu salud auditiva es importante. Recuerda agendar tu evaluación cuando puedas.',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#8B2C2C'
                });
            }
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por completar la encuesta!',
            html: `
                <div style="text-align: center; padding: 10px;">
                    <p style="margin-bottom: 15px; font-size: 16px;">Según tus respuestas, no parece necesario un diagnóstico adicional en este momento.</p>
                    
                    <div style="background: #f0f8f0; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
                        <p style="margin: 0; font-weight: 600; color: #28a745;">✅ Buenas noticias</p>
                        <p style="margin: 8px 0 0 0; color: #555;">Tu audición parece estar en buen estado. Te recomendamos realizar chequeos periódicos.</p>
                    </div>
                    
                    <div style="margin-top: 20px;">
                        <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                            ¿Tienes dudas o quieres un chequeo preventivo?
                        </p>
                        
                        <a href="https://wa.me/59170111673?text=Hola%20Áurea%20Centro%20Auditivo%2C%20vine%20de%20su%20página%20web%20y%20quiero%20información%20sobre%20chequeos%20preventivos%20de%20audición.%20¿Podrían%20ayudarme%3F" 
                           target="_blank" 
                           style="display: inline-flex; align-items: center; gap: 8px; background-color: #25D366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; font-size: 14px;">
                            <i class="fab fa-whatsapp"></i>
                            <span>Consultar por prevención</span>
                            <span style="font-size: 16px;">→</span>
                        </a>
                    </div>
                </div>
            `,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#28a745',
            width: '550px'
        }).then((result) => {
            if (result.isConfirmed) {
                // Opcional: redirigir o resetear el formulario
                document.getElementById('surveyForm').reset();
                handleSelection(); // Resetear también la visibilidad del campo followUp
            }
        });
    }
}

// Función para inicializar la encuesta
function initializeSurvey() {
    // Agregar evento al formulario
    const form = document.getElementById('surveyForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('No se encontró el formulario con id "surveyForm"');
    }
    
    // Inicializar el estado del campo followUp
    handleSelection();
    
    // Agregar validación en tiempo real a los campos requeridos
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });
    
    // Mejorar la experiencia del rango
    const rangeInput = document.getElementById('audioClarity');
    const rangeValue = document.getElementById('rangeValue');
    
    if (rangeInput && rangeValue) {
        rangeInput.addEventListener('input', function() {
            rangeValue.textContent = this.value;
            
            // Cambiar color basado en el valor
            if (this.value < 30) {
                rangeValue.style.color = '#dc3545';
            } else if (this.value < 70) {
                rangeValue.style.color = '#ffc107';
            } else {
                rangeValue.style.color = '#28a745';
            }
        });
        
        // Inicializar el color del rango
        rangeInput.dispatchEvent(new Event('input'));
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeSurvey();
    
    // Inicializar el modal de Bootstrap para el mapa
    const mapaModalElement = document.getElementById('mapaModal');
    if (mapaModalElement) {
        const mapaModal = new bootstrap.Modal(mapaModalElement);
        
        // Mejorar la accesibilidad del modal
        mapaModalElement.addEventListener('shown.bs.modal', function () {
            const closeBtn = this.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.focus();
            }
        });
    }
    
    // Mensaje de consola para desarrollo
    console.log('Encuesta de Audición - Áurea Centro Auditivo');
    console.log('Script cargado correctamente');
});