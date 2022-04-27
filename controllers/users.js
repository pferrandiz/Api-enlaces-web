const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatorError } = require("../helpers");
const { getConection } = require('./db');
const { createUser, getUserbyEmail } = require("../db/users");

const newUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw generatorError("Completar email y password", 400);
    }
    const id = await createUser(email, password);

    res.send({
      status: "ok",
      message: "Not User created with id: ${id}",
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginControler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw generatorError("Debes enviar un email y password", 400);
    }

    //Recojo los datos de la base de datos del usuario con ese email

    const user = await getUserbyEmail(email);

    //Compruebo que las contraseña coinciden

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generatorError("La contraseña no coincide", 401);
    }

    //Creo el payload del token

    const payload = { id: user.id };

    //Firmo el token

    const token = jwt.sign(payload, process.env.SECRET, {
      expireIn: "30d",
    });

    //Envio el token

    res.send({
      status: "ok",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.export = {
  newUserController,
  getUserController,
  loginControler,
};
