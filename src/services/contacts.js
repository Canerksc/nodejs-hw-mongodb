// Service katmanı, doğrudan veritabanı işlemleriyle ilgilenir.
import { Contact } from '../db/Contact.js';

// Veritabanından tüm kişileri bulup getiren fonksiyon.
export const getAllContacts = async ({
  page, 
  perPage,
  sortBy, 
  sortOrder,
  type, 
  isFavourite
}) => {
  const skip = (page - 1)*perPage;
  const sortOptions = { [sortBy]: sortOrder };

  const filter = {};
    if (type) {
    filter.contactType = type;
  };

  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }

  const contacts = await Contact
  .find(filter)
  .sort(sortOptions)
  .skip(skip)
  .limit(perPage); 
  const totalItems = await Contact.countDocuments(filter);
  return {
    contacts,
    totalItems,
  };
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