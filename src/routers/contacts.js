import { Router } from 'express';
import { 
  getAllContactsController,
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

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get(
  '/contacts',
  controllerWrapper(authenticate), 
  controllerWrapper(getAllContactsController)
);

router.get(
  '/contacts/:contactId',
  controllerWrapper(authenticate),
  isValidId,
  controllerWrapper(getContactByIdController)
);

router.post(
  '/contacts',
  controllerWrapper(authenticate),
  validateBody(contactAddSchema), 
  controllerWrapper(createContactController)
);

router.patch(
  '/contacts/:contactId',
  controllerWrapper(authenticate),
  validateBody(contactPatchSchema),
  controllerWrapper(updateContactController)
);

router.delete(
  '/contacts/:contactId',
  controllerWrapper(authenticate),
  isValidId,
  controllerWrapper(deleteContactController)
);

export default router;