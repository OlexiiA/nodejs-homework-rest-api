const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactPath);
  return JSON.parse(list);
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
  const contacts = await listContacts();
  const newContact = { id: uniqid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null; // contact not found
  }
  const updatedContact = { ...contacts[contactIndex], ...body };
  contacts[contactIndex] = updatedContact;
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
