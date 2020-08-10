import { Router } from 'express';

import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordControler = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordControler.create);

passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
