const express = require("express");
const app = express();
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

const port = process.env.PORT || 3000;

// Conexión a la base de datos
require("./db/config.db");

// Middlewares
app.use(express.json());

// Rutas
app.use("/carritos", require("./routes/carrito.routes"));
app.use("/productos", require("./routes/productos.routes"));
app.use("/usuarios", require("./routes/usuario.routes"));

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de manejo de errores general
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto: ${port}`);
});
