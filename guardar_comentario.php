<?php
// Configuración de conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "aurea";

// Conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Conexión fallida: " . $conn->connect_error);
}

// Recibir datos del formulario (compatible con versiones viejas de PHP)
$nombre  = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$correo  = isset($_POST['correo']) ? $_POST['correo'] : '';
$asunto  = isset($_POST['asunto']) ? $_POST['asunto'] : '';
$mensaje = isset($_POST['mensaje']) ? $_POST['mensaje'] : '';

if (empty($nombre) || empty($correo) || empty($mensaje)) {
    die("⚠️ Faltan datos obligatorios. <a href='index.html'>Volver</a>");
}

// Relacionamos con un artículo fijo
$id_articulo = 1;

// Insertar en la BD
$sql = "INSERT INTO comentario (id_articulo, nombre_autor, correo_autor, contenido_comentario, fecha_comentario, estado) 
        VALUES (?, ?, ?, ?, NOW(), 'pendiente')";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isss", $id_articulo, $nombre, $correo, $mensaje);

if ($stmt->execute()) {
    echo "<h3>✅ Gracias $nombre, tu mensaje se ha enviado correctamente.</h3>";
    echo "<p><b>Asunto:</b> $asunto</p>";
    echo "<p><b>Mensaje:</b> $mensaje</p>";
    echo "<a href='index.html'>Volver al inicio</a> | <a href='ver_comentarios.php'>Ver comentarios</a>";
} else {
    echo "❌ Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
