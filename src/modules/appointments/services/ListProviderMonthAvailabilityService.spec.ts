import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
			fakeAppointmentsRepository,
		);
	});

	it('should be able to list the month availability of a provider', async () => {
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',

			date: new Date(2020, 7, 14, 17, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			user_id: '12345',

			provider_id: 'provider-id',
			date: new Date(2020, 7, 15, 8, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',

			date: new Date(2020, 7, 15, 9, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 10, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 11, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 12, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 13, 0, 0),
		});

		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 14, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 15, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 16, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 15, 17, 0, 0),
		});

		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: '12345',
			date: new Date(2020, 7, 16, 9, 0, 0),
		});

		const availability = await listProviderMonthAvailability.execute({
			provider_id: 'provider-id',
			month: 8,
			year: 2020,
		});

		expect(availability).toEqual(
			expect.arrayContaining([
				{
					day: 14,
					available: true,
				},
				{
					day: 15,
					available: false,
				},
				{
					day: 16,
					available: true,
				},
				{
					day: 17,
					available: true,
				},
			]),
		);
	});
});
