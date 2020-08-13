import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();

		updateProfile = new UpdateProfileService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});

	it('should be able to update the profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		const updateUser = await updateProfile.execute({
			user_id: user.id,
			email: 'new-email',
			name: 'new-name',
		});

		expect(updateUser.name).toBe('new-name');
		expect(updateUser.email).toBe('new-email');
	});

	it('should not be able to change to another user email', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		await fakeUsersRepository.create({
			name: 'Test unit',
			email: 'testunit2@example.com',
			password: '123456',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				email: 'testunit2@example.com',
				name: 'new-name',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		const updateUser = await updateProfile.execute({
			user_id: user.id,
			email: 'new-email@example.com',
			name: 'new-name',
			password: '123123',
			old_password: '123456',
		});

		expect(updateUser.password).toBe('123123');
	});

	it('should not be able to update the password without old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				email: 'new-email@example.com',
				name: 'new-name',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update the password with wrong old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test unit',
			email: 'testunit@example.com',
			password: '123456',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				email: 'new-email@example.com',
				name: 'new-name',
				old_password: '4444',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
