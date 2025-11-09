// Service katmanı, doğrudan veritabanı işlemleriyle ilgilenir.
import { Contact } from '../db/Contact.js';

// Veritabanından tüm kişileri bulup getiren fonksiyon.
export const getAllContacts = async ({
  page, 
  perPage,
  sortBy, 
  sortOrder,
  type, 
  isFavourite,
  userId,
}) => {
  const skip = (page - 1)*perPage;
  const sortOptions = { [sortBy]: sortOrder };

  const filter = {userId};
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

export const getContactById = async (contactId,userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId: userId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({ ...payload, userId: userId });
  return contact;
};

export const updateContact = async (contactId, contactData,userId) => { 
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId: userId }, 
    {new: true},
  );
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });
  return contact;
};