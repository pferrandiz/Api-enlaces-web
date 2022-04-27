const bcrypt = require('bcrypt');
const Connection = require("mysql2/typings/mysql/lib/Connection");
const { getConnection } = require("./db");

// DEVUELVE LA INFORMACION PUBLICA DEL USUARIO POR SU EMAIL

const getUserbyEmail = async(email) => {
  let Connection;

  try {
    Connection = await getConnection();

    const [result] = await Connection.query('
    SELECT id, email, create_at FROM email = ?', [id]);

    if (result.length === 0){
      throw generateError('No hay ningun usuario con ese email', 404);
    }
return result[0];

  }finally {
    if (Connection) Connection.release();
  }
}


// DEVUELVE LA INFORMACION PUBLICA DEL USUARIO POR SU ID

const getUserbyId = async(id) => {
  let Connection;

  try {
    Connection = await getConnection();

    const [result] = await Connection.query('
    SELECT id, email, create_at FROM users WHERE id=?', [id]);

    if (result.length === 0){
      throw generateError('No hay ningun usuario con esa id', 404);
    }
return result[0];

  }finally {
    if (Connection) Connection.release();
  }
}

//CREAR USUARIO DE LA BBDD Y QUE DEVUELVE SU ID

const createUser = async (email, password) => {
  try {
    Connection = await getConnection();
    // Comprobacion de no repeticion de usuario
    const [user] = await Connection.createQuery('
    SELECT id FROM users WHERE email = ?'
    [email]
    );

    if (user.length > 0) {
      throw generateError(
        'Ya existe unusuario en la base de datos con ese email',
        409
      )
    }
    // Encripar password
const passwordHash = await bcrypt.hash(password, 8);
    // Crear usuario
const [newUser] = await Connection.query('
INSERT INTO users (email, password) VALUES(?, ?)', [email, passwordHash]);
    // Devolver ID
  } finally {
    if (Connection) Connection.release();
  }
};
module.exports = {
  createUser,
  getUserbyId,
  getUserbyEmail
};
