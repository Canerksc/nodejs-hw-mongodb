
import createHttpError from 'http-errors';
import { getAllContacts, 
         getContactById, 
         createContact,
         updateContact,
         deleteContact,
 } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
    const { 
      page = 1, 
      perPage =10,
      sortBy = 'name',
      sortOrder: reqSortOrder = 'asc',
      type, 
      isFavourite,
    } = req.query;

    const pageNum = Number(page);
    const perPageNum = Number(perPage);
    const sortOrder = reqSortOrder === 'desc' ? 'desc' : 'asc';

    const { contacts, totalItems } = await getAllContacts({
    page: pageNum,
    perPage: perPageNum,
    sortBy, 
    sortOrder,
    type,
    isFavourite,
  });

    const totalPages = Math.ceil(totalItems / perPageNum);
    const hasPreviousPage = pageNum > 1;
    const hasNextPage = pageNum < totalPages;

    res.status(200).json({
      status: 200,
      message: 'Contacts found successfully!',
      data:{
        data:contacts,
        page:pageNum,
        perPage:perPageNum,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      }
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