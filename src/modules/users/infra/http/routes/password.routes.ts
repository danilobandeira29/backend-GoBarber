import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordControler = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
	'/forgot',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
		},
	}),
	forgotPasswordControler.create,
);

passwordRouter.post(
	'/reset',
	celebrate({
		[Segments.BODY]: {
			token: Joi.string().uuid().required(),
			password: Joi.string().required(),
			password_confirmation: Joi.string().required().valid(Joi.ref('password')),
		},
	}),
	resetPasswordController.create,
);

export default passwordRouter;
