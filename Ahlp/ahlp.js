// Archivo ahlp.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página AHLP cargada correctamente ✅");

  // Pequeño efecto al hacer scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  });
});
