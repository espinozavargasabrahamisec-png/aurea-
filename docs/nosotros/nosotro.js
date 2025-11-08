// Animaciones al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(el => observer.observe(el));
    
    // Efectos para los botones de empresas
    const empresaButtons = document.querySelectorAll(".btn-empresa");
    empresaButtons.forEach(button => {
        button.addEventListener("click", function() {
            const empresaName = this.parentElement.querySelector("h3").textContent;
            alert(`Próximamente más información sobre: ${empresaName}`);
        });
    });
});