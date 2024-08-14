import multer from 'multer';
import path from 'path';
import {promises as fs} from 'fs';
import config from './config';
import {randomUUID} from 'node:crypto';

const imageStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, config.publicPath); // /users/tsyganov/projects/js-25/shop-api/public
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname); // .jpg
    const newFilename = randomUUID() + extension;
    cb(null, 'images/' + newFilename); // images/jlsjdfljsdlfjsldjf.jpg
  },
});

export const imagesUpload = multer({storage: imageStorage});