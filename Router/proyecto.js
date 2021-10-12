const { check } = require("express-validator");
const express = require("express");
const {
  crearProyecto,
  ontenerProyectos,
  actualizarProyectos,
  eliminarProyectos,
} = require("../Controller/proyectoController");
const auth = require("../middleware/auth");
const router = express.Router();

// creamos un proyecto
// /api/proyecto
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  crearProyecto
);

router.get("/", auth, ontenerProyectos);

//actualizar protecto
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  actualizarProyectos
);

//eliminar
router.delete("/:id", auth, eliminarProyectos);

module.exports = router;
