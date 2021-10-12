const { validationResult } = require("express-validator");
const proyectoModel = require("../model/proyectoModel");
const Tareas = require("../model/Tareas");

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //fin

  try {
    const { proyecto } = req.body;

    const existeProyecto = await proyectoModel.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyevto no encontrado" });
    }

    console.log(req.usuario.id);
    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const tarea = new Tareas(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;

    const existeProyecto = await proyectoModel.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyevto no encontrado" });
    }

    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    let tarea = await Tareas.find({ proyecto }).sort({ creado: -1 });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;

    // si la tarea existe o no
    const tareaExiste = await Tareas.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(401).json({ msg: "No existe esa tarea" });
    }

    // extraer proyecto
    const existeProyecto = await proyectoModel.findById(proyecto);

    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // creamos el objeto para poder actualizar los datos
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;

    nuevaTarea.estado = estado;

    // guardar tarea
    tarea = await Tareas.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.query;

    const tareaExiste = await Tareas.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(401).json({ msg: "No existe esa tarea" });
    }

    // extraer proyecto
    const existeProyecto = await proyectoModel.findById(proyecto);

    //verificar el creador del proyecto
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Eliminar
    await Tareas.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
