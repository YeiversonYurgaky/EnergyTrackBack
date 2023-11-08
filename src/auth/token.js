const jwt = require("jsonwebtoken");

// Definir el payload del token
const payload = {
  usuario_id: "652b1f8d83a99b07253f1fee",
  nombreUsuario: "yeiversonyj",
  role: "admin",
};

// Definir la clave secreta para firmar el token
const claveSecreta = "ih6y#wJ6SHL#u2tR%hkQbMp#^Z&!pe2J";

// Crear el token con el payload y la clave secreta
const token = jwt.sign(payload, claveSecreta, { expiresIn: "1h" });

// Imprimir el token generado
console.log(token);
