
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>


  (function() {
    emailjs.init("contacto@aureamed.com.bo"); // <- Lo reemplazas
  })();

  document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.send(" contacto@aureamed.com.bo", "TU_TEMPLATE_ID", {
      nombre: document.getElementById("nombre").value,
      correo: document.getElementById("correo").value,
      asunto: document.getElementById("asunto").value,
      mensaje: document.getElementById("mensaje").value
    })
    .then(function() {
        alert("Mensaje enviado con éxito");
    }, function(error) {
        alert("Error al enviar: " + JSON.stringify(error));
    });
  });

