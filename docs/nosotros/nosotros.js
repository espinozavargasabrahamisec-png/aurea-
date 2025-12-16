
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