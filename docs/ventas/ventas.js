// ventas.js - Solo consulta por WhatsApp, sin precios

document.addEventListener('DOMContentLoaded', function() {
    // FUNCIÓN PARA CAMBIAR COLORES
    window.changeColor = function(productId, color) {
        const productImage = document.getElementById(`producta-img-${productId}`);
        
        // Mapeo de colores a imágenes
        const colorImages = {
            silver: "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-m-7_silver_1020x680.jpg?rev=0fbd360b78dc40bb9a22f8c5d2b5a03e&hash=A3E74A7FD79CCE899F1913E3F2416459&w=1900",
            beige: "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-p-7_champage_1020x680.jpg?rev=74d1f3dd67724ad18c9779d9e4c4c2ee&hash=997C853E315E5F9BFF6563FFB88640F4&w=1900",
            brown: "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-sp-7_darkbrown_1020x680.jpg?rev=8d24dcc13d994af5a39170b6df7adc62&hash=3B9BC9D495CAD53C8B4ED85F9E19FC79&w=1900"
        };
        
        if (colorImages[color]) {
            productImage.src = colorImages[color];
            
            // Resaltar el color seleccionado
            const card = event.target.closest('.producta-carda');
            const allSpans = card.querySelectorAll('.color-option');
            allSpans.forEach(span => {
                span.style.border = '2px solid transparent';
                span.style.transform = 'scale(1)';
            });
            
            event.target.style.border = '2px solid #F4911E';
            event.target.style.transform = 'scale(1.1)';
        }
    };

    // FUNCIÓN PARA CONSULTAR POR WHATSAPP - SIN PRECIOS
    window.consultarWhatsApp = function(modelo) {
        // Mensaje SIN precios
        const mensaje = encodeURIComponent(
            `¡Hola! 👋\n\n` +
            `Me interesa obtener información sobre el siguiente modelo de audífono:\n\n` +
            `🔊 *MODELO:* ${modelo}\n\n` +
            `¿Podrían brindarme más detalles sobre:\n` +
            `• Características técnicas\n` +
            `• Especificaciones\n` +
            `• Opciones de colores disponibles\n` +
            `• Proceso de adaptación\n` +
            `• Posibilidad de prueba auditiva\n\n` +
            `¡Gracias por su atención! 🙏`
        );
        
        // Número de WhatsApp (sin +, sin espacios)
        const numeroWhatsApp = '59170111673';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
        
        // Abrir WhatsApp
        window.open(urlWhatsApp, '_blank');
    };

    // Botones de consulta
    const consultarButtons = document.querySelectorAll('.boton');
    consultarButtons.forEach(button => {
        if (button.textContent.includes('Consultar')) {
            button.addEventListener('click', function() {
                const card = this.closest('.producta-carda');
                const modelo = card.querySelector('h2').textContent;
                consultarWhatsApp(modelo);
            });
        }
    });

    // CSS para los círculos de color
    const style = document.createElement('style');
    style.textContent = `
        .color-option {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 0 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid #eee;
        }
        
        .color-option:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .producta-colors {
            margin: 15px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);

    console.log('Página cargada - Consultas por WhatsApp configuradas');
});