import { Router } from 'express';
import { getAllContactsController,
         getContactByIdController,
         createContactController,
         updateContactController,
         deleteContactController,
     } from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const router = Router();

router.get('/contacts', controllerWrapper(getAllContactsController));

router.get('/contacts/:contactId',controllerWrapper(getContactByIdController));

router.post('/contacts',controllerWrapper(createContactController));

router.patch('/contacts/:contactId',controllerWrapper(updateContactController));

router.delete('/contacts/:contactId',controllerWrapper(deleteContactController));

export default router;