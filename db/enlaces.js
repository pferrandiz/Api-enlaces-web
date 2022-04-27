const { generatorError } = require("../helpers");
const { getConection } = require('./db');

const createEnlaces = async (userId, text, image = '') => {
    let connection;

    try{
        connection = await getConection();
    const [result] = await connection.query(`
    INSERT INTO enlaces (user_id, text, image)
    VALUES(?,?,?)
    `, [userId, text, image]);
    return result.inserId;
    
    }finally {
        if(connection) connection.release();
    }
}

module.exports = {
    createEnlaces,
}