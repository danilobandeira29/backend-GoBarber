import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayLoad {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeaders = request.headers.authorization;

	if (!authHeaders) {
		throw new AppError('JWT token is missing');
	}

	const [, token] = authHeaders.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);

		const { sub } = decoded as TokenPayLoad;

		request.user = {
			id: sub,
		};

		return next();
	} catch {
		throw new AppError('Invalid JWT token');
	}
}
