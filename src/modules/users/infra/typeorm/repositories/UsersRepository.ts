import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async findById(id: string): Promise<User | undefined> {
		const user = this.ormRepository.findOne(id);

		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.ormRepository.findOne({ where: { email } });

		return user;
	}

	public async create(user: User): Promise<User> {
		const createUser = this.ormRepository.create(user);

		await this.ormRepository.save(createUser);

		return createUser;
	}

	public async save(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}

export default UsersRepository;
