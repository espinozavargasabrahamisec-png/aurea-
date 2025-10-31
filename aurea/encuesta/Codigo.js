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
