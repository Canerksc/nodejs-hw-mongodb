import createHttpError from 'http-errors';
import { getAllContacts, 
         getContactById, 
         createContact,
         updateContact,
         deleteContact,
 } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Contacts found successfully!',
      data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: `ID connected: ${contactId}`,
      data: contact,
    });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contactData = req.body;

if (Object.keys(contactData).length === 0) {
    throw createHttpError(400, 'Body must have at least one field');
  }
const contact = await updateContact(contactId, contactData);

if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};