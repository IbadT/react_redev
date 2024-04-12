const { STRING, INTEGER, BOOLEAN } = require('sequelize');
const db = require('../config/db.js');

const TodoModel = db.define("todo", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: STRING,
        allowNull: false,
        require: true
    },
    isCompleted: {
        type: BOOLEAN,
        allowNull: true,
        defaultValue: false,
        require: false
    }
});

module.exports = TodoModel;