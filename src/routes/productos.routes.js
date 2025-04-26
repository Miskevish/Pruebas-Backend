const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProductoId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controllers");

const router = express.Router();

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerUnProductoId);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

module.exports = router;
