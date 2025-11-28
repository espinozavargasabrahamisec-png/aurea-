 // Script para el botón de scroll top
        document.getElementById('btntop').addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
        
        window.addEventListener('scroll', function() {
            var btn = document.getElementById('btntop');
            if (window.scrollY > 300) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });