import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { password, email } = request.body;

		const authenticateUser = container.resolve(AuthenticateUserService);

		const { user, token } = await authenticateUser.execute({ password, email });

		return response.json({ user: classToClass(user), token });
	}
}

export default SessionsController;
