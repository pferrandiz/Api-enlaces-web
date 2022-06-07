const fs = require("fs/promises");
const path = require("path");

const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

const generateError = (message, status) => {
  const error = new Error(message);
  error.hhtpStatus = status;
  return error;
};

module.exports = {
  generateError,
  createPathIfNotExists,
};
