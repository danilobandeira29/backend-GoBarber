import AppError from '@shared/errors/AppError';

import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		fakeHashProvider = new FakeHashProvider();
		resetPassword = new ResetPasswordService(
			fakeUsersRepository,
			fakeUserTokensRepository,
			fakeHashProvider,
		);
	});

	it('should be able to reset the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test example',
			email: 'test@example.com',
			password: '123456',
		});

		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

		const { token } = await fakeUserTokensRepository.generate(user.id);

		await resetPassword.execute({ token, password: '4444' });

		expect(user.password).toBe('4444');
		expect(generateHash).toHaveBeenCalledWith('4444');
	});

	it('should not be able to reset the password with a non-existing token', async () => {
		await expect(
			resetPassword.execute({
				token: 'non-existing-token',
				password: '4444',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password with a non-existing user', async () => {
		const { token } = await fakeUserTokensRepository.generate(
			'non-existin-user',
		);

		await expect(
			resetPassword.execute({
				token,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password if passed more than 2 hours', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test example',
			email: 'test@example.com',
			password: '123456',
		});

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			const customDate = new Date();

			return customDate.setHours(customDate.getHours() + 3);
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);

		await expect(
			resetPassword.execute({ token, password: '4444' }),
		).rejects.toBeInstanceOf(AppError);
	});
});
