// Navbar toggle responsive
const toggler = document.querySelector('.navbar-toggler');
const nav = document.querySelector('.navbar-nav');

toggler.addEventListener('click', () => {
    nav.classList.toggle('active');
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