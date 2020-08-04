import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
	it('should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

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
		expect(authUser.user).toEqual(createUser);
	});
});
