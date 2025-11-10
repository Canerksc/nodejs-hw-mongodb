import { Router } from 'express';
import { 
    registerUserController, 
    loginUserController, 
    refreshSessionController,
    logoutUserController,
    sendResetEmailController,
    resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { 
    loginUserSchema, 
    registerUserSchema,
    requestResetEmailSchema, 
    resetPasswordSchema,
} from '../validation/auth.js';
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

authRouter.post(
  '/auth/send-reset-email',
  validateBody(requestResetEmailSchema),
  controllerWrapper(sendResetEmailController),
);

authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema), 
  controllerWrapper(resetPasswordController),
);