
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

    // Ocultar inicialmente
    menu.style.display = 'none';

    // Abrir/Cerrar con toggle
    item.addEventListener('click', (e) => {
        e.stopPropagation();

        const isOpen = menu.style.display === 'block';

        // Cerrar todos los menús primero
        document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');

        // Reabrir solo si no estaba ya abierto
        if (!isOpen) {
            menu.style.display = 'block';
        }
    });
});

// Cerrar al hacer click fuera
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});
// Scrul ubicaciones 
function scrollToHash() {
    const hash = window.location.hash;
    if(hash) {
        const target = document.querySelector(hash);
        if(target){
            const offset = 70; // Ajusta según altura de tu navbar fixed-top
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }
}

// Scrul cuando cargue Ubicaciones
window.addEventListener('load', scrollToHash);