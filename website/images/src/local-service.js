import express from 'express';
import fs from 'fs-extra';
import nodePath from 'path';
import multer from 'multer';
import sharp from 'sharp';
import crypto from 'crypto';
import uuid from 'uuid/v4';

const VALID_FIT_TYPES = ['cover', 'contain', 'fill', 'inside', 'outside'];

class DataStore {
	constructor({ path }) {
		this.jsonPath = `${path}/data.json`;
		try {
			this.data = fs.readJsonSync(this.jsonPath);
		} catch (err) {
			if (err.code === 'ENOENT') {
				this.data = {};
			} else {
				throw err;
			}
		}
	}
	storeImage(id, meta) {
		this.data[id] = meta;
		fs.outputJSONSync(this.jsonPath, this.data);
	}
	getImage(id) {
		return this.data[id];
	}
}

const processResizeOptions = ({ width, height, fit = 'cover' }) => {
	if (!width && !height) {
		return null;
	}
	if (!VALID_FIT_TYPES.includes(fit)) {
		return {
			error: `Invalid fit option; can be one of ${VALID_FIT_TYPES.join(', ')}.`,
		};
	}
	const widthInt = parseInt(width, 10);
	const heightInt = parseInt(height, 10);

	if (width && (isNaN(widthInt) || widthInt < 1)) {
		return {
			error: `Invalid width. Please provide a positive integer`,
		};
	}

	if (height && (isNaN(heightInt) || heightInt < 1)) {
		return {
			error: `Invalid height. Please provide a positive integer`,
		};
	}

	return { width: widthInt || undefined, height: heightInt || undefined, fit };
};

export class LocalImageService {
	constructor({ port = 4008, url = 'http://localhost:4008', path = './images' }) {
		this.path = nodePath.resolve(path);
		this.url = url;
		this.database = new DataStore({ path: this.path });
		this.sourcePath = nodePath.join(this.path, 'source');
		this.transformsPath = nodePath.join(this.path, 'transforms');
		fs.ensureDirSync(this.sourcePath);
		fs.ensureDirSync(this.transformsPath);

		const upload = multer({ dest: this.sourcePath });

		this.app = express();

		this.app.post('/upload', upload.single('image'), (req, res) => {
			const { originalname, path } = req.file;
			let json = this.storeImageInDatabase({ path, originalname })
				.then(json => {
					res.status(201).json(json);
				})
				.catch(err => {
					console.error(err);
					res.status(500).json({ error: 'an error occurred' });
				});
		});

		this.app.get('/image/:filename', async (req, res) => {
			const { filename } = req.params;
			const [id, format] = filename.split('.');

			if (!id || !format) {
				return res.status(404).send('Not Found (Invalid Filename)');
			}

			const data = this.database.getImage(id);

			if (!data) {
				return res.status(404).send('Not Found (No Matching Image)');
			}

			const originalPath = nodePath.join(this.sourcePath, `${id}.${data.format}`);
			const resizeOptions = processResizeOptions(req.query);

			if (!resizeOptions && format === data.format) {
				return res.sendFile(originalPath);
			}

			let suffix = '';

			if (resizeOptions) {
				if (resizeOptions.error) {
					return res.status(400).send(resizeOptions.error);
				}

				const md5sum = crypto.createHash('md5');
				md5sum.update(JSON.stringify(resizeOptions));
				const hash = md5sum.digest('hex');

				suffix = `-${hash}`;
			}

			let transformedFilename = nodePath.join(this.transformsPath, `${id}${suffix}.${format}`);

			if (!(await fs.exists(transformedFilename))) {
				try {
					const sharpImage = sharp(originalPath);
					if (resizeOptions) {
						await sharpImage.resize(resizeOptions);
					}
					await sharpImage.toFile(transformedFilename);
				} catch (err) {
					console.error(err);
					return res.status(500).send({ error: 'Internal server error' });
				}
			}

			res.sendFile(transformedFilename);
		});

		this.app.get('/image/:id/meta', async (req, res) => {
			const { id } = req.params;
			const data = this.getImage(id);

			if (!data) {
				return res.status(404).json({ error: 'not found' });
			}

			let { filename, ...otherData } = data;

			res.json(otherData);
		});

		this.app.listen(port, () => {
			console.log(`🌠 KeystoneJS Image Service ready on port ${port}`);
		});
	}
	async getImage(id) {
		return this.database.getImage(id);
	}
	getSrc(id, { format, resize = {} }) {
		let url = `${this.url}/image/${id}.${format}`;

		const searchParams = new URLSearchParams();
		for (let key in resize) {
			searchParams.set(key, resize[key]);
		}

		const stringifiedSearchParams = searchParams.toString();
		if (stringifiedSearchParams) {
			url += `?${stringifiedSearchParams}`;
		}
		return url;
	}
	async uploadImage({ stream, originalname }) {
		const id = uuid();
		const path = nodePath.join(this.sourcePath, id);
		const writeStream = fs.createWriteStream(path);
		stream.pipe(writeStream);
		await new Promise((resolve, reject) => {
			stream.on('end', resolve);
			stream.on('error', reject);
		});
		return this.storeImageInDatabase({ path, originalname });
	}
	async storeImageInDatabase({ path, originalname }) {
		const filename = nodePath.basename(path);
		const image = sharp(path);
		const sharpMeta = await image.metadata();
		const id = filename;
		await fs.rename(path, path + '.' + sharpMeta.format);

		let meta = {
			bytes: sharpMeta.size,
			filename: originalname,
			height: sharpMeta.height,
			width: sharpMeta.width,
			format: sharpMeta.format,
		};
		this.database.storeImage(id, meta);

		return {
			id,
			meta,
		};
	}
}