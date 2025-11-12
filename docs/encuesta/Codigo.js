function handleSelection() {
    var hearWell = document.getElementById('hearWell').value;
    var followUp = document.getElementById('followUp');
    if (hearWell === 'no') {
        followUp.classList.remove('hidden');
    } else {
        followUp.classList.add('hidden');
    }
}

function handleSubmit(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de inmediato

    var hearWell = document.getElementById('hearWell').value;

    if (hearWell === 'no') {
        // Mostrar un pop-up recomendando ir a un diagnóstico con SweetAlert2
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Es recomendable que acudas a un diagnóstico con un profesional de la salud auditiva.',
        });
    } else {
        // Mostrar un pop-up de agradecimiento
        Swal.fire({
            icon: 'success',
            title: '¡Gracias!',
            text: 'Gracias por completar la encuesta. No es necesario un diagnóstico adicional.',
        });
    }
}

// Escuchar el envío del formulario
document.getElementById('surveyForm').addEventListener('submit', handleSubmit);

// JavaScript para el funcionamiento del modal del mapa
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el modal de Bootstrap
    const mapaModal = new bootstrap.Modal(document.getElementById('mapaModal'));
    
    // Agregar evento al botón "Ver Mapa"
    const verMapaBtn = document.querySelector('.footer-boton');
    verMapaBtn.addEventListener('click', function() {
        mapaModal.show();
    });
    
    // Mejorar la accesibilidad del modal
    document.getElementById('mapaModal').addEventListener('shown.bs.modal', function () {
        // Enfocar el botón de cerrar cuando se abre el modal
        const closeBtn = this.querySelector('.btn-close');
        closeBtn.focus();
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('mapaModal').classList.contains('show')) {
            mapaModal.hide();
        }
    });
    
    // Mensaje de consola para verificar que el script está cargado
    console.log('Áurea Centro Auditivo - Script cargado correctamente');
});
