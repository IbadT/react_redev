const { Sequelize } = require('sequelize');

const db = new Sequelize(
    "redev_react_express_registration",
    "postgres",
    "admin",
    {
        dialect: "postgres",
        host: "localhost"
    }
)

module.exports = db;