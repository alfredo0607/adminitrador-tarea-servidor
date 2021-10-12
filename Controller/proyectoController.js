const proyectoModel = require("../model/proyectoModel");
const { validationResult } = require("express-validator");
const { json } = require("express");

exports.crearProyecto = async (req, res) => {
  //validamos los errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //fin

  try {
    //crear un nuevo proyeto
    const proyecto = new proyectoModel(req.body);

    //guardar el crador jwt
    proyecto.creador = req.usuario.id;
    proyecto.save();
    res.json(proyecto);

    res.status(500).send("proyecto insertado con exito");
  } catch (error) {
    console.log(error);
    res.status(500).send("hube un error");
  }
};

//Obtener proyectos
exports.ontenerProyectos = async (req, res) => {
  try {
    const proyectos = await proyectoModel.find({ creador: req.usuario.id });
    res.json({ proyectos });
    console.log(req.usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// actualizar proyecto
exports.actualizarProyectos = async (req, res) => {
  //validamos los errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //fin

  //extremos la imformacion del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  try {
    //revisar el ID
    let proyecto = await proyectoModel.findById(req.params.id);

    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "proyecto no encontrado" });
    }

    //verificar el creador del proyecto

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //actualizar
    proyecto = await proyectoModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error al actualizar el proyecto");
  }
};

exports.eliminarProyectos = async (req, res) => {
  try {
    //revisar el ID
    let proyecto = await proyectoModel.findById(req.params.id);

    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "proyecto no encontrado" });
    }

    //verificar el creador del proyecto

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //elominar
    await proyectoModel.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};
