import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
	it('should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUser = new CreateUserService(fakeUsersRepository);
		const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

		await createUser.execute({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		const authUser = await authenticateUser.execute({
			email: 'testunit@example.com',
			password: '123456',
		});

		expect(authUser).toHaveProperty('token');
	});
});
