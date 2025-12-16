
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
// Cerrar menú  (móvil)
document.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
    }
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
}document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

// Detectar elementos del menú hamburguesa (Bootstrap)
const navToggle = document.querySelector('.navbar-toggler');  // botón hamburguesa
const navMenu = document.querySelector('#navbarNavDropdown'); // menú que se despliega

// Asegura que Bootstrap actualice clases correctamente cuando se cierre desde JS
function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');          // cierra menú
        navToggle.classList.add('collapsed');      // reinicia icono hamburguesa
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Cerrar menú y dropdowns al hacer scroll
window.addEventListener('scroll', () => {

    // Cerrar todos los dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });

    // Cerrar menú hamburguesa
    closeMobileMenu();
});

//cierre del menu al quitar el mouse
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    const menu = item.querySelector('.dropdown-menu');
    if (!menu) return;

    let closeTimeout;

    // Cuando el mouse sale del área del item → iniciar cierre
    item.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => {
            menu.style.display = 'none';
        }, 250); // tiempo para evitar cierre prematuro
    });

    // Si vuelve a entrar antes de cerrarse → cancelar cierre
    item.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
    });

    // Lo mismo para el menú por si entra directo ahí
    menu.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
    });

    menu.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => {
            menu.style.display = 'none';
        }, 250);
    });
});


// Scrul cuando cargue Ubicaciones
window.addEventListener('load', scrollToHash);