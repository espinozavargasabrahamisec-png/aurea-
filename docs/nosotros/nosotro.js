// Seleccionamos todos los items de dropdown
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

    // Cerrar cuando el mouse salga del menu
    menu.addEventListener('mouseleave', () => {
        menu.style.display = 'none';
    });
});

// También cerramos cualquier menú si se hace click fuera
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});
// boton Scroll
const btnTop = document.getElementById('btntop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {  // aparece después de bajar 200px
    btnTop.classList.add('show');
  } else {
    btnTop.classList.remove('show');
  }
});

btnTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
