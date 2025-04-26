const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 30,
    minLength: 3,
  },
  emailUsuario: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxLength: 50,
    minLength: 6,
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
    maxLength: 300,
    minLength: 8,
    select: false, // ocultamos contraseña por seguridad
  },
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  estado: {
    type: String,
    enum: ["habilitado", "deshabilitado"],
    default: "deshabilitado",
  },
  fechaReg: {
    type: Date,
    default: Date.now,
  },
  idCarrito: {
    type: String,
  },
  idFavorito: {
    type: String,
  },
});

// Oculta la contraseña al convertir a JSON
UsuariosSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UsuarioModel = model("usuarios", UsuariosSchema);
module.exports = UsuarioModel;
