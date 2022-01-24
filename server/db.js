const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:twiztid1@localhost:5433/eleven-journal");

module.exports = sequelize;