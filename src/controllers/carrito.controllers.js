const { agregarProductoAlCarritoBD } = require("../services/carrito.service");

const agregarProductoAlCarrito = async (req, res) => {
  try {
    const { msg, statusCode, error } = await agregarProductoAlCarritoBD(
      req.idCarrito,
      req.params.idProduct
    );

    res.status(statusCode).json(error ? { msg, error } : { msg });
  } catch (err) {
    res.status(500).json({
      msg: "Error inesperado al agregar producto al carrito",
      error: err,
    });
  }
};

module.exports = {
  agregarProductoAlCarrito,
};
