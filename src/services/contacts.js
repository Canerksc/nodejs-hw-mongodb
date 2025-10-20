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

export const createContact = async (contactData) => {
  const contact = await Contact.create(contactData);
  return contact;
};

export const updateContact = async (contactId, contactData) => { 
  const contact = await Contact.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};