const {generatorError} = require('../helpers')
const {createUser} = require('../db/users')


const newUserController = async (req, res, next) => {
try{ 
  const {email, password} = req.body;
  if(!email || !password){
    throw generatorError('Completar email y password', 400);
  }
  const id = await createUser(email, password);
  res.send({
    status: 'error',
    message: 'Not implanted'

  })
  }catch(error){
    next(error);
  }
};

const getUserController = async (req, res, next) => {
try{
  res.send({
    status: 'error',
    message: 'Not implanted'

  })
  }catch(error){
    next(error);
  }
};

const loginControler = async (req, res, next) => {
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
  newUserController,
  getUserController,
  loginControler,
};
