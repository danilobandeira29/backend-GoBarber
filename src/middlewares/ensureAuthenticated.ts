import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayLoad {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensuredAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeaders = request.headers.authorization;

	if (!authHeaders) {
		throw new Error('JWT token is missing');
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
		throw new Error('Invalid JWT token');
	}
}
