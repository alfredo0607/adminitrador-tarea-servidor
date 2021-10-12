const moongose = require("mongoose");

const tareaSchema = moongose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  proyecto: {
    type: moongose.Schema.Types.ObjectId,
    ref: "proyectoModel",
  },
});

module.exports = moongose.model("Tareas", tareaSchema);
