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
  const { text } = req.body;
  if (!text || text.length > 500) {
    throw generateError("El texto es obligatorio maximo 500 caracteres", 400);
  }
  try {
    res.send({
      status: "ok",
      message: "Nuevo enlace",
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
