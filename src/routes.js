import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import PlanController from './app/controllers/PlanController';
import EnrollController from './app/controllers/EnrollController';

const routes = new Router();

routes.post('/enrolls', EnrollController.store);

routes.post('/sessions', SessionController.store);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);

export default routes;
