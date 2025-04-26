const mongoose = require("mongoose");

const ProductosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  descripcion: {
    type: String,
    required: true,
  },
  habilitado: {
    type: Boolean,
    default: false,
  },
  imagen: {
    type: String,
    default: "",
  },
});

const ProductosModel = mongoose.model("productos", ProductosSchema);
module.exports = ProductosModel;
