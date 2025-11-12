// Animación simple de fade-in al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const fadeElems = document.querySelectorAll('.text-content, .image-box, .card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease';
            }
        });
    }, { threshold: 0.2 });

    fadeElems.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
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