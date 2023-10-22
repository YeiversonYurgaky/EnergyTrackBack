const express = require("express")
const consumoController = require("../controllers/ConsumosCrontroller")

const api = express.Router()

api.post("/consumos/nuevos", consumoController.create)
module.exports = api
