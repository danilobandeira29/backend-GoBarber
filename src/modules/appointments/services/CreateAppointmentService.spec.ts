import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeNotificationsRepository = new FakeNotificationsRepository();
		createAppointment = new CreateAppointmentService(
			fakeAppointmentsRepository,
			fakeNotificationsRepository,
		);
	});

	it('should be able to create a new appointment', async () => {
		jest
			.spyOn(Date, 'now')
			.mockImplementationOnce(() => new Date(2020, 7, 15, 10).getTime());

		const appointment = await createAppointment.execute({
			date: new Date(2020, 7, 15, 11),
			user_id: 'user-id',
			provider_id: 'provider-id',
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('provider-id');
	});

	it('should not be able to create two appointments at the same time', async () => {
		jest
			.spyOn(Date, 'now')
			.mockImplementationOnce(() => new Date(2020, 7, 15, 10).getTime());

		const date = new Date(2020, 7, 15, 11);

		await createAppointment.execute({
			date,
			user_id: 'user-id',
			provider_id: 'provider-id',
		});

		await expect(
			createAppointment.execute({
				date,
				provider_id: '4444',
				user_id: '12345',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment in past date', async () => {
		jest
			.spyOn(Date, 'now')
			.mockImplementationOnce(() => new Date(2020, 7, 15, 10).getTime());

		await expect(
			createAppointment.execute({
				provider_id: 'provider-id',
				user_id: 'user-id',
				date: new Date(2020, 7, 15, 9),
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment with same provider as user', async () => {
		jest
			.spyOn(Date, 'now')
			.mockImplementationOnce(() => new Date(2020, 7, 15, 10).getTime());

		await expect(
			createAppointment.execute({
				provider_id: 'provider-id',
				user_id: 'provider-id',
				date: new Date(2020, 7, 15, 11),
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment before 8am and after 5pm', async () => {
		jest
			.spyOn(Date, 'now')
			.mockImplementationOnce(() => new Date(2020, 7, 15, 10).getTime());

		await expect(
			createAppointment.execute({
				provider_id: 'provider-id',
				user_id: 'user-id',
				date: new Date(2020, 7, 15, 7),
			}),
		).rejects.toBeInstanceOf(AppError);
		await expect(
			createAppointment.execute({
				provider_id: 'provider-id',
				user_id: 'user-id',
				date: new Date(2020, 7, 15, 18),
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
