import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	const { password, email } = request.body;

	const authenticateUser = new AuthenticateUserService();

	const { user, token } = await authenticateUser.execute({ password, email });

	delete user.password;

	return response.json({ user, token });
});

export default sessionsRouter;
