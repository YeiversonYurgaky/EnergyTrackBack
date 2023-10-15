const UserModel = require("../models/UsuariosModels");
const { CreateUser } = require("../repository/UserRepository");
const bcrypt = require("bcrypt-nodejs");

// Registrar/Crear usuarios
async function create(req, res) {
  const params = req.body;

  const user = new UserModel();

  if (
    !params.nombres ||
    !params.apellidos ||
    !params.usuario ||
    !params.password
  ) {
    res.status(400).send({ message: "Todos los campos son requeridos" });
    return;
  }

  //Encriptar password
  bcrypt.hash(params.password, null, null, async function (err, hash) {
    if (hash) {
      user.nombres = params.nombres;
      user.apellidos = params.apellidos;
      user.telefono = params.telefono;
      user.email = params.email;
      user.edad = params.edad;
      user.usuario = params.usuario;
      user.password = hash;

      const response = await CreateUser(user);
      res.status(response.status).send(response);
    }
  });
}

module.exports = {
  create,
};
