const express = require("express");
const UsersController = require("../controllers/UsuariosController");

const api = express.Router();

api.post("/usuarios/registarse", UsersController.create);

module.exports = api;
