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

  const id = await createEnlaces(req.userId, text)

 
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
