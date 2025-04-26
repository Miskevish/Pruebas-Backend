const { Schema, model } = require("mongoose");

const FavoritosSchema = new Schema({
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

const FavoritosModel = model("favoritos", FavoritosSchema);
module.exports = FavoritosModel;
