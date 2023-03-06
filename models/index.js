const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactPath);
    return JSON.parse(list);
  } catch (error) {
    console.log(error)
  }
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const findContactByName = data.find((item) => item.id === contactId);
  return findContactByName;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const removeContactById = data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactPath, JSON.stringify(removeContactById));
};

const addContact = async (body) => {
  const contact = {
    id: uniqid(),
    ...body,
  };
  const arrContacts = listContacts();
  arrContacts.push(contact);
  await fs.writeFile(contactPath, JSON.stringify(contact));
  return contact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
