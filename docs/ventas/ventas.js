
// JavaScript para cambiar imágenes cuando se presiona un color
function changeColor(productId, color) {
    const productImage = document.getElementById(`producta-img-${productId}`);

    if (color === 'black') {
        productImage.src = "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-m-7_silver_1020x680.jpg?rev=0fbd360b78dc40bb9a22f8c5d2b5a03e&hash=A3E74A7FD79CCE899F1913E3F2416459&w=1900";
    } else if (color === 'red') {
        productImage.src = "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-p-7_champage_1020x680.jpg?rev=74d1f3dd67724ad18c9779d9e4c4c2ee&hash=997C853E315E5F9BFF6563FFB88640F4&w=1900";
    } else if (color === 'blue') {
        productImage.src = "https://cdn.audioservice.com/-/media/audioservice/global/images/products/g7/b-sp-7_darkbrown_1020x680.jpg?rev=8d24dcc13d994af5a39170b6df7adc62&hash=3B9BC9D495CAD53C8B4ED85F9E19FC79&w=1900";
    }
}

// Función para mostrar detalles del producto
function mostrarDetalles(producto, precio) {
    alert(`Producto: ${producto}\nPrecio: ${precio}\n\nPara más información, contáctenos.`);
}

// Función para el botón de scroll top
window.onscroll = function() {
    const btnTop = document.getElementById("btntop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
};

document.getElementById("btntop").onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
