import { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	const { password, email } = request.body;

	const authenticateUser = container.resolve(AuthenticateUserService);

	const { user, token } = await authenticateUser.execute({ password, email });

	delete user.password;

	return response.json({ user, token });
});

export default sessionsRouter;
