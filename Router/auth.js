const { check } = require("express-validator");
const express = require("express");
const {
  autenticarUsuario,
  usuarioAutenticado,
} = require("../Controller/authController");
const auth = require("../middleware/auth");
const router = express.Router();

// /api/auth
router.post("/", autenticarUsuario);

router.get("/", auth, usuarioAutenticado);

module.exports = router;
