import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeBCryptHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeBCryptHashProvider = new FakeHashProvider();
		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeBCryptHashProvider,
		);
	});

	it('should be able to create a new user', async () => {
		const user = await createUser.execute({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});

	it('should not be able to create two users with the same email', async () => {
		await createUser.execute({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		await expect(
			createUser.execute({
				name: 'Test unit',
				email: 'testunit@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
