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


/* ===============================
   🔼 Botón Scroll hacia arriba
   =============================== */
const btnTop = document.getElementById("btntop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        btnTop.classList.add("show");
    } else {
        btnTop.classList.remove("show");
    }
});

btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ===============================
   📌 Menús desplegables (dropdown)
   =============================== */
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    const menu = item.querySelector('.dropdown-menu');
    if (!menu) return;

    // Inicialmente cerrado
    menu.style.display = 'none';

    // Abrir al hacer click
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = 'block';
    });

    // Cerrar al salir el mouse
    menu.addEventListener('mouseleave', () => {
        menu.style.display = 'none';
    });
});

// Cerrar menús al hacer click fuera
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});
