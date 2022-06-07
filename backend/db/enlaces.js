const { generateError } = require("../helpers");
const { getConnection } = require("./db");

const getEnlaceById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM enlace WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`El enlace con id: ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const deleteEnlaceById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
DELETE FROM enlaces WHERE id=?
`,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const getAllEnlaces = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
SELECT * FROM enlaces ORDER BY created_at DESC
`);
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createEnlace = async (userId, text, title, url, image = "") => {
  let connection;
  console.log(userId, text, title, url, image);
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
    INSERT INTO enlaces (user_id, text, title, url, image)
    VALUES(?,?,?,?,?)
    `,
      [userId, text, title, url, image]
    );
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createEnlace,
  getAllEnlaces,
  getEnlaceById,
  deleteEnlaceById,
};
