import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	const { password, email } = request.body;
	const usersRepository = new UsersRepository();

	const authenticateUser = new AuthenticateUserService(usersRepository);

	const { user, token } = await authenticateUser.execute({ password, email });

	delete user.password;

	return response.json({ user, token });
});

export default sessionsRouter;
