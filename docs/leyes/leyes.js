 document.addEventListener('DOMContentLoaded', () => {
            // Botón Scroll Top
            const btntop = document.createElement("button");
            btntop.className = "acroll";
            btntop.innerHTML = "↑";
            btntop.id = "btntop";
            document.body.appendChild(btntop);
            
            window.addEventListener("scroll", function() {
                if(window.scrollY > 300) {
                    btntop.style.display = "block";
                } else {
                    btntop.style.display = "none";
                }
            });

            btntop.addEventListener("click", function() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });

            // Cierre del menú automático
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                const menu = item.querySelector('.dropdown-menu');
                let timeout;
                item.addEventListener('mouseleave', () => {
                    timeout = setTimeout(() => {
                        menu.classList.remove('show');
                    }, 300);
                });
            });
        });