require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const {
  newUserController,
  getUserController,
  loginControler,
} = require("./controllers/users");

const {
  getEnlacesController,
  newEnlaceController,
  getSingleEnlaceController,
  deleteEnlaceController,
} = require("./controllers/enlaces");

const app = express();

app.use(morgan("dev"));
app.use(express.jason());

//Rutas de los usuarios

app.post("/user", newUserController);
app.get("/user/:id", getUserController);
app.post("/login", loginControler);

//Rutas de los enlaces

app.get("/", getEnlacesController);
app.post("/", newEnlaceController);
app.get("/enlace/:id", getSingleEnlaceController);
app.delete("/enlace/:id", deleteEnlaceController);

//Middleware de 404

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not fount",
  });
});

//Middleware de gestion de errores
app.use((error, req, res, next) => {
  res.status(error.httpStatus_ || 500).send({
    status: "error",
    message: error.message,
  });
});

//Lanzamiento de server

app.listen(3000, () => {
  console.log("Servidior funcionando");
});
