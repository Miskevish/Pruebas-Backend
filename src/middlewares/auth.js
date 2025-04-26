const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {
  try {
    const token = req.header("auth");
    if (!token) {
      return res.status(401).json({ msg: "Token no proporcionado" });
    }

    const verificarToken = jwt.verify(token, process.env.JWT_SECRET);

    if (verificarToken.rolUsuario === rolRuta) {
      req.idUsuario = verificarToken.idUsuario;
      req.idCarrito = verificarToken.idCarrito;
      req.idFavorito = verificarToken.idFavorito; // corregido de idFavoritos
      next();
    } else {
      return res.status(403).json({ msg: "No estás autorizado" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
