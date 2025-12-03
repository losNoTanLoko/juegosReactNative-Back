const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ message: 'No token, acceso denegado' });

  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Token inválido' });

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_aqui');
    req.user = decoded; // { id, name, email } los datos que pusiste al firmar
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
