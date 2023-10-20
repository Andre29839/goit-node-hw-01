const { writeFile, readFile } = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const contacts = await readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(id) {
  const contact = await listContacts();

  const result = contact.find((contact) => contact.id === id);

  return result || null;
}

async function removeContact(id) {
  const contact = await listContacts();

  const contactIndex = contact.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  const [result] = contact.splice(contactIndex, 1);
  await writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contact = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };

  contact.push(newContact);

  await writeFile(contactsPath, JSON.stringify(contact, null, 2));

  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
