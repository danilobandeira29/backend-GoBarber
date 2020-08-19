import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointment: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderAppointment = new ListProviderAppointmentsService(
			fakeAppointmentsRepository,
		);
	});

	it('should be able to list the appointments on a specific day', async () => {
		const appointment1 = await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: 'user-id',
			date: new Date(2020, 8, 18, 10),
		});
		const appointment2 = await fakeAppointmentsRepository.create({
			provider_id: 'provider-id',
			user_id: 'user-id',
			date: new Date(2020, 8, 18, 11),
		});

		const appointments = await listProviderAppointment.execute({
			provider_id: 'provider-id',
			year: 2020,
			month: 9,
			day: 18,
		});

		expect(appointments).toEqual([appointment1, appointment2]);
	});
});
