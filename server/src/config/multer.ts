import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(requeste, file, callback) {
      callback(null, file.originalname);
    }
  }),
};