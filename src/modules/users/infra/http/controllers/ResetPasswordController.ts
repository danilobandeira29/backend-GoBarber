import { container } from 'tsyringe';

import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { token, password } = request.body;

		const resetPassword = container.resolve(ResetPasswordService);

		await resetPassword.execute({ token, password });

		return response.status(200).json();
	}
}

export default ResetPasswordController;