const {Sequelize} = require("sequelize");
const dotenv = require('dotenv').config();

module.exports = new Sequelize(`postgres://postgres:${process.env.PASSWORD}@localhost:5432/postgres`);
