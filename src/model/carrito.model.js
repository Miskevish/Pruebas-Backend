const { Schema, model } = require("mongoose");

const CarritoSchema = new Schema({
  idUsuario: {
    type: String,
    required: true,
  },
  productos: [
    {
      type: Schema.Types.ObjectId,
      ref: "productos",
    },
  ],
});

const CarritoModel = model("carrito", CarritoSchema);
module.exports = CarritoModel;
