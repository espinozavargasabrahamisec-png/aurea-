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
    item.addEventListener('mouseleave', () => {
      const menu = item.querySelector('.dropdown-menu');
      const bsDropdown = bootstrap.Dropdown.getInstance(
        item.querySelector('[data-bs-toggle="dropdown"]')
      );
      if (bsDropdown && menu.classList.contains('show')) {
        bsDropdown.hide();
      }
    });
  });