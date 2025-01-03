const jwt = require('jsonwebtoken');

const generarJWT = (uid, email, role) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, email, role };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
