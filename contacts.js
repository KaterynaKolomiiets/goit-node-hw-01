const fs = require('fs').promises;
const path = require('path');
const uniquid = require('uniquid')


const url = path.normalize(__dirname + "/db/contacts.json");
const pathName = path.normalize(url);

function listContacts() {
  fs.readFile(pathName)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(pathName)
    .then((data) => JSON.parse(data))
    .then((data) => data.find((item) => Number(item.id) === Number(contactId)))
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  console.log(contactId);
  fs.readFile(pathName)
    .then((data) => JSON.parse(data))
    .then((data) =>
      data.filter((item) => Number(item.id) !== Number(contactId))
    )
    .then((data) => fs.writeFile(pathName, JSON.stringify(data)))
    .catch((err) => console.log(err.message));
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(pathName);
  const parsedData = JSON.parse(data);
  const newContact = { id: uniquid(),name, email, phone };
  parsedData.push(newContact);
  fs.writeFile(pathName, JSON.stringify(parsedData));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
