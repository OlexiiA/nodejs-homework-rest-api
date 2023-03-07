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
  const contacts = await listContacts();
  const contactToRemove = contacts.find((contact) => contact.id === contactId);
  if (!contactToRemove) {
    return null; // contact not found
  }
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactPath, JSON.stringify(updatedContacts));
  return contactToRemove;
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
