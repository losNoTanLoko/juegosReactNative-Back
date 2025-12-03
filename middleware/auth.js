const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const header = req.header('Authorization');
  if (!header) {
    return res.status(401).json({ message: 'No se recibió token, acceso denegado' });
  }

  const parts = header.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Formato de token inválido. Debe ser: Bearer <token>' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'El esquema de autorización debe ser Bearer' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_aqui');
    req.user = decoded; // { id, name, email } los datos que pusiste al firmar
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado, por favor inicia sesión de nuevo' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido o mal formado' });
    } else {
      return res.status(401).json({ message: 'Error al verificar el token' });
    }
  }
};
