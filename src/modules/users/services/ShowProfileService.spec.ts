import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let showProfileService: ShowProfileService;
let fakeUsersRepository: FakeUsersRepository;

describe('ShowProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfileService = new ShowProfileService(fakeUsersRepository);
	});

	it('should be able to show the profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Test example',
			email: 'test@example.com',
			password: '123456',
		});

		const profile = await showProfileService.execute({ user_id: user.id });

		expect(profile.name).toBe('Test example');
		expect(profile.email).toBe('test@example.com');
	});

	it('should not be able to show the profile from non-existing user', async () => {
		await expect(
			showProfileService.execute({ user_id: 'non-existing-user-id' }),
		).rejects.toBeInstanceOf(AppError);
	});
});
