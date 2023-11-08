const UserModel = require("../models/UsuariosModels");
const { CreateUser, FindOneUsername } = require("../repository/UserRepository");
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
      user.email = params.email;
      user.usuario = params.usuario;
      user.password = hash;

      const response = await CreateUser(user);
      res.status(response.status).send(response);
    }
  });
}

async function login(req, res) {
  const params = req.body;

  if (!params.usuario || !params.password) {
    res
      .status(400)
      .send({ message: "Por favor, proporcione un usuario y una contraseña." });
    return;
  }

  const user = await FindOneUsername(params.usuario);
  if (user) {
    //Logueo
    bcrypt.compare(
      params.password,
      user.result.password,
      function (err, check) {
        if (check) {
          res.status(200).send({ message: "el usuario se encuentra logueado" });
        } else {
          res.status(400).send({ message: "Usuario o contraseña Invalida 1" });
        }
      }
    );
  } else {
    res.status(400).send({ message: "Usuario o contraseña Invalida" });
  }
}

module.exports = {
  create,
  login,
};
