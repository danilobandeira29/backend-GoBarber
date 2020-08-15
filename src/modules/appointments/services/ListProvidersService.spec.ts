import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let listProviders: ListProvidersService;
let fakeUsersRepository: FakeUsersRepository;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		listProviders = new ListProvidersService(fakeUsersRepository);
	});

	it('should be able to list all providers', async () => {
		const user1 = await fakeUsersRepository.create({
			name: 'Test unit1',
			email: 'test@unit.com',
			password: '123456',
		});
		const user2 = await fakeUsersRepository.create({
			name: 'Test unit2',
			email: 'test2@unit.com',
			password: '123456',
		});

		const loggedUser = await fakeUsersRepository.create({
			name: 'Test unit1',
			email: 'test@unit.com',
			password: '123456',
		});

		const providers = await listProviders.execute({
			user_id: loggedUser.id,
		});

		expect(providers).toEqual([user1, user2]);
	});
});
