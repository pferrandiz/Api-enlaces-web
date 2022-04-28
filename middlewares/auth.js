const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError("Falta Authorizacion", 401);
    }

    //// token
    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("token incorrecto", 401);
    }
    req.userId = token.id;

    next();
  } catch (errror) {
    next();
  }
};

module.exports = {
  authUser,
};