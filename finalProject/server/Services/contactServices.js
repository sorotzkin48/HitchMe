const db = require('./db');

async function getContacts() {
    const contactsForReplying = await db.query(`SELECT * FROM carrental.contacts`);
    return contactsForReplying;
}

async function addContact(contact) {

    await db.query(`insert into contacts values(
        default,
        ${JSON.stringify(contact.userId)},
        ${JSON.stringify(contact.contactTitle)},
        ${JSON.stringify(contact.contactContents)})`);
}

async function deleteContact(contact) {
    await db.query(`DELETE FROM contacts WHERE contactId=${contact.contactId}`);
    return 1;
}

module.exports = { addContact, getContacts, deleteContact }

