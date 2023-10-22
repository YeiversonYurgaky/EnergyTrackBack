const express = require("express")
const consumoController = require("../controllers/ConsumosCrontroller")

const api = express.Router()

api.delete("/consumos/delete/:id", consumoController.deleteConsumoData)
api.post("/consumos/nuevos", consumoController.create)
api.put("/consumos/actualizar/:id", consumoController.updateConsumoData)

module.exports = api


