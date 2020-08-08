import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
	it('should be able to recover the password using the email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeMailProvider = new FakeMailProvider();

		const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

		const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
		);

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
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeMailProvider = new FakeMailProvider();

		const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
		);

		await expect(
			sendForgotPasswordEmail.execute({
				email: 'test@example.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});