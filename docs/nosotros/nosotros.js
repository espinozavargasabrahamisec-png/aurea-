// Botón scroll to top
const btnTop = document.getElementById('btntop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnTop.classList.add('show');
    } else {
        btnTop.classList.remove('show');
    }
});

btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mejorar la experiencia de los dropdowns
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const dropdownMenu = this.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.add('show');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const dropdownMenu = this.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
            }
        });
    });
});

// Toast personalizado (opcional)
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 400);
    }, 3000);
}