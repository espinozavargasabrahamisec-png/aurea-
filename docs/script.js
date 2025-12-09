// Reparar error Abraham
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>


  (function() {
    emailjs.init("contacto@aureamed.com.bo"); // <- Lo reemplazas
  })();

  document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.send(" contacto@aureamed.com.bo", "TU_TEMPLATE_ID", {
      nombre: document.getElementById("nombre").value,
      correo: document.getElementById("correo").value,
      telefono: document.getElementById("telefono").value,
      asunto: document.getElementById("asunto").value,
      mensaje: document.getElementById("mensaje").value
    })
    .then(function() {
        alert("Mensaje enviado con éxito");
    }, function(error) {
        alert("Error al enviar: " + JSON.stringify(error));
    });
  });

    // ================= CONTADOR DE ESTADÍSTICAS ANIMADO =================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; 
        const step = Math.ceil(target / (duration / 16));
        const plus = element.getAttribute('data-plus') === 'true' ? '+' : '';
        
        let current = 0;
        const timer = setInterval(function() {
            current += step;
            if (current >= target) {
                element.textContent = plus + target;
                clearInterval(timer);
            } else {
                element.textContent = plus + current;
            }
        }, 16);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => observer.observe(number));
