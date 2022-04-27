const generateError = (message, status) => {
    const error = new Error(message);
    error.hhtpStatus = status;
    return error;
}

module.exports = {
    generateError,
}