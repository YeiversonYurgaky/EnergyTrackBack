const jwt = require("jwt-simple");
const moment = require("moment");

exports.createToken = function (user) {
  const payload = {
    sub: user._id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    email: user.email,
    role: "admin",
    iat: moment().unix(),
    exp: moment().add(60, "days").unix(),
  };
  return jwt.encode(payload, "VWP&q6gAt3W!84k3k^bMxuySWwywU$36", "HS256");
};

exports.verifyToken = function (token) {
  return jwt.decode(token, "VWP&q6gAt3W!84k3k^bMxuySWwywU$36", "HS256");
};
