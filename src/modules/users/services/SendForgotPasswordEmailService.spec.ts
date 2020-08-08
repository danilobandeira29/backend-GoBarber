import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokenRepository();
		fakeMailProvider = new FakeMailProvider();

		sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
			fakeUserTokensRepository,
		);
	});

	it('should be able to recover the password using the email', async () => {
		const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

		await fakeUsersRepository.create({
			name: 'Test example',
			email: 'test@example.com',
			password: '123456',
		});

		await sendForgotPasswordEmail.execute({
			email: 'test@example.com',
		});

		expect(sendEmail).toHaveBeenCalled();
	});

	it('should not be able to recover the password of a non-existing user', async () => {
		await expect(
			sendForgotPasswordEmail.execute({
				email: 'test@example.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should generate a forgot password token', async () => {
		const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

		const user = await fakeUsersRepository.create({
			name: 'Test example',
			email: 'test@example.com',
			password: '123456',
		});

		await sendForgotPasswordEmail.execute({ email: 'test@example.com' });

		expect(generateToken).toHaveBeenCalledWith(user.id);
	});
});
