const Usuarios = require("../model/Usuarios");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async (req, res) => {
  //validamos los errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //fin

  const { email, password } = req.body;

  try {
    //revisar si el email del usuario existe en la base de datos
    let usuario;
    usuario = await Usuarios.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    //fin

    // revisar si la contraseña coinside con la base de datos
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "el password no es correcto" });
    }
    //fin

    // si email y password son correctos creamos el jwt token
    // crear y firmar el token
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    // firmar el tokenb
    jwt.sign(
      payload,
      process.env.SECRETA || "palabraSecreta",
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuarios.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
