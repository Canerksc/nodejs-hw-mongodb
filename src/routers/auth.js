import { Router } from 'express';
import { 
    registerUserController, 
    loginUserController, 
    refreshSessionController,
    logoutUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema), 
  controllerWrapper(registerUserController), 
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema), 
  controllerWrapper(loginUserController), 
);
authRouter.post(
    '/auth/refresh', 
    controllerWrapper(refreshSessionController));

authRouter.post(
    '/auth/logout', 
    controllerWrapper(logoutUserController)
);
export default authRouter;