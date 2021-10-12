const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el token
  const token = req.header("x-auth-token");
  //confirmamos si el token se esta leyendo bien
  //en postman el header colocamos x-auth-token y el token y enviamos la peticion
  // console.log(token);
  //revisamos si hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no valido" });
  }

  // validamos el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA || "palabraSecreta");
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "token no valido" });
  }
};
