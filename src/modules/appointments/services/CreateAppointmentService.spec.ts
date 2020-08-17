import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		createAppointment = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);
	});

	it('should be able to create a new appointment', async () => {
		const appointment = await createAppointment.execute({
			date: new Date(),
			user_id: '12345',
			provider_id: '4444',
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('4444');
	});

	it('should not be able to create two appointments at the same time', async () => {
		const date = new Date(2020, 5, 10, 14);

		await createAppointment.execute({
			date,
			user_id: '12345',
			provider_id: '4444',
		});

		await expect(
			createAppointment.execute({
				date,
				provider_id: '4444',
				user_id: '12345',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
