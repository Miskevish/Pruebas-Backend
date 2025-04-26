const express = require("express");
const {
  registroUsuario,
  inicioSesionUsuario,
  habilitadaDeshabilitarUsuario,
  obtenerTodosLosUsuarios,
  eliminarUnUsuarioPorId,
  obtenerUnUsuarioPorId,
  actualizarUnUsuarioPorId,
} = require("../controllers/usuarios.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

// Registro y login
router.post("/register", registroUsuario);
router.post("/login", inicioSesionUsuario);

// Rutas protegidas por rol (ejemplo: solo admin)
router.get("/", auth("admin"), obtenerTodosLosUsuarios);

// Rutas generales
router.get("/:id", obtenerUnUsuarioPorId);
router.put("/enableDisabled/:id", habilitadaDeshabilitarUsuario);
router.put("/:id", actualizarUnUsuarioPorId);
router.delete("/:id", eliminarUnUsuarioPorId);

module.exports = router;
