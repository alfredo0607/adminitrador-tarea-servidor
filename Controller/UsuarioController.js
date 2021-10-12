//para insertar nuevos datos a la table de usuarios
const Usuarios = require("../model/Usuarios");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.crearUsuario = async (req, res) => {
  //validamos los errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //fin

  const { email, password } = req.body;

  try {
    //validamos si el email ya existe en la base de datos
    let usuario = await Usuarios.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe registrado" });
    }
    //fin

    //llenamos los campos de la base da datos
    usuario = new Usuarios(req.body);

    //para cifrar la contraseñas en la base de datos
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardamos los datos en la base de datos
    await usuario.save();

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
    res.this.status(400).send("Hubo un error");
  }
};
