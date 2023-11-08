const http = require("http");
const app = require("./app");
require("dotenv").config();

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Obtener el token del encabezado de autorización
  const token = req.headers["authorization"];

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // El token es inválido
      return res.status(401).send("Invalid token");
    }

    // El token es válido
    if (decoded.role === "admin") {
      req.user = decoded;
      next();
    } else {
      return res.status(403).send("Unauthorized");
    }
  });
}

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server Up, Port: ${process.env.PORT}`);
});
