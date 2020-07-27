import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userRepository = getRepository(User);

		const checkUserExist = await userRepository.findOne({ where: { email } });

		if (checkUserExist) {
			throw new AppError('Email already used!');
		}

		const hashedPassword = await hash(password, 8);

		const user = userRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		await userRepository.save(user);

		return user;
	}
}

export default CreateUserService;
