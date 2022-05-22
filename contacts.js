const fs = require("fs").promises;
const uuid = require("uuid");
const { randomUUID } = require("crypto");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () =>
  JSON.parse(await fs.readFile(contactsPath, "utf-8"));

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find((cont) => cont.id === contactId);
  console.log(findContact);
}
// getContactById("9");
async function removeContact(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find((cont) => cont.id === contactId);
  const currentContact = contacts.indexOf(findContact);

  if (findContact) {
    contacts.splice(currentContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`contact id ${contactId} was removed`);
  } else {
    console.log(`This contact was removed or not created yet.`);
  }
}
// removeContact("7");

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  console.log(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}
// addContact("Alex", "rds@gfv.com", "(345)456789");

module.exports = {
  listContacts,
  removeContact,
  addContact,
  getContactById,
};
