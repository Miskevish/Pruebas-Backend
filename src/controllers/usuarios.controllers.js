const {
  registroUsuarioDb,
  inicioSesionUsuarioDb,
  habilitadaDeshabilitarUsuarioDB,
  obtenerTodosLosUsuariosDb,
  obtenerUnUsuarioPorIdDb,
  actualizarUnUsuarioPorIdDb,
  eliminarUnUsuarioPorIdDb,
} = require("../services/usuarios.service");

// Registro de usuario
const registroUsuario = async (req, res) => {
  try {
    const { msg, statusCode, error } = await registroUsuarioDb(req.body);
    return res.status(statusCode).json(error ? { error } : { msg });
  } catch (err) {
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
};

// Inicio de sesión
const inicioSesionUsuario = async (req, res) => {
  try {
    const { msg, statusCode, token, error } = await inicioSesionUsuarioDb(
      req.body
    );
    return res.status(statusCode).json(error ? { error } : { msg, token });
  } catch (err) {
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
};

// Obtener todos los usuarios
const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const { usuarios, statusCode, error } = await obtenerTodosLosUsuariosDb();
    return res.status(statusCode).json(error ? { error } : { usuarios });
  } catch (err) {
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
};

// Obtener un usuario por ID
const obtenerUnUsuarioPorId = async (req, res) => {
  try {
    const { usuario, msg, statusCode, error } = await obtenerUnUsuarioPorIdDb(
      req.params.id
    );
    return res
      .status(statusCode)
      .json(error || !usuario ? { msg, error } : { usuario });
  } catch (err) {
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
};

// Actualizar un usuario por ID
const actualizarUnUsuarioPorId = async (req, res) => {
  try {
    const { msg, statusCode, error } = await actualizarUnUsuarioPorIdDb(
      req.params.id,
      req.body
    );
    return res.status(statusCode).json(error ? { error } : { msg });
  } catch (err) {
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
};

// Eliminar un usuario por ID
const eliminarUnUsuarioPorId = async (req, res) => {
  try {
    const { msg, statusCode, error } = await eliminarUnUsuarioPorIdDb(
      req.params.id
    );
    return res.status(statusCode).json(error ? { error } : { msg });
  } catch (err) {
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
};

// Habilitar o deshabilitar usuario
const habilitadaDeshabilitarUsuario = async (req, res) => {
  try {
    const { msg, statusCode, error } = await habilitadaDeshabilitarUsuarioDB(
      req.params.id
    );
    return res.status(statusCode).json(error ? { error } : { msg });
  } catch (err) {
    return res.status(500).json({ error: "Error inesperado en el servidor" });
  }
};

module.exports = {
  registroUsuario,
  inicioSesionUsuario,
  habilitadaDeshabilitarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  actualizarUnUsuarioPorId,
  eliminarUnUsuarioPorId,
};
