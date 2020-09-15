import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import DriversController from './Controllers/DriversController';

const routes = express.Router();
const upload = multer(multerConfig);

const driversController = new DriversController();

routes.get('/drivers', driversController.index);
routes.get('/drivers/filter', driversController.filter);
routes.get('/drivers/:id', driversController.show);
routes.get('/drivers/search/:nome', driversController.searchByName);
routes.post('/drivers', upload.single('file'), driversController.create);
routes.put('/drivers/:id', driversController.update);
routes.post('/drivers/mail', driversController.sendMailForDrivers);

export default routes;