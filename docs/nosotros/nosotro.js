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
/* boton Scrull */
const btntop=document.getElementById("btntop");
window.addEventListener("scroll",function(){
    if(window.scrollY>300){
        btntop.style.display="block";
    }else{
        btntop.style.display="none";
    }
});


btntop.addEventListener("click",function(){
window.scrollTo({
    top:0,
    behavior: "smooth"
});
});
/* Cierre del menu automatico */
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
  const menu = item.querySelector('.dropdown-menu');
  let timeout;
  item.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      menu.classList.remove('show');
    }, 300); //retardo al cerrar
  });
});