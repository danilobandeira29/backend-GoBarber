import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
	tmpFolder,
	uploadsFolder: path.join(tmpFolder, 'upload'),

	storage: multer.diskStorage({
		destination: tmpFolder,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('HEX');

			const fileName = `${fileHash}-${file.originalname}`;

			return callback(null, fileName);
		},
	}),
};
