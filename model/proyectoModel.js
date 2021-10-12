const mongoose = require("mongoose");

const proyectoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario",
  },
  fecha_creacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("proyectoModel", proyectoSchema);
