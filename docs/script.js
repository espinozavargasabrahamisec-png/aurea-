/* ===============================
   🚀 Enviar formulario con Fetch
   =============================== */
function enviarFormulario(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch('guardar_comentario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.body.innerHTML = data;
    })
    .catch(error => {
        alert('❌ Error: ' + error);
    });
}

