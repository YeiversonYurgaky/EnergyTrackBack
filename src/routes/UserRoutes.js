const express = require("express");
const UsersController = require("../controllers/UsuariosController");

const api = express.Router();

api.post("/usuarios/registarse", UsersController.create);
api.post("/usuarios/login", UsersController.login)


module.exports = api;
