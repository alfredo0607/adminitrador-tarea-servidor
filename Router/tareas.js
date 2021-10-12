// const { check } = require("express-validator");
const express = require("express");
const { check } = require("express-validator");
const {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
} = require("../Controller/tareacontroller");
const auth = require("../middleware/auth");
const router = express.Router();

// crear tarea
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  [check("proyecto", "El proyecto es obligatorio").not().isEmpty()],
  crearTarea
);

// crear tarea
router.get("/", auth, obtenerTareas);

router.put("/:id", auth, actualizarTarea);

router.delete("/:id", auth, eliminarTarea);

module.exports = router;
