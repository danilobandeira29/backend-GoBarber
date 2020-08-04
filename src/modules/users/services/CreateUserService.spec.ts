import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUser = new CreateUserService(fakeUsersRepository);

		const user = await createUser.execute({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});
});
