require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const {
  newUserController,
  getUserController,
  loginController,
} = require("./controllers/users");

const {
  getEnlacesController,
  newEnlacesController,
  getSingleEnlaceController,
  deleteEnlaceController,
} = require("./controllers/enlaces");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use("/upload", express.static("./uploads"));

const { authUser } = require("./middlewares/auth");

//Rutas de los usuarios

app.post("/user", newUserController);
app.get("/user/:id", getUserController);
app.post("/login", loginController);

//Rutas de los enlaces

app.get("/", authUser, getEnlacesController);
app.post("/", getEnlacesController);
app.get("/enlace/:id", getSingleEnlaceController);
app.delete("/enlace/:id", authUser, deleteEnlaceController);

//Middleware de 404

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not fount",
  });
});

//Middleware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus_ || 500).send({
    status: "error",
    message: error.message,
  });
});

//Lanzamiento de server

app.listen(3000, () => {
  console.log("Servidior funcionando");
});
