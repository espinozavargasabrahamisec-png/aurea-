<?php
// Configuración de conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "aurea";

// Conectar
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Conexión fallida: " . $conn->connect_error);
}

// Consulta de comentarios
$sql = "SELECT id, nombre_autor, correo_autor, contenido_comentario, fecha_comentario, estado 
        FROM comentario ORDER BY fecha_comentario DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Comentarios Recibidos</title>
  <style>
    body {
        font-family: Arial, sans-serif;
        background: #f9f9f9;
        margin: 20px;
    }
    h2 {
        text-align: center;
        color: #851111;
    }
    table {
        width: 90%;
        margin: auto;
        border-collapse: collapse;
        background: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    th {
        background: #851111;
        color: white;
    }
    tr:nth-child(even) {
        background: #f2f2f2;
    }
    .estado-pendiente { color: orange; font-weight: bold; }
    .estado-aprobado { color: green; font-weight: bold; }
    .estado-rechazado { color: red; font-weight: bold; }
    .volver {
        display: block;
        text-align: center;
        margin-top: 20px;
    }
  </style>
</head>
<body>
  <h2>📋 Comentarios Recibidos</h2>

  <?php if ($result->num_rows > 0): ?>
    <table>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Comentario</th>
        <th>Fecha</th>
        <th>Estado</th>
      </tr>
      <?php while($row = $result->fetch_assoc()): ?>
        <tr>
          <td><?= $row['id'] ?></td>
          <td><?= htmlspecialchars($row['nombre_autor']) ?></td>
          <td><?= htmlspecialchars($row['correo_autor']) ?></td>
          <td><?= nl2br(htmlspecialchars($row['contenido_comentario'])) ?></td>
          <td><?= $row['fecha_comentario'] ?></td>
          <td class="estado-<?= strtolower($row['estado']) ?>"><?= $row['estado'] ?></td>
        </tr>
      <?php endwhile; ?>
    </table>
  <?php else: ?>
    <p style="text-align:center;">⚠️ No hay comentarios registrados aún.</p>
  <?php endif; ?>

  <div class="volver">
    <a href="index.html">⬅️ Volver al formulario</a>
  </div>
</body>
</html>
<?php
$conn->close();
?>
