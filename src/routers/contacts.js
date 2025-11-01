import { Router } from 'express';
import { getAllContactsController,
         getContactByIdController,
         createContactController,
         updateContactController,
         deleteContactController,
     } from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', controllerWrapper(getAllContactsController));

router.get('/contacts/:contactId',isValidId,controllerWrapper(getContactByIdController));

router.post('/contacts',validateBody(contactAddSchema), controllerWrapper(createContactController));

router.patch('/contacts/:contactId',validateBody(contactPatchSchema),controllerWrapper(updateContactController));

router.delete('/contacts/:contactId',isValidId,controllerWrapper(deleteContactController));

export default router;