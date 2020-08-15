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
			date: new Date(2020, 8, 14, 17, 0, 0),
		});
		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			date: new Date(2020, 8, 15, 17, 0, 0),
		});

		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			date: new Date(2020, 8, 15, 10, 0, 0),
		});

		await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			date: new Date(2020, 8, 16, 9, 0, 0),
		});

		const availability = await listProviderMonthAvailability.execute({
			provider_id: 'provider-id',
			month: 9,
			year: 2020,
		});

		expect(availability).toEqual(
			expect.arrayContaining([
				{
					day: 14,
					availability: true,
				},
				{
					day: 15,
					availability: false,
				},
				{
					day: 16,
					availability: false,
				},
				{
					day: 17,
					availability: true,
				},
			]),
		);
	});
});
