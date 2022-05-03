require('dotenv').config();

const { getConnection } = require("./db");

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log('borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS enlaces');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log("Creando tablas");

    await connection.query(`
    CREATE TABLE users(
        id INTEGER PRYMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
    await connection.query(`
    CREATE TABLE enlaces(
        id INTEGET PRYMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        text VARCHAR(280) NOT NULL,
        image VARCHAR(100)
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
main();
