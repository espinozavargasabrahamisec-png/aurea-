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
                <p>Es recomendable que acudas a un diagnóstico con un profesional de la salud auditiva.</p>
                <p><strong>Áurea Centro Auditivo</strong> puede ayudarte con una evaluación completa.</p>
            `,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#851111'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por completar la encuesta!',
            text: 'Según tus respuestas, no parece necesario un diagnóstico adicional en este momento.',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#28a745'
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
    document.getElementById('surveyForm').addEventListener('submit', handleSubmit);
    
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeSurvey();
    
    // Inicializar el modal de Bootstrap para el mapa
    const mapaModal = new bootstrap.Modal(document.getElementById('mapaModal'));
    
    // Agregar evento al botón "Ver Mapa" en el footer
    const verMapaBtn = document.querySelector('.footer-boton');
    if (verMapaBtn) {
        verMapaBtn.addEventListener('click', function() {
            mapaModal.show();
        });
    }
    
    // Mejorar la accesibilidad del modal
    document.getElementById('mapaModal').addEventListener('shown.bs.modal', function () {
        const closeBtn = this.querySelector('.btn-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    });
    
    // Mensaje de consola para desarrollo
    console.log('Encuesta de Audición - Áurea Centro Auditivo');
    console.log('Script cargado correctamente');
});

// Función para exportar datos (opcional, para uso futuro)
function exportSurveyData() {
    const formData = new FormData(document.getElementById('surveyForm'));
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Función para calcular resultado preliminar (opcional)
function calculatePreliminaryResult() {
    const data = exportSurveyData();
    let score = 0;
    
    // Lógica simple de puntuación (puede ser más compleja)
    if (data.hearWell === 'yes') score += 30;
    if (data.hearingIssues === 'No') score += 20;
    if (data.familyHistory === 'No') score += 15;
    if (data.consultation === 'Sí') score += 10;
    if (data.hearingAid === 'No') score += 10;
    
    return {
        score: score,
        interpretation: score >= 60 ? 'Buen estado auditivo' : 
                       score >= 40 ? 'Estado auditivo regular' : 
                       'Se recomienda evaluación profesional'
    };
}