const express = require("express");
const UsersController = require("../controllers/UsuariosController");

const api = express.Router();

api.post("/usuarios/registarse", UsersController.create);
api.post("/usuarios/login", UsersController.login);
api.put(
  "/usuarios/updatePassword/:usuario",
  UsersController.updateUserDataPassword
);

module.exports = api;
