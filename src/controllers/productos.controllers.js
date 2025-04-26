const {
  obtenerProductosArray,
  obtenerProductoIdArray,
  crearNuevoProductoArray,
  actualizarProductoIdArray,
  borrarProductoIdArray,
} = require("../services/productos.service");

// Obtener todos los productos
const obtenerTodosLosProductos = async (req, res) => {
  try {
    const { statusCode, productos, msg, error } = await obtenerProductosArray();
    return res.status(statusCode).json(error ? { msg, error } : { productos });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error inesperado al obtener productos", error: err });
  }
};

// Obtener producto por ID
const obtenerUnProductoId = async (req, res) => {
  try {
    const { statusCode, producto, msg, error } = await obtenerProductoIdArray(
      req.params.id
    );
    return res
      .status(statusCode)
      .json(error || !producto ? { msg, error } : { producto });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error inesperado al buscar producto", error: err });
  }
};

// Crear nuevo producto
const crearProducto = async (req, res) => {
  try {
    const { statusCode, msg, error } = await crearNuevoProductoArray(req.body);
    return res.status(statusCode).json(error ? { msg, error } : { msg });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error inesperado al crear producto", error: err });
  }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
  try {
    const { statusCode, msg, error } = await actualizarProductoIdArray(
      req.params.id,
      req.body
    );
    return res.status(statusCode).json(error ? { msg, error } : { msg });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error inesperado al actualizar producto", error: err });
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  try {
    const { statusCode, msg, error } = await borrarProductoIdArray(
      req.params.id
    );
    return res.status(statusCode).json(error ? { msg, error } : { msg });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error inesperado al eliminar producto", error: err });
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProductoId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
