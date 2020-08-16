import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDaysAvailability', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderDayAvailability = new ListProviderDayAvailabilityService(
			fakeAppointmentsRepository,
		);
	});

	it('should be able to list the day availability of a provider', async () => {
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			date: new Date(2020, 7, 16, 9, 0, 0),
		});

		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			date: new Date(2020, 7, 16, 11, 0, 0),
		});

		const availability = await listProviderDayAvailability.execute({
			provider_id: 'provider-id',
			month: 8,
			year: 2020,
			day: 16,
		});

		expect(availability).toEqual(
			expect.arrayContaining([
				{
					hour: 8,
					available: true,
				},
				{
					hour: 9,
					available: false,
				},
				{
					hour: 10,
					available: true,
				},
				{
					hour: 11,
					available: false,
				},
			]),
		);
	});
});
