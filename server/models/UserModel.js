const { INTEGER, STRING } = require('sequelize');
const db = require('../config/db.js');

const UserModel = db.define(
    "user", {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: STRING,
            allowNull: false,
            require: true
        },
        email: {
            type: STRING,
            allowNull: false,
            require: true,
            unique: true
        },
        password: {
            type: STRING,
            allowNull: false,
            require: true
        },
        birth_date: {
            type: STRING,
            allowNull: false,
            require: true
        },
        phone_number: {
            type: STRING,
            allowNull: false,
            require: true
        },
        gender: {
            type: STRING,
            allowNull: false,
            require: true,
            defaultValue: "Male" || "Famele"
        }
    }
)

module.exports = UserModel;