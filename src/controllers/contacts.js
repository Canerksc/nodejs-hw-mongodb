import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Kişiler başarıyla bulundu!',
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Kişi Bulunamadı',
      error: error.message,
    });
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Bağlantı kurulamadı',
      });
    }

    res.status(200).json({
      status: 200,
      message: `ID ile bağlantı kuruldu: ${contactId}`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Kişi tanımlanamadı!',
      error: error.message,
    });
  }
};
