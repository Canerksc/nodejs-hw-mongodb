import { Router } from 'express';
import { 
  getAllContactsController,
         getContactByIdController,
         createContactController,
         updateContactController,
         deleteContactController,
     } from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';

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
  upload.single('photo'),
  // validateBody(contactAddSchema), 
  controllerWrapper(createContactController)
);

router.patch(
  '/contacts/:contactId',
  controllerWrapper(authenticate),
  isValidId,
  upload.single('photo'),
  // validateBody(contactPatchSchema),
  controllerWrapper(updateContactController)
);

router.delete(
  '/contacts/:contactId',
  controllerWrapper(authenticate),
  isValidId,
  controllerWrapper(deleteContactController)
);

export default router;