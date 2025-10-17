// Service katmanı, doğrudan veritabanı işlemleriyle ilgilenir.
import { Contact } from '../db/Contact.js';

// Veritabanından tüm kişileri bulup getiren fonksiyon.
export const getAllContacts = async () => {
  const contacts = await Contact.find(); 
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

