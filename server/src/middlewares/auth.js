const jwt = require('jsonwebtoken');

const jwtSecret = 'askldoiU&dhj123*1kjdasmda';

const auth = async (req, res, next)  => {
  const authHeader = req.headers.authorization;
  const parts = authHeader.split(" ");
  const [scheme, token] = parts;
  
  if (!/^Bearer$/i.test(scheme)) return res.status(403).json({ message: 'No token provide' });
  if (!token) return res.status(403).json({ message: 'No token provide' });

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) return res.status(403).json({ message: 'Token malformated' });
    next();
  });
}
module.exports = auth;