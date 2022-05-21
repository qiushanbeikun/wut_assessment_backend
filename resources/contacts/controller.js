const ContactsModel = require('./model')
const {Op} = require("sequelize");

const SEARCH_FIELDS = ["first_name", "last_name", "email", "phone"];

async function search(text) {
  return await ContactsModel.findAll(!text ? {} : {
    where: {
      [Op.or]:
        SEARCH_FIELDS.map((prop) => ({
          [prop]: {
            [Op.iLike]: `%${text}%`,
          }
        }))
    }
  });
}

async function findById(id) {
  return await ContactsModel.findByPk(parseInt(id, 10));
}

async function update(contact) {
  if (!contact.id) {
    throw new Error("Id is required.")
  }
  const [updated, [firstResult]] = await ContactsModel.update({
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
    photo: contact.photo,
  }, {
    where: {
      id: contact.id,
    },
    limit: 1,
    returning: true
  })
  return firstResult;
}

async function create(contact) {
  return await ContactsModel.create({
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
    photo: contact.photo,
  })
}

async function remove(id) {
  return await ContactsModel.destroy({
    where: {
      id: id
    }
  })
}

module.exports = {
  search,
findById,
update,
create,
remove,
}