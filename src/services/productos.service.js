const ProductosModel = require("../model/productos.model");

// Obtener todos los productos
const obtenerProductosArray = async () => {
  try {
    const productos = await ProductosModel.find();
    return { statusCode: 200, productos };
  } catch (error) {
    return {
      msg: "Error al obtener productos",
      statusCode: 500,
      error,
    };
  }
};

// Obtener producto por ID
const obtenerProductoIdArray = async (idProducto) => {
  try {
    const producto = await ProductosModel.findById(idProducto);
    if (!producto) {
      return {
        msg: "Error. El producto no existe",
        statusCode: 404,
      };
    }

    return {
      producto,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al buscar producto por ID",
      statusCode: 500,
      error,
    };
  }
};

// Crear nuevo producto
const crearNuevoProductoArray = async (body) => {
  try {
    const nuevoProducto = new ProductosModel(body);
    await nuevoProducto.save();

    return {
      msg: "Producto creado con éxito",
      statusCode: 201,
    };
  } catch (error) {
    return {
      msg: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};

// Actualizar producto por ID
const actualizarProductoIdArray = async (idProducto, body) => {
  try {
    const producto = await ProductosModel.findByIdAndUpdate(idProducto, body, {
      new: true,
    });

    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404,
      };
    }

    return {
      msg: "Producto actualizado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al actualizar el producto",
      statusCode: 500,
      error,
    };
  }
};

// Eliminar producto por ID
const borrarProductoIdArray = async (idProducto) => {
  try {
    const productoExiste = await ProductosModel.findById(idProducto);

    if (!productoExiste) {
      return {
        msg: "Error. Producto no existe",
        statusCode: 404,
      };
    }

    await ProductosModel.findByIdAndDelete(idProducto);

    return {
      msg: "Producto eliminado con éxito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al eliminar el producto",
      statusCode: 500,
      error,
    };
  }
};

module.exports = {
  obtenerProductosArray,
  obtenerProductoIdArray,
  crearNuevoProductoArray,
  actualizarProductoIdArray,
  borrarProductoIdArray,
};
