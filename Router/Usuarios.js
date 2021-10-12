const { crearUsuario } = require("../Controller/UsuarioController");
const { check } = require("express-validator");
const express = require("express");

const router = express.Router();

// creamos un nuevo usuario
// /api/usuario
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe tener mas de 8 caracteres").isLength({
      min: 8,
    }),
  ],
  crearUsuario
);

module.exports = router;
