const { generatorError, createPathIfNotExists } = require("../helpers");
const { createEnlace } = require("./db/enlaces");
const path = require("path");
const sharp = require("sharp");
const { nanoid } = require("nanoid");
const {
  getAllEnlaces,
  createEnlace,
  getEnlacesById,
  deleteEnlacesById,
} = require("../db/enlaces");

const getEnlacesController = async (req, res, next) => {
  try {
    const enlaces = await getAllEnlaces();
    res.send({
      status: "ok",
      message: "enlaces",
    });
  } catch (error) {
    next(error);
  }
};

const newEnlaceController = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || text.length > 500) {
      throw generatorError(
        "El texto es obligatorio maximo 500 caracteres",
        400
      );
    }
    // Gestionar Imagenes
    let imageFileName;

    if (req.files && req.files.image) {
      const uploadsDir = path.join(__dirname, "../uploads");
      await createPathIfNotExists(uploadsDir);
      const image = sharp(req.files.image.data);
      image.resize(1000);
      imageFileName = "${nanoid(25)}.jpg";
      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createEnlace(req.userId, text, imageFileName);
    res.send({
      status: "ok",
      message: "Enlace con id: ${id} creado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const getSingleEnlaceController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enlace = await getEnlacesById(id);
    res.send({
      status: "ok",
      message: "enlace",
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnlaceController = async (req, res, next) => {
  const { id } = req.params;

  //Informacion del enlace que quiero borrar
  const enlace = await getEnlacesById(id);

  //Comprobacion del token

  if (req.userId !== enlace.user_id) {
    throw generatorError(
      "Estas intentando borrar un enlace que no es tuyo",
      401
    );
  }

  //Borrar enlace.

  await deleteEnlacesById(id);

  try {
    res.send({
      status: "ok",
      message: `El enlace con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.export = {
  getEnlacesController,
  newEnlaceController,
  getSingleEnlaceController,
  deleteEnlaceController,
};
