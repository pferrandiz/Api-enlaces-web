const { generatorError,  createPathIfNotExists } = require("../helpers");
const { createEnlace } = require('./db/enlaces');
const path = require('path');
const sharp = require('sharp');
const {nanoid} = require('nanoid');




const getEnlaceController = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implanted",
    });
  } catch (error) {
    next(error);
  }
};

const newEnlaceController = async (req, res, next) => {
   try {
  const { text } = req.body;
  if (!text || text.length > 500) {
    throw generateError("El texto es obligatorio maximo 500 caracteres", 400);
  }
  // Gestionar Imagenes
  let imageFileName;

  if(req.files && req.files.image){
    const uploadsDir = path.join(__dirname, '../uploads');
    await createPathIfNotExists(uploadsDir);
    const image = sharp(req.files.image.data);
    image.resize(1000);
    imageFileName = '${nanoid(25)}.jpg';
    await image.toFile(path.join(uploadsDir, imageFileName));
  }
  
  
  const id = await createEnlaces(req.userId, text, imageFileName)
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
    res.send({
      status: "error",
      message: "Not implanted",
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnlaceController = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implanted",
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
