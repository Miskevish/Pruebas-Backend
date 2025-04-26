const UsuarioModel = require("../model/usuarios.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const CarritoModel = require("../model/carrito.model");
const FavoritosModel = require("../model/favoritos.model");

// Obtener todos los usuarios
const obtenerTodosLosUsuariosDb = async () => {
  try {
    const usuarios = await UsuarioModel.find();
    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

// Obtener un usuario por ID
const obtenerUnUsuarioPorIdDb = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }
    return {
      usuario,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

// Registro de usuario, carrito y favorito
const registroUsuarioDb = async (body) => {
  try {
    const nuevoUsuario = new UsuarioModel(body);
    const nuevoCarrito = new CarritoModel();
    const nuevoFavorito = new FavoritosModel();

    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
    nuevoCarrito.idUsuario = nuevoUsuario._id;
    nuevoFavorito.idUsuario = nuevoUsuario._id;
    nuevoUsuario.idCarrito = nuevoCarrito._id;
    nuevoUsuario.idFavorito = nuevoFavorito._id;

    await nuevoCarrito.save();
    await nuevoFavorito.save();
    await nuevoUsuario.save();

    return {
      msg: "Usuario creado con éxito",
      statusCode: 201,
    };
  } catch (error) {
    return {
      msg: "Error al registrar usuario",
      statusCode: 500,
      error,
    };
  }
};

// Eliminar usuario por ID
const eliminarUnUsuarioPorIdDb = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findByIdAndDelete(idUsuario);
    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    return {
      msg: "Usuario eliminado con éxito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al eliminar usuario",
      statusCode: 500,
      error,
    };
  }
};

// Actualizar usuario por ID
const actualizarUnUsuarioPorIdDb = async (idUsuario, body) => {
  try {
    const { contrasenia, ...restoUsuario } = body;

    if (contrasenia) {
      restoUsuario.contrasenia = await argon.hash(contrasenia);
    }

    const usuario = await UsuarioModel.findByIdAndUpdate(
      idUsuario,
      restoUsuario,
      { new: true }
    );

    if (!usuario) {
      return {
        msg: "No existe el usuario",
        statusCode: 404,
      };
    }

    return {
      msg: "Usuario actualizado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al actualizar usuario",
      statusCode: 500,
      error,
    };
  }
};

// Inicio de sesión
const inicioSesionUsuarioDb = async (body) => {
  try {
    const usuarioExiste = await UsuarioModel.findOne({
      nombreUsuario: body.nombreUsuario,
    }).select("+contrasenia");

    if (!usuarioExiste) {
      return {
        msg: "Error. Usuario y/o contraseña no coinciden",
        statusCode: 400,
      };
    }

    if (usuarioExiste.estado === "deshabilitado") {
      return {
        msg: "Error. Sesión no habilitada",
        statusCode: 400,
      };
    }

    const confirmarContrasenia = await argon.verify(
      usuarioExiste.contrasenia,
      body.contrasenia
    );

    if (!confirmarContrasenia) {
      return {
        msg: "Error. Usuario y/o contraseña no coinciden",
        statusCode: 400,
      };
    }

    const payload = {
      idUsuario: usuarioExiste._id,
      idCarrito: usuarioExiste.idCarrito,
      idFavorito: usuarioExiste.idFavorito,
      nombreUsuario: usuarioExiste.nombreUsuario,
      rolUsuario: usuarioExiste.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return {
      msg: "Inicio de sesión exitoso",
      token,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error en el servidor al iniciar sesión",
      statusCode: 500,
      error,
    };
  }
};

// Habilitar o deshabilitar usuario
const habilitadaDeshabilitarUsuarioDB = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);

    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    usuario.estado =
      usuario.estado === "deshabilitado" ? "habilitado" : "deshabilitado";
    await usuario.save();

    return {
      msg: `Usuario ${usuario.estado}`,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al cambiar el estado del usuario",
      statusCode: 500,
      error,
    };
  }
};

module.exports = {
  registroUsuarioDb,
  inicioSesionUsuarioDb,
  habilitadaDeshabilitarUsuarioDB,
  obtenerTodosLosUsuariosDb,
  obtenerUnUsuarioPorIdDb,
  eliminarUnUsuarioPorIdDb,
  actualizarUnUsuarioPorIdDb,
};
