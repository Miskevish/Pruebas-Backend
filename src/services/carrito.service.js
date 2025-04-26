const CarritoModel = require("../model/carrito.model");
const ProductosModel = require("../model/productos.model");

const agregarProductoAlCarritoBD = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritoModel.findById(idCarrito);
    if (!carrito) {
      return {
        msg: "Carrito no encontrado",
        statusCode: 404,
      };
    }

    const producto = await ProductosModel.findById(idProducto);
    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404,
      };
    }

    const productoExisteCarrito = carrito.productos.find(
      (prod) => prod.toString() === producto._id.toString()
    );

    if (productoExisteCarrito) {
      return {
        msg: "Producto ya existe en el carrito",
        statusCode: 409,
      };
    }

    carrito.productos.push(producto._id);
    await carrito.save();

    return {
      msg: "Producto agregado al carrito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al agregar producto al carrito",
      statusCode: 500,
      error,
    };
  }
};

module.exports = {
  agregarProductoAlCarritoBD,
};
