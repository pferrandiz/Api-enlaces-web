const { generatorError, generateError } = require("../helpers");
const { getConection, getConnection } = require('./db');



const deleteEnlacesById = async() => {
    let connection;

    try{
connection = await getConnection();

await connection.query(`
DELETE FROM enlaces WHERE id=?
`, [id]);


return;
    } finally {
        if (connection) connection.relase();
    }
}




const getAllEnlaces = async() => {
    let connection;

    try{
connection = await getConnection();

const [result] = await connection.query(`
SELECT * FROM enlaces ORDER BY created_at DESC
`);
return result;
    } finally {
        if (connection) connection.relase();
    }
}

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
    getAllEnlaces,
    getEnlacesById,
    deleteEnlacesById
}