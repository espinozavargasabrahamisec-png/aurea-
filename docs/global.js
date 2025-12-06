/* ===============================
   🔼 BOTÓN SCROLL HACIA ARRIBA
   =============================== */
const btnTop = document.getElementById("btntop");

window.addEventListener("scroll", () => {
    btnTop.classList.toggle("show", window.scrollY > 200);
});

btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ===============================
   📌 SCROLL A ANCLAS CON OFFSET
   =============================== */
function smoothScrollWithOffset(targetID) {
    const target = document.querySelector(targetID);
    if (!target) return;

    const offset = 70; // Altura navbar
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    
    window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
    });
}

// Detectar si la URL tiene #hash al cargar
window.addEventListener("load", () => {
    if (window.location.hash) {
        smoothScrollWithOffset(window.location.hash);
    }
});

// Scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") return;
        
        if (document.querySelector(href)) {
            e.preventDefault();
            smoothScrollWithOffset(href);
        }
    });
});


/* ===============================
   📱 CERRAR NAV EN MÓVIL AL CLIC
   =============================== */
const navBar = document.getElementById("navbarNavDropdown");

document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
        const isShown = navBar.classList.contains("show");
        if (isShown) {
            const bsCollapse = new bootstrap.Collapse(navBar, { toggle: false });
            bsCollapse.hide();
        }
    });
});
