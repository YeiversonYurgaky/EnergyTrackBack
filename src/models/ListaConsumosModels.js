//datos sensibles y no sensibles. Contraseña, direccion, documento:
//Todos los datos sensibles van encriptados

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ListaConsumosSchema = schema({
  consumo_energetico: Number,
  numero_de_piso: Number,
  fecha: Date,
});

module.exports = mongoose.model("consumos_collection", ListaConsumosSchema);
