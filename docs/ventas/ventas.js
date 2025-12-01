// ventas.js - Funcionalidades específicas para la página de ventas

document.addEventListener('DOMContentLoaded', function() {
    // Función para cambiar imágenes de color
    window.changeColor = function(productId, color) {
        const productImage = document.getElementById(`producta-img-${productId}`);
        
        // Mapeo de colores a imágenes
        const colorImages = {
            black: "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-m-7_silver_1020x680.jpg?rev=0fbd360b78dc40bb9a22f8c5d2b5a03e&hash=A3E74A7FD79CCE899F1913E3F2416459&w=1900",
            red: "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-p-7_champage_1020x680.jpg?rev=74d1f3dd67724ad18c9779d9e4c4c2ee&hash=997C853E315E5F9BFF6563FFB88640F4&w=1900",
            blue: "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-sp-7_darkbrown_1020x680.jpg?rev=8d24dcc13d994af5a39170b6df7adc62&hash=3B9BC9D495CAD53C8B4ED85F9E19FC79&w=1900"
        };
        
        if (colorImages[color]) {
            productImage.src = colorImages[color];
        }
    };

    // Función para mostrar detalles del producto
    window.mostrarDetalles = function(producto, precio) {
        // Crear un modal personalizado
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            ">
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                ">
                    <h3 style="color: var(--aurea-granate); margin-bottom: 15px;">${producto}</h3>
                    <p style="font-size: 18px; color: var(--aurea-orange); margin-bottom: 20px;"><strong>${precio}</strong></p>
                    <p style="margin-bottom: 25px;">Para más información sobre este producto, contáctenos por WhatsApp.</p>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="
                            background: #ccc;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                        ">Cerrar</button>
                        <a href="https://wa.link/cetggt" target="_blank" style="
                            background: #25D366;
                            color: white;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                        ">Contactar por WhatsApp</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    // Botones de "Enviar" - actualizado para usar clase "boton"
    const enviarButtons = document.querySelectorAll('.boton');
    enviarButtons.forEach(button => {
        if (button.textContent.includes('Enviar')) {
            button.addEventListener('click', function() {
                mostrarDetalles('Producto Seleccionado', 'Precio a consultar');
            });
        }
    });

    // Animaciones para las tarjetas
    const cards = document.querySelectorAll('.audifono-item, .producta-carda');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Botón Scroll Top - CORREGIDO: usa "btntop" en lugar de "botontop"
    const scrollTopBtn = document.getElementById('btntop');
    
    if (scrollTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        scrollTopBtn.onclick = function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
    }

    console.log('Página de ventas cargada correctamente');
});