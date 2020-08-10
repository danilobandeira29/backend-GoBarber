import { Repository, getRepository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
	private ormRepository: Repository<UserToken>;

	constructor() {
		this.ormRepository = getRepository(UserToken);
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const userToken = await this.ormRepository.findOne({ where: { token } });

		return userToken;
	}

	public async generate(user_id: string): Promise<UserToken> {
		const createToken = this.ormRepository.create({
			user_id,
		});

		const saveToken = await this.ormRepository.save(createToken);

		return saveToken;
	}
}

export default UserTokensRepository;
