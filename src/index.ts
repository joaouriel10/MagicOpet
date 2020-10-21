import { Router } from 'express';

const routes = Router();


routes.post('/create-card');
routes.get('/list-card');
routes.put('/update-card');
routes.delete('/delete-card');

export default routes;
