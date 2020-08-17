import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
	provider_id: string;
	month: number;
	year: number;
	day: number;
}

type IResponse = Array<{
	hour: number;
	available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	public async execute({
		provider_id,
		month,
		year,
		day,
	}: IRequest): Promise<IResponse> {
		const appointmentsInDay = await this.appointmentsRepository.findAllInDayFromProvider(
			{
				provider_id,
				year,
				month,
				day,
			},
		);

		const hoursOfDay = Array.from({ length: 10 }, (value, index) => index + 8);

		const currentDate = new Date(Date.now());

		const availability = hoursOfDay.map(hour => {
			const hasAppointmentInHour = appointmentsInDay.find(
				appointment => getHours(new Date(appointment.date)) === hour,
			);

			const compareDate = new Date(year, month - 1, day, hour);

			return {
				hour,
				available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
			};
		});

		return availability;
	}
}

export default ListProviderDayAvailabilityService;
