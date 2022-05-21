const Sequelize = require("sequelize");
const db = require("../../config/database");

const ContactsModel = db.define("contacts", {
  id: {
    type: Sequelize.NUMBER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING
  },

},{
  timestamps: false,
})

module.exports = ContactsModel;