const express = require("express");
const conectarDB = require("./config/db");
const app = express();
const cors = require("cors");

conectarDB();

app.use(cors());

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use("/api/Usuarios", require("./Router/Usuarios"));
app.use("/api/auth", require("./Router/auth"));
app.use("/api/proyecto", require("./Router/proyecto"));
app.use("/api/tareas", require("./Router/tareas"));

app.listen(PORT, () => {
  console.log("servidor conectado al puerto 4000");
});
