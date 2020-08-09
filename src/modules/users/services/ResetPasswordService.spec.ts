import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let resetPassword: ResetPasswordService;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('ResetPassword', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		resetPassword = new ResetPasswordService(
			fakeUsersRepository,
			fakeUserTokensRepository,
		);
	});

	it('should be able to reset the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test example',
			email: 'test@example.com',
			password: '123456',
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);

		await resetPassword.execute({ token, password: '4444' });

		expect(user.password).toBe('4444');
	});

	// hash
	// 2h expiração
	// userToken inexistente
	// user inexistente
});
