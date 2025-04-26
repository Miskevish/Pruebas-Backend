const { Router } = require("express");
const {
  agregarProductoAlCarrito,
} = require("../controllers/carrito.controllers");
const auth = require("../middlewares/auth");

const router = Router();

router.post("/add/:idProduct", auth("usuario"), agregarProductoAlCarrito);

module.exports = router;
