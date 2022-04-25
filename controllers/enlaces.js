const getEnlaceController = async (req, res, next) => {
  try{
  res.send({
    status: 'error',
    message: 'Not implanted'

  })
  }catch(error){
    next(error);
  }
};

const newEnlaceController = async (req, res, next) => {
  try{
  res.send({
    status: 'error',
    message: 'Not implanted'

  })
  }catch(error){
    next(error);
  }
};

const getSingleEnlaceController = async (req, res, next) => {
  try{
  res.send({
    status: 'error',
    message: 'Not implanted'

  })
  }catch(error){
    next(error);
  }
};

const deleteEnlaceController = async (req, res, next) => {
  try{
  res.send({
    status: 'error',
    message: 'Not implanted'

  })
  }catch(error){
    next(error);
  }
};

module.export = {
  getEnlacesController,
  newEnlaceController,
  getSingleEnlaceController,
  deleteEnlaceController,
};
