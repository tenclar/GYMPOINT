import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();
routes.post('/sessions', SessionController.store);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);

export default routes;
